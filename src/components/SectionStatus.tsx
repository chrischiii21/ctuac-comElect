import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2, Circle, Search, Users } from 'lucide-react';
import { toast } from 'sonner';

interface Student {
  student_id: string;
  full_name: string;
  has_voted: boolean;
}

interface Props {
  sectionId: string;
  initialStudents: Student[];
}

export default function SectionStatus({ sectionId, initialStudents }: Props) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Subscribe to students table changes for this section
    const channel = supabase
      .channel(`section-${sectionId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'students',
          filter: `section_id=eq.${sectionId}`,
        },
        (payload) => {
          const updatedStudent = payload.new as Student;
          if (updatedStudent.has_voted) {
            toast.success(`${updatedStudent.full_name} has just voted!`, {
              icon: '🗳️',
            });
          }
          setStudents((current) =>
            current.map((s) =>
              s.student_id === updatedStudent.student_id ? updatedStudent : s
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sectionId]);

  const votedCount = students.filter((s) => s.has_voted).length;
  const totalCount = students.length;
  const percentage = totalCount > 0 ? Math.round((votedCount / totalCount) * 100) : 0;

  const filteredStudents = students.filter((s) =>
    s.full_name.toLowerCase().includes(search.toLowerCase()) ||
    s.student_id.includes(search)
  );

  return (
    <div className="w-full max-w-2xl space-y-8">
      {/* Turnout Progress */}
      <div className="bento-card border-brand-coral/20 bg-brand-coral/[0.02]">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-coral/60 flex items-center gap-2">
              <Users size={14} />
              Section Turnout
            </h3>
            <div className="text-3xl font-outfit font-bold mt-1">
              {votedCount} <span className="text-white/20 text-xl font-normal">/ {totalCount}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-outfit font-bold text-brand-coral">{percentage}%</div>
            <div className="text-[10px] text-white/20 uppercase font-mono">Real-time Feed</div>
          </div>
        </div>
        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-coral transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(255,85,85,0.3)]" 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Student List */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-brand-coral transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredStudents.map((student) => (
            <div 
              key={student.student_id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                student.has_voted 
                  ? 'bg-brand-coral/5 border-brand-coral/20' 
                  : 'bg-white/[0.02] border-white/5'
              }`}
            >
              <div>
                <div className="font-medium text-sm">{student.full_name}</div>
                <div className="text-[10px] font-mono text-white/20">{student.student_id}</div>
              </div>
              
              {student.has_voted ? (
                <div className="flex items-center gap-2 text-brand-coral font-bold text-[10px] uppercase tracking-tighter">
                  <CheckCircle2 size={14} />
                  Voted
                </div>
              ) : (
                <div className="flex items-center gap-2 text-white/20 font-bold text-[10px] uppercase tracking-tighter">
                  <Circle size={14} />
                  Pending
                </div>
              )}
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-white/20 text-sm">
              No students found matching "{search}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
