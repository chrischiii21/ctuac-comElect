import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from './supabase_DWl81F3w.mjs';
import { Users, Search, CheckCircle2, Circle } from 'lucide-react';
import { toast } from 'sonner';

function SectionStatus({ sectionId, initialStudents }) {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const channel = supabase.channel(`section-${sectionId}`).on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "students",
        filter: `section_id=eq.${sectionId}`
      },
      (payload) => {
        const updatedStudent = payload.new;
        if (updatedStudent.has_voted) {
          toast.success(`${updatedStudent.full_name} has just voted!`, {
            icon: "🗳️"
          });
        }
        setStudents(
          (current) => current.map(
            (s) => s.student_id === updatedStudent.student_id ? updatedStudent : s
          )
        );
      }
    ).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [sectionId]);
  const votedCount = students.filter((s) => s.has_voted).length;
  const totalCount = students.length;
  const percentage = totalCount > 0 ? Math.round(votedCount / totalCount * 100) : 0;
  const filteredStudents = students.filter(
    (s) => s.full_name.toLowerCase().includes(search.toLowerCase()) || s.student_id.includes(search)
  );
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-2xl space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "bento-card border-brand-coral/20 bg-brand-coral/[0.02]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold uppercase tracking-widest text-brand-coral/60 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Users, { size: 14 }),
            "Section Turnout"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-3xl font-outfit font-bold mt-1", children: [
            votedCount,
            " ",
            /* @__PURE__ */ jsxs("span", { className: "text-white/20 text-xl font-normal", children: [
              "/ ",
              totalCount
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-2xl font-outfit font-bold text-brand-coral", children: [
            percentage,
            "%"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-white/20 uppercase font-mono", children: "Real-time Feed" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full h-3 bg-white/5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-full bg-brand-coral transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(255,85,85,0.3)]",
          style: { width: `${percentage}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-white/20", size: 18 }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search by name or ID...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-brand-coral transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar", children: [
        filteredStudents.map((student) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex items-center justify-between p-4 rounded-xl border transition-all ${student.has_voted ? "bg-brand-coral/5 border-brand-coral/20" : "bg-white/[0.02] border-white/5"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium text-sm", children: student.full_name }),
                /* @__PURE__ */ jsx("div", { className: "text-[10px] font-mono text-white/20", children: student.student_id })
              ] }),
              student.has_voted ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-brand-coral font-bold text-[10px] uppercase tracking-tighter", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 14 }),
                "Voted"
              ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-white/20 font-bold text-[10px] uppercase tracking-tighter", children: [
                /* @__PURE__ */ jsx(Circle, { size: 14 }),
                "Pending"
              ] })
            ]
          },
          student.student_id
        )),
        filteredStudents.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-12 text-white/20 text-sm", children: [
          'No students found matching "',
          search,
          '"'
        ] })
      ] })
    ] })
  ] });
}

export { SectionStatus as S };
