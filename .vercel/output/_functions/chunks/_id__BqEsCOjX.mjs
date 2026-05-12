import { c as createComponent } from './astro-component_DWe0-cby.mjs';
import 'piccolore';
import { n as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_B_saWg1x.mjs';
import { $ as $$AdminLayout } from './AdminLayout_CcA2p-kM.mjs';
import { s as supabase, g as getSupabaseAdmin } from './supabase_DWl81F3w.mjs';
import { S as SectionStatus } from './SectionStatus_B61OPlsi.mjs';
import { ChevronLeft, Share2, Trash2 } from 'lucide-react';

const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const { data: section, error: sectionError } = await supabase.from("sections").select("*").eq("id", id).single();
  if (sectionError || !section) {
    return Astro2.redirect("/404");
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const action = formData.get("action");
    if (action === "delete") {
      const adminSupabase = getSupabaseAdmin();
      const { error: deleteError } = await adminSupabase.from("sections").delete().eq("id", id);
      if (deleteError) {
        console.error("Delete Error:", deleteError);
      } else {
        return Astro2.redirect("/admin?success=deleted");
      }
    }
  }
  const { data: students } = await supabase.from("students").select("*").eq("section_id", section.id).order("full_name");
  const votedCount = students?.filter((s) => s.has_voted).length || 0;
  const totalCount = students?.length || 0;
  const turnout = totalCount > 0 ? Math.round(votedCount / totalCount * 100) : 0;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `${section.name} Details` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-8"> <!-- Navigation & Header --> <nav> <a href="/admin" class="text-white/40 hover:text-white flex items-center gap-2 text-sm transition-colors group"> ${renderComponent($$result2, "ChevronLeft", ChevronLeft, { "size": 16, "class": "group-hover:-translate-x-1 transition-transform" })}
Back to Dashboard
</a> </nav> <header class="flex flex-col md:flex-row md:items-end justify-between gap-6"> <div> <div class="flex items-center gap-3 mb-2"> <h1 class="text-4xl font-outfit font-bold">${section.name}</h1> <div class="status-badge status-badge-voted">Active</div> </div> <p class="text-white/40 font-mono text-xs uppercase tracking-widest">Section ID: ${section.id}</p> </div> <div class="flex gap-3"> <button type="button" class="px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 text-sm"${addAttribute(`
						navigator.clipboard.writeText("${Astro2.url.origin}/section/${section.token}");
						const btn = this;
						const originalHtml = btn.innerHTML;
						btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
						btn.classList.add('border-emerald-500/50', 'bg-emerald-500/5');
						import('sonner').then(m => m.toast.success("Link copied to clipboard!"));
						setTimeout(() => {
							btn.innerHTML = originalHtml;
							btn.classList.remove('border-emerald-500/50', 'bg-emerald-500/5');
						}, 2000);
					`, "onclick")}> ${renderComponent($$result2, "Share2", Share2, { "size": 16 })}
Copy Voting Link
</button> <button type="button" class="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors flex items-center gap-2 text-sm" onclick="document.getElementById('delete-modal').showModal()"> ${renderComponent($$result2, "Trash2", Trash2, { "size": 16 })}
Delete Section
</button> </div> </header> <!-- Delete Confirmation Modal --> <dialog id="delete-modal" class="bg-brand-black border border-white/10 rounded-3xl p-0 overflow-hidden max-w-md w-full"> <div class="p-8"> <div class="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6"> ${renderComponent($$result2, "Trash2", Trash2, { "size": 32 })} </div> <h3 class="text-2xl font-outfit font-semibold mb-2 text-white">Delete Section?</h3> <p class="text-white/60 text-sm mb-8">This will permanently remove the section and all associated student data. This action cannot be undone.</p> <form method="POST" class="flex gap-4"> <input type="hidden" name="action" value="delete"> <button type="button" onclick="this.closest('dialog').close()" class="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 transition-colors">Cancel</button> <button type="submit" class="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors">Delete Forever</button> </form> </div> </dialog> <!-- Section Stats Grid --> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="bento-card bg-emerald-500/[0.03] border-emerald-500/20"> <div class="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60 mb-2">Current Turnout</div> <div class="text-4xl font-outfit font-bold">${turnout}%</div> <div class="w-full h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden"> <div class="h-full bg-emerald-500"${addAttribute(`width: ${turnout}%`, "style")}></div> </div> </div> <div class="bento-card"> <div class="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-2">Votes Cast</div> <div class="text-4xl font-outfit font-bold">${votedCount}</div> <div class="text-xs text-white/40 mt-1">out of ${totalCount} students</div> </div> <div class="bento-card"> <div class="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-2">Public Token</div> <div class="text-xs font-mono break-all mt-4 text-white/60">${section.token}</div> <div class="text-[10px] text-white/20 mt-2">Used for secure voting URLs</div> </div> </div> <!-- Live Feed Section --> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <div class="lg:col-span-2"> <div class="bg-white/[0.02] border border-white/5 rounded-3xl p-8"> <h2 class="text-xl font-semibold mb-6">Real-time Student Status</h2> ${renderComponent($$result2, "SectionStatus", SectionStatus, { "client:load": true, "sectionId": section.id, "initialStudents": students || [], "client:component-hydration": "load", "client:component-path": "C:/Users/L E N O V O/Documents/ctuac-comelect/src/components/SectionStatus", "client:component-export": "default" })} </div> </div> <aside class="space-y-6"> <div class="bento-card"> <h3 class="font-semibold mb-4 text-sm">Admin Instructions</h3> <ul class="text-xs text-white/40 space-y-3 list-disc pl-4"> <li>Share the <strong>Voting Link</strong> with students in this section.</li> <li>The status updates automatically as students cast their ballots.</li> <li>You can monitor the live feed here without refreshing.</li> <li>Students can only vote once per ID.</li> </ul> </div> </aside></div> </div> ` })}`;
}, "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/admin/sections/[id].astro", void 0);

const $$file = "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/admin/sections/[id].astro";
const $$url = "/admin/sections/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
