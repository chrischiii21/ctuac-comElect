import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Trophy } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  position: string;
  vote_count: number;
  image_url?: string | null;
}

const positionPriority = (pos: string) => {
  if (pos === 'President') return 0;
  if (pos === 'Vice President') return 1;
  if (pos.toLowerCase().includes('senator')) return 2;
  if (pos.toLowerCase().includes('hr')) return 3;
  return 4;
};

interface Props {
  initialCandidates: Candidate[];
}

const categories = [
  { name: 'Executive Board', filter: (pos: string) => pos === 'President' || pos === 'Vice President' },
  { name: 'Senatorial Race', filter: (pos: string) => pos.toLowerCase().includes('senator') },
  { name: 'House Representatives', filter: (pos: string) => pos.toLowerCase().includes('hr') },
];

export default function VoteStandings({ initialCandidates }: Props) {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

  useEffect(() => {
    // Subscribe to candidates table for live vote updates
    const channel = supabase
      .channel('live-standings')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'candidates',
        },
        (payload) => {
          const updatedCandidate = payload.new as Candidate;
          setCandidates((current) =>
            current.map((c) =>
              c.id === updatedCandidate.id ? updatedCandidate : c
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Group and sort candidates by position
  const grouped = candidates.reduce((acc, c) => {
    if (!acc[c.position]) acc[c.position] = [];
    acc[c.position].push(c);
    return acc;
  }, {} as Record<string, Candidate[]>);

  // Sort candidates within each group by vote_count DESC
  Object.keys(grouped).forEach(position => {
    grouped[position].sort((a, b) => b.vote_count - a.vote_count);
  });

  const sortedPositions = Object.keys(grouped).sort((a, b) => {
    const priorityA = positionPriority(a);
    const priorityB = positionPriority(b);
    if (priorityA !== priorityB) return priorityA - priorityB;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-12 pt-12">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Trophy size={20} className="text-emerald-500" />
        Live Candidate Standings
      </h2>
      
      <div className="space-y-16">
        {candidates.length === 0 ? (
          <div className="col-span-full bento-card p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-white/5 bg-transparent">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/20">
              <Trophy size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/60">No Candidates Registered</h3>
              <p className="text-sm text-white/20">Add candidates in the management tab to see live standings.</p>
            </div>
            <a href="/admin/candidates" className="text-xs font-bold text-emerald-500 hover:underline uppercase tracking-widest pt-2">Manage Candidates →</a>
          </div>
        ) : (
          categories.map((cat) => {
            const catPositions = sortedPositions.filter(cat.filter);
            if (catPositions.length === 0) return null;

            return (
              <div key={cat.name} className="space-y-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-outfit font-bold text-emerald-500 whitespace-nowrap">{cat.name}</h3>
                  <div className="h-px bg-emerald-500/10 w-full"></div>
                </div>
                
                {cat.name === 'House Representatives' ? (
                  // Sub-group by College
                  (() => {
                    const collegeMapping: Record<string, string> = {
                      'BEED': 'COED', 'BSED': 'COED', 'BTLED': 'COED',
                      'BSTM': 'CHTM', 'BSHM': 'CHTM',
                      'BAEL': 'CAS', 'BAL': 'CAS', 'BSP': 'CAS',
                      'BSA': 'CAFE', 'BSF': 'CAFE', 'BSES': 'CAFE',
                      'BIT': 'COTE', 'BSIT': 'COTE', 'BSIE': 'COTE',
                    };
                    const collegeList = ['COTE', 'CAFE', 'CHTM', 'CAS', 'COED', 'CBIT'];
                    
                    const hrByCollege: Record<string, string[]> = {};
                    catPositions.forEach(p => {
                      let foundCollege = 'OTHER';
                      const up = p.toUpperCase();
                      for (const [prog, coll] of Object.entries(collegeMapping)) {
                        if (up.includes(prog)) { foundCollege = coll; break; }
                      }
                      if (foundCollege === 'OTHER') {
                        for (const c of collegeList) {
                          if (up.includes(c)) { foundCollege = c; break; }
                        }
                      }
                      if (!hrByCollege[foundCollege]) hrByCollege[foundCollege] = [];
                      hrByCollege[foundCollege].push(p);
                    });

                    return Object.keys(hrByCollege).sort().map(college => (
                      <div key={college} className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">{college}</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {hrByCollege[college].map(position => {
                            const list = grouped[position];
                            const maxVotes = Math.max(...list.map((c) => c.vote_count), 1);
                            return (
                              <div key={position} className="bento-card space-y-4">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 border-b border-white/5 pb-3">
                                  {position}
                                </h4>
                                <div className="space-y-4">
                                  {list.map((candidate) => {
                                    const isLeading = candidate.vote_count > 0 && candidate.vote_count === maxVotes;
                                    return (
                                      <div key={candidate.id} className={`space-y-2 p-3 rounded-xl transition-all duration-500 ${isLeading ? 'bg-emerald-500/10 ring-1 ring-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : ''}`}>
                                        <div className="flex justify-between items-center">
                                          <div className="flex items-center gap-3">
                                            <div className="relative">
                                              {candidate.image_url ? (
                                                <img src={candidate.image_url} alt={candidate.name} className={`w-8 h-8 rounded-full object-cover border ${isLeading ? 'border-emerald-500' : 'border-white/10'}`} />
                                              ) : (
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isLeading ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/20'}`}>
                                                  {candidate.name.charAt(0)}
                                                </div>
                                              )}
                                              {isLeading && (
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-brand-black flex items-center justify-center">
                                                  <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                                                </div>
                                              )}
                                            </div>
                                            <div className="flex flex-col">
                                              <span className={`text-sm font-medium ${isLeading ? 'text-emerald-400' : 'text-white'}`}>{candidate.name}</span>
                                              {isLeading && <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-tighter">Current Leader</span>}
                                            </div>
                                          </div>
                                          <span className={`text-xs font-mono font-bold ${isLeading ? 'text-emerald-400' : 'text-brand-coral'}`}>
                                            {candidate.vote_count} <span className="text-[8px] opacity-40">VOTES</span>
                                          </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                          <div 
                                            className={`h-full transition-all duration-1000 ${isLeading ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-brand-coral shadow-[0_0_10px_rgba(255,85,85,0.3)]'}`} 
                                            style={{ width: `${(candidate.vote_count / maxVotes) * 100}%` }}
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })()
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catPositions.map((position) => {
                      const list = grouped[position];
                      const maxVotes = Math.max(...list.map((c) => c.vote_count), 1);
                      
                      return (
                        <div key={position} className="bento-card space-y-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 border-b border-white/5 pb-3">
                            {position}
                          </h4>
                          <div className="space-y-4">
                            {list.map((candidate, index) => {
                              const isLeading = candidate.vote_count > 0 && candidate.vote_count === maxVotes;
                              
                              return (
                                <div key={candidate.id} className={`space-y-2 p-3 rounded-xl transition-all duration-500 ${isLeading ? 'bg-emerald-500/10 ring-1 ring-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : ''}`}>
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <div className="relative">
                                        {candidate.image_url ? (
                                          <img src={candidate.image_url} alt={candidate.name} className={`w-8 h-8 rounded-full object-cover border ${isLeading ? 'border-emerald-500' : 'border-white/10'}`} />
                                        ) : (
                                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isLeading ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/20'}`}>
                                            {candidate.name.charAt(0)}
                                          </div>
                                        )}
                                        {isLeading && (
                                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-brand-black flex items-center justify-center">
                                            <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex flex-col">
                                        <span className={`text-sm font-medium ${isLeading ? 'text-emerald-400' : 'text-white'}`}>{candidate.name}</span>
                                        {isLeading && <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-tighter">Current Leader</span>}
                                      </div>
                                    </div>
                                    <span className={`text-xs font-mono font-bold ${isLeading ? 'text-emerald-400' : 'text-brand-coral'}`}>
                                      {candidate.vote_count} <span className="text-[8px] opacity-40">VOTES</span>
                                    </span>
                                  </div>
                                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full transition-all duration-1000 ${isLeading ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-brand-coral shadow-[0_0_10px_rgba(255,85,85,0.3)]'}`} 
                                      style={{ width: `${(candidate.vote_count / maxVotes) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
