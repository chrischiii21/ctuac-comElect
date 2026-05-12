import { c as createComponent } from './astro-component_C3DWg1k6.mjs';
import 'piccolore';
import { n as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_DHDXgHmb.mjs';
import { $ as $$AdminLayout } from './AdminLayout_UhH9Bjpn.mjs';
import { s as supabase } from './supabase_DWl81F3w.mjs';
import { Plus, Landmark, ArrowRight } from 'lucide-react';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: sections } = await supabase.from("sections").select("*").order("name");
  const sectionsWithCounts = await Promise.all((sections || []).map(async (section) => {
    const { count: sTotal } = await supabase.from("students").select("*", { count: "exact", head: true }).eq("section_id", section.id);
    const { count: sVoted } = await supabase.from("students").select("*", { count: "exact", head: true }).eq("section_id", section.id).eq("has_voted", true);
    const sPercentage = sTotal ? Math.round((sVoted || 0) / sTotal * 100) : 0;
    return { ...section, sTotal, sVoted, sPercentage };
  }));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Sections" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto px-6 py-12 space-y-12"> <header class="flex flex-col md:flex-row md:items-center justify-between gap-6"> <div> <h1 class="text-5xl font-outfit font-bold tracking-tight mb-2">Sections</h1> <p class="text-white/40 max-w-xl">Manage all voting sections and track their real-time turnout progress.</p> </div> <button onclick="document.getElementById('upload-modal').showModal()" class="btn-primary flex items-center gap-2"> ${renderComponent($$result2, "Plus", Plus, { "size": 20 })}
Import New Section
</button> </header> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${sectionsWithCounts.map((section) => renderTemplate`<a${addAttribute(`/admin/sections/${section.id}`, "href")} class="bento-card group hover:border-emerald-500/30 transition-all"> <div class="flex justify-between items-start mb-6"> <div class="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors"> ${renderComponent($$result2, "Landmark", Landmark, { "size": 24 })} </div> <div class="status-badge status-badge-voted">Active</div> </div> <div class="space-y-4"> <div> <h3 class="text-xl font-bold">${section.name}</h3> <p class="text-xs font-mono text-white/20 uppercase tracking-tighter">Token: ${section.token.slice(0, 12)}...</p> </div> <div class="space-y-2"> <div class="flex justify-between items-end"> <span class="text-[10px] font-bold uppercase tracking-widest text-white/20">Turnout</span> <span class="text-sm font-mono font-bold text-emerald-400">${section.sPercentage}%</span> </div> <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"> <div class="h-full bg-emerald-500 transition-all duration-1000"${addAttribute(`width: ${section.sPercentage}%`, "style")}></div> </div> <div class="flex justify-between text-[10px] text-white/40 font-mono"> <span>${section.sVoted} Voted</span> <span>${section.sTotal} Total</span> </div> </div> </div> <div class="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">
View Student List
${renderComponent($$result2, "ArrowRight", ArrowRight, { "size": 14, "class": "group-hover:translate-x-1 transition-transform" })} </div> </a>`)} ${sectionsWithCounts.length === 0 && renderTemplate`<div class="col-span-full bento-card p-24 flex flex-col items-center justify-center text-center space-y-6 border-dashed border-white/5 bg-transparent"> <div class="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-white/20"> ${renderComponent($$result2, "Landmark", Landmark, { "size": 40 })} </div> <div class="space-y-2"> <h3 class="text-2xl font-bold text-white/60">No sections found</h3> <p class="text-white/20 max-w-sm mx-auto">Upload a student CSV list to create your first election section.</p> </div> <button onclick="document.getElementById('upload-modal').showModal()" class="btn-primary">Import First Section</button> </div>`} </div> </div>  <dialog id="upload-modal" class="bg-brand-black border border-white/10 rounded-3xl p-0 overflow-hidden max-w-md w-full"> <div class="p-8"> <h3 class="text-2xl font-outfit font-semibold mb-2 text-white">Import Student List</h3> <p class="text-white/60 text-sm mb-6">Upload a CSV file containing student IDs and Full Names for a specific section.</p> <form action="/api/upload-section" method="POST" enctype="multipart/form-data" class="space-y-6"> <div class="space-y-2"> <label class="text-[10px] font-bold uppercase tracking-widest text-white/80">Section Name</label> <input type="text" name="sectionName" placeholder="e.g. BSIT-4A" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors text-white placeholder:text-white/20"> </div> <div class="space-y-2"> <label class="text-[10px] font-bold uppercase tracking-widest text-white/80">CSV File</label> <label class="block w-full border-2 border-dashed border-white/10 rounded-2xl p-8 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-pointer group"> <input type="file" name="csvFile" accept=".csv" required class="hidden" onchange="const span = document.getElementById('filename-display-sections'); span.textContent = this.files[0].name; span.classList.add('text-emerald-500'); span.classList.remove('text-white/40');"> <div class="flex flex-col items-center gap-2 text-center"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/20 group-hover:text-emerald-500 transition-colors"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg> <span id="filename-display-sections" class="text-sm text-white/40 group-hover:text-white/60 transition-colors truncate max-w-full px-4">
Drop CSV or Click to Browse
</span> </div> </label> </div> <div class="flex gap-4 pt-4"> <button type="button" onclick="this.closest('dialog').close()" class="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 transition-colors">Cancel</button> <button type="submit" class="flex-1 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-emerald-500 transition-colors">Start Import</button> </div> </form> </div> </dialog> ` })}`;
}, "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/admin/sections/index.astro", void 0);

const $$file = "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/admin/sections/index.astro";
const $$url = "/admin/sections";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
