import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Trophy } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  position: string;
  vote_count: number;
}

interface Props {
  initialCandidates: Candidate[];
}

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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Trophy size={20} className="text-emerald-500" />
        Live Candidate Standings
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          Object.entries(grouped).map(([position, list]) => {
          const maxVotes = Math.max(...list.map((c) => c.vote_count), 1);
          
          return (
            <div key={position} className="bento-card space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 border-b border-white/5 pb-3">
                {position}
              </h3>
              <div className="space-y-4">
                {list.map((candidate) => (
                  <div key={candidate.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {candidate.image_url ? (
                          <img src={candidate.image_url} alt={candidate.name} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                        ) : (
                          <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-[10px] font-bold text-white/20">
                            {candidate.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-sm font-medium">{candidate.name}</span>
                      </div>
                      <span className="text-xs font-mono text-brand-coral font-bold">
                        {candidate.vote_count} <span className="text-[8px] text-white/20">VOTES</span>
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-coral shadow-[0_0_10px_rgba(255,85,85,0.3)] transition-all duration-1000" 
                        style={{ width: `${(candidate.vote_count / maxVotes) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }))}
      </div>
    </div>
  );
}
