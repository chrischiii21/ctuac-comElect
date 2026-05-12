import { c as createComponent } from './astro-component_C3DWg1k6.mjs';
import 'piccolore';
import { n as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_DHDXgHmb.mjs';
import { r as renderScript } from './Toaster_Bh7UDjNF.mjs';
import { $ as $$AdminLayout } from './AdminLayout_UhH9Bjpn.mjs';
import { s as supabase } from './supabase_DWl81F3w.mjs';
import { Trophy, Upload, BarChart3, Users, Landmark, Clock } from 'lucide-react';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

function VoteStandings({ initialCandidates }) {
  const [candidates, setCandidates] = useState(initialCandidates);
  useEffect(() => {
    const channel = supabase.channel("live-standings").on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "candidates"
      },
      (payload) => {
        const updatedCandidate = payload.new;
        setCandidates(
          (current) => current.map(
            (c) => c.id === updatedCandidate.id ? updatedCandidate : c
          )
        );
      }
    ).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const grouped = candidates.reduce((acc, c) => {
    if (!acc[c.position]) acc[c.position] = [];
    acc[c.position].push(c);
    return acc;
  }, {});
  Object.keys(grouped).forEach((position) => {
    grouped[position].sort((a, b) => b.vote_count - a.vote_count);
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Trophy, { size: 20, className: "text-emerald-500" }),
      "Live Candidate Standings"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: candidates.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "col-span-full bento-card p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-white/5 bg-transparent", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/20", children: /* @__PURE__ */ jsx(Trophy, { size: 32 }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white/60", children: "No Candidates Registered" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-white/20", children: "Add candidates in the management tab to see live standings." })
      ] }),
      /* @__PURE__ */ jsx("a", { href: "/admin/candidates", className: "text-xs font-bold text-emerald-500 hover:underline uppercase tracking-widest pt-2", children: "Manage Candidates →" })
    ] }) : Object.entries(grouped).map(([position, list]) => {
      const maxVotes = Math.max(...list.map((c) => c.vote_count), 1);
      return /* @__PURE__ */ jsxs("div", { className: "bento-card space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 border-b border-white/5 pb-3", children: position }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: list.map((candidate) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              candidate.image_url ? /* @__PURE__ */ jsx("img", { src: candidate.image_url, alt: candidate.name, className: "w-8 h-8 rounded-full object-cover border border-white/10" }) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-[10px] font-bold text-white/20", children: candidate.name.charAt(0) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: candidate.name })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono text-brand-coral font-bold", children: [
              candidate.vote_count,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-[8px] text-white/20", children: "VOTES" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full h-1.5 bg-white/5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "h-full bg-brand-coral shadow-[0_0_10px_rgba(255,85,85,0.3)] transition-all duration-1000",
              style: { width: `${candidate.vote_count / maxVotes * 100}%` }
            }
          ) })
        ] }, candidate.id)) })
      ] }, position);
    }) })
  ] });
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: sections } = await supabase.from("sections").select("*");
  const { data: candidates } = await supabase.from("candidates").select("*").order("position");
  const { count: totalStudents } = await supabase.from("students").select("*", { count: "exact", head: true });
  const { count: totalVoted } = await supabase.from("students").select("*", { count: "exact", head: true }).eq("has_voted", true);
  const turnoutPercentage = totalStudents ? Math.round((totalVoted || 0) / totalStudents * 100) : 0;
  (candidates || []).reduce((acc, c) => {
    if (!acc[c.position]) acc[c.position] = [];
    acc[c.position].push(c);
    return acc;
  }, {});
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Admin Overview" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-12"> <!-- Header Section --> <header class="flex flex-col md:flex-row md:items-end justify-between gap-6"> <div> <h1 class="text-4xl md:text-5xl font-outfit font-semibold tracking-tight">System Overview</h1> <p class="text-white/40 mt-2">Real-time election status and section management.</p> </div> <div class="flex gap-4"> <button class="btn-primary flex items-center gap-2" onclick="document.getElementById('upload-modal').showModal()"> ${renderComponent($$result2, "Upload", Upload, { "size": 18 })} <span>Upload CSV</span> </button> </div> </header> <!-- Bento Grid Stats --> <div class="bento-grid"> <div class="bento-card lg:col-span-2 flex flex-col justify-between group"> <div class="flex justify-between items-start"> <div class="p-3 bg-brand-coral/10 rounded-xl text-brand-coral group-hover:bg-brand-coral group-hover:text-white transition-colors duration-500"> ${renderComponent($$result2, "BarChart3", BarChart3, { "size": 24 })} </div> <div class="text-xs font-medium text-white/20 tracking-widest uppercase">Live Turnout</div> </div> <div class="mt-8"> <div class="flex items-baseline gap-2"> <span class="text-6xl font-outfit font-bold">${turnoutPercentage}%</span> <span class="text-white/20 text-sm font-medium italic">of total votes</span> </div> <div class="w-full h-2 bg-white/5 rounded-full mt-6 overflow-hidden"> <div class="h-full bg-brand-coral transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(255,85,85,0.5)]"${addAttribute(`width: ${turnoutPercentage}%`, "style")}></div> </div> </div> </div> <div class="bento-card flex flex-col justify-between"> <div class="p-3 bg-white/5 w-fit rounded-xl text-white/60"> ${renderComponent($$result2, "Users", Users, { "size": 24 })} </div> <div class="mt-8"> <div class="text-4xl font-outfit font-bold">${totalStudents || 0}</div> <div class="text-white/30 text-xs font-medium uppercase tracking-widest mt-1">Total Voters</div> </div> </div> <div class="bento-card flex flex-col justify-between"> <div class="p-3 bg-white/5 w-fit rounded-xl text-white/60"> ${renderComponent($$result2, "Landmark", Landmark, { "size": 24 })} </div> <div class="mt-8"> <div class="text-4xl font-outfit font-bold">${sections?.length || 0}</div> <div class="text-white/30 text-xs font-medium uppercase tracking-widest mt-1">Active Sections</div> </div> </div> </div> <!-- Live Vote Tally --> ${renderComponent($$result2, "VoteStandings", VoteStandings, { "initialCandidates": candidates || [], "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/L E N O V O/Documents/ctuac-comelect/src/components/VoteStandings", "client:component-export": "default" })} <!-- Recent Activity / Sections List --> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <div class="lg:col-span-2 space-y-6"> <h2 class="text-xl font-semibold flex items-center gap-2"> ${renderComponent($$result2, "Clock", Clock, { "size": 20, "class": "text-white/20" })}
Section Performance
</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> ${sections && sections.length > 0 ? await Promise.all(sections.map(async (section) => {
    const { count: sTotal } = await supabase.from("students").select("*", { count: "exact", head: true }).eq("section_id", section.id);
    const { count: sVoted } = await supabase.from("students").select("*", { count: "exact", head: true }).eq("section_id", section.id).eq("has_voted", true);
    const sPercentage = sTotal ? Math.round((sVoted || 0) / sTotal * 100) : 0;
    return renderTemplate`<a${addAttribute(`/admin/sections/${section.id}`, "href")} class="bento-card block hover:translate-y-[-4px]"> <div class="flex justify-between items-start mb-4"> <h3 class="font-semibold text-lg">${section.name}</h3> <div class="status-badge status-badge-voted">Live</div> </div> <div class="text-xs text-white/40 font-mono mb-2 uppercase tracking-tighter">TOKEN: ${section.token.slice(0, 8)}...</div> <div class="flex items-center gap-2"> <div class="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden"> <div class="h-full bg-brand-coral transition-all duration-500"${addAttribute(`width: ${sPercentage}%`, "style")}></div> </div> <span class="text-[10px] font-mono text-white/30">${sPercentage}%</span> </div> </a>`;
  })) : renderTemplate`<div class="col-span-full bento-card p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-white/5 bg-transparent"> <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/20"> ${renderComponent($$result2, "Clock", Clock, { "size": 32 })} </div> <div class="space-y-1"> <h3 class="text-lg font-semibold text-white/60">No Active Sections</h3> <p class="text-sm text-white/20">Import a student CSV list to start tracking turnout.</p> </div> <button onclick="document.getElementById('upload-modal').showModal()" class="text-xs font-bold text-brand-coral hover:underline uppercase tracking-widest pt-2">Import List →</button> </div>`} </div> </div> <aside class="bento-card h-fit sticky top-28"> <h3 class="font-semibold mb-4 text-brand-coral">Quick Actions</h3> <ul class="space-y-4"> <li> <a href="#" class="text-sm text-white/60 hover:text-white flex items-center justify-between group">
Export Results
<span class="opacity-0 group-hover:opacity-100 transition-opacity">→</span> </a> </li> <li> <a href="#" class="text-sm text-white/60 hover:text-white flex items-center justify-between group">
Reset All Votes
<span class="opacity-0 group-hover:opacity-100 transition-opacity text-red-500">×</span> </a> </li> <li> <a href="#" class="text-sm text-white/60 hover:text-white flex items-center justify-between group">
System Settings
<span class="opacity-0 group-hover:opacity-100 transition-opacity">→</span> </a> </li> </ul> </aside> </div> </div>  <dialog id="upload-modal" class="bg-brand-black border border-white/10 rounded-3xl p-0 overflow-hidden max-w-md w-full"> <div class="p-8"> <h3 class="text-2xl font-outfit font-semibold mb-2 text-white">Import Student List</h3> <p class="text-white/60 text-sm mb-6">Upload a CSV file containing student IDs and Full Names for a specific section.</p> <form action="/api/upload-section" method="POST" enctype="multipart/form-data" class="space-y-6"> <div class="space-y-2"> <label class="text-[10px] font-bold uppercase tracking-widest text-white/80">Section Name</label> <input type="text" name="sectionName" placeholder="e.g. BSIT-4A" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-coral transition-colors text-white placeholder:text-white/20"> </div> <div class="space-y-2"> <label class="text-[10px] font-bold uppercase tracking-widest text-white/80">CSV File</label> <label class="block w-full border-2 border-dashed border-white/10 rounded-2xl p-8 hover:border-brand-coral/50 hover:bg-brand-coral/5 transition-all cursor-pointer group"> <input type="file" name="csvFile" accept=".csv" required class="hidden" onchange="const span = document.getElementById('filename-display'); span.textContent = this.files[0].name; span.classList.add('text-brand-coral'); span.classList.remove('text-white/40');"> <div class="flex flex-col items-center gap-2 text-center"> ${renderComponent($$result2, "Upload", Upload, { "class": "text-white/20 group-hover:text-brand-coral transition-colors" })} <span id="filename-display" class="text-sm text-white/40 group-hover:text-white/60 transition-colors truncate max-w-full px-4">
Drop CSV or Click to Browse
</span> </div> </label> </div> <div class="flex gap-4 pt-4"> <button type="button" onclick="this.closest('dialog').close()" class="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 transition-colors">Cancel</button> <button type="submit" class="flex-1 btn-primary">Start Import</button> </div> </form> </div> </dialog> ` })} ${renderScript($$result, "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
