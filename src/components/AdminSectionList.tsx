import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Clock } from 'lucide-react';

interface Section {
  id: string;
  name: string;
  token: string;
  initialTotal: number;
  initialVoted: number;
}

interface Props {
  initialSections: Section[];
}

export default function AdminSectionList({ initialSections }: Props) {
  const [sections, setSections] = useState(initialSections);

  useEffect(() => {
    // Subscribe to students table changes
    const channel = supabase
      .channel('admin-section-list')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'students',
        },
        (payload) => {
          const updatedStudent = payload.new as any;
          // Find the section and update its voted count
          // To keep it simple and accurate, we'll re-fetch the voted count for that specific section
          refreshSectionVotedCount(updatedStudent.section_id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const refreshSectionVotedCount = async (sectionId: string) => {
    const { count } = await supabase
      .from('students')
      .select('*', { count: 'exact', head: true })
      .eq('section_id', sectionId)
      .eq('has_voted', true);
    
    if (count !== null) {
      setSections(current => 
        current.map(s => s.id === sectionId ? { ...s, initialVoted: count } : s)
      );
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Clock size={20} className="text-white/20" />
        Section Performance
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.length > 0 ? (
          sections.map((section) => {
            const percentage = section.initialTotal > 0 
              ? Math.round((section.initialVoted / section.initialTotal) * 100) 
              : 0;

            return (
              <a 
                key={section.id} 
                href={`/admin/sections/${section.id}`} 
                className="bento-card block hover:translate-y-[-4px] transition-transform"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{section.name}</h3>
                  <div className="status-badge status-badge-voted">Live</div>
                </div>
                <div className="text-xs text-white/40 font-mono mb-2 uppercase tracking-tighter">
                  TOKEN: {section.token.slice(0, 8)}...
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-coral transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-mono text-white/30">
                    {section.initialVoted}/{section.initialTotal} ({percentage}%)
                  </span>
                </div>
              </a>
            );
          })
        ) : (
          <div className="col-span-full bento-card p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-white/5 bg-transparent">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/20">
              <Clock size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/60">No Active Sections</h3>
              <p className="text-sm text-white/20">Import a student CSV list to start tracking turnout.</p>
            </div>
            <button 
              onClick={() => (document.getElementById('upload-modal') as any)?.showModal()} 
              className="text-xs font-bold text-brand-coral hover:underline uppercase tracking-widest pt-2"
            >
              Import List →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
