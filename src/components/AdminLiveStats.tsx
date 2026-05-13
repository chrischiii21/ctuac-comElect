import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart3, Users, Landmark } from 'lucide-react';

interface Props {
  initialTotalStudents: number;
  initialTotalVoted: number;
  initialActiveSectionsCount: number;
  onlineSectionIds: string[];
}

export default function AdminLiveStats({ 
  initialTotalStudents, 
  initialTotalVoted, 
  initialActiveSectionsCount,
  onlineSectionIds 
}: Props) {
  const [totalStudents, setTotalStudents] = useState(initialTotalStudents);
  const [totalVoted, setTotalVoted] = useState(initialTotalVoted);
  
  useEffect(() => {
    // Subscribe to students table changes for online sections
    const channel = supabase
      .channel('admin-live-stats')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'students',
        },
        (payload) => {
          const updatedStudent = payload.new as any;
          // Only care if the student belongs to one of our online sections
          if (onlineSectionIds.includes(updatedStudent.section_id)) {
            // We need to re-fetch the count or track it locally. 
            // Since we don't know the previous state easily, re-fetching the voted count is safer.
            refreshVotedCount();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onlineSectionIds]);

  const refreshVotedCount = async () => {
    const { count } = await supabase
      .from('students')
      .select('*', { count: 'exact', head: true })
      .in('section_id', onlineSectionIds)
      .eq('has_voted', true);
    
    if (count !== null) {
      setTotalVoted(count);
    }
  };

  const turnoutPercentage = totalStudents > 0 ? (totalVoted / totalStudents * 100) : 0;
  // Format percentage: if > 0 and < 1, show 1 decimal place. Otherwise round.
  const displayPercentage = turnoutPercentage > 0 && turnoutPercentage < 1 
    ? turnoutPercentage.toFixed(1) 
    : Math.round(turnoutPercentage);

  return (
    <div className="bento-grid">
      <div className="bento-card lg:col-span-2 flex flex-col justify-between group">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-brand-coral/10 rounded-xl text-brand-coral group-hover:bg-brand-coral group-hover:text-white transition-colors duration-500">
            <BarChart3 size={24} />
          </div>
          <div className="text-xs font-medium text-white/20 tracking-widest uppercase">Live Turnout</div>
        </div>
        <div className="mt-8">
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
            <span className="text-6xl font-outfit font-bold">{displayPercentage}%</span>
            <span className="text-white/20 text-xs font-medium italic mb-2 md:mb-0">
              ({totalVoted} / {totalStudents} digital ballots)
            </span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full mt-6 overflow-hidden">
            <div 
              className="h-full bg-brand-coral transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(255,85,85,0.5)]" 
              style={{ width: `${turnoutPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bento-card flex flex-col justify-between">
        <div className="p-3 bg-white/5 w-fit rounded-xl text-white/60">
          <Users size={24} />
        </div>
        <div className="mt-8">
          <div className="text-4xl font-outfit font-bold">{totalStudents}</div>
          <div className="text-white/30 text-xs font-medium uppercase tracking-widest mt-1">Total Voters</div>
        </div>
      </div>

      <div className="bento-card flex flex-col justify-between">
        <div className="p-3 bg-white/5 w-fit rounded-xl text-white/60">
          <Landmark size={24} />
        </div>
        <div className="mt-8">
          <div className="text-4xl font-outfit font-bold">{initialActiveSectionsCount}</div>
          <div className="text-white/30 text-xs font-medium uppercase tracking-widest mt-1">Active Sections</div>
        </div>
      </div>
    </div>
  );
}
