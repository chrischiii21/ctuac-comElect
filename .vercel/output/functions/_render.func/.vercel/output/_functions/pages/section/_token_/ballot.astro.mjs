import { c as createComponent, e as renderComponent, g as renderTemplate, h as createAstro, m as maybeRenderHead, d as addAttribute } from '../../../chunks/astro/server_C3obWGp1.mjs';
import 'kleur/colors';
import { $ as $$VoterLayout } from '../../../chunks/VoterLayout_B4q119cb.mjs';
import { s as supabase } from '../../../chunks/supabase_DWl81F3w.mjs';
import { Landmark, Check, Vote } from 'lucide-react';
/* empty css                                        */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Ballot = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ballot;
  const { token } = Astro2.params;
  const studentId = Astro2.url.searchParams.get("studentId");
  if (!studentId) {
    return Astro2.redirect(`/section/${token}`);
  }
  const { data: section } = await supabase.from("sections").select("*").eq("token", token).single();
  const { data: student } = await supabase.from("students").select("*").eq("student_id", studentId).eq("section_id", section.id).single();
  if (!student || student.has_voted) {
    return Astro2.redirect(`/section/${token}?error=already_voted`);
  }
  const { data: candidates } = await supabase.from("candidates").select("*").order("position");
  const groupedCandidates = candidates?.reduce((acc, candidate) => {
    if (!acc[candidate.position]) acc[candidate.position] = [];
    acc[candidate.position].push(candidate);
    return acc;
  }, {}) || {};
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const selectedCandidates = formData.getAll("candidateId");
    if (selectedCandidates.length > 0) {
      for (const id of selectedCandidates) {
        const { error: rpcError } = await supabase.rpc("increment_vote", { candidate_id: id });
        if (rpcError) console.error("Error incrementing vote:", rpcError);
      }
      const { error } = await supabase.from("students").update({ has_voted: true, voted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("student_id", studentId);
      if (!error) {
        return Astro2.redirect(`/section/${token}?success=voted`);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "VoterLayout", $$VoterLayout, { "title": "Official Ballot | COMELEC", "data-astro-cid-74x777q6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full max-w-3xl py-12" data-astro-cid-74x777q6> <header class="text-center mb-12 space-y-4" data-astro-cid-74x777q6> <div class="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-white/40 text-sm font-medium" data-astro-cid-74x777q6> ${renderComponent($$result2, "Landmark", Landmark, { "size": 18, "data-astro-cid-74x777q6": true })}
CTU Student Government Election 2026
</div> <h1 class="text-4xl md:text-6xl font-outfit font-bold tracking-tight" data-astro-cid-74x777q6>Official Ballot</h1> <p class="text-white/40" data-astro-cid-74x777q6>
Authenticated as <span class="text-emerald-400 font-semibold" data-astro-cid-74x777q6>${student.full_name}</span> </p> </header> <form method="POST" class="space-y-12" data-astro-cid-74x777q6> ${Object.entries(groupedCandidates).map(([position, list]) => renderTemplate`<section class="space-y-6" data-astro-cid-74x777q6> <div class="flex items-center gap-4" data-astro-cid-74x777q6> <h2 class="text-xl font-bold uppercase tracking-[0.2em] text-white/20 whitespace-nowrap" data-astro-cid-74x777q6>${position}</h2> <div class="h-px bg-white/5 w-full" data-astro-cid-74x777q6></div> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-astro-cid-74x777q6> ${list.map((candidate) => renderTemplate`<label class="relative group cursor-pointer" data-astro-cid-74x777q6> <input type="radio"${addAttribute(`candidateId`, "name")}${addAttribute(candidate.id, "value")} class="peer sr-only" required data-astro-cid-74x777q6> <div class="bento-card border-white/5 bg-white/[0.02] peer-checked:border-brand-coral peer-checked:bg-brand-coral/10 transition-all duration-300 p-6 flex items-center justify-between group-hover:bg-white/[0.05]" data-astro-cid-74x777q6> <div class="flex items-center gap-4" data-astro-cid-74x777q6> <div class="relative" data-astro-cid-74x777q6> ${candidate.image_url ? renderTemplate`<img${addAttribute(candidate.image_url, "src")}${addAttribute(candidate.name, "alt")} class="w-14 h-14 rounded-full object-cover border-2 border-white/10 peer-checked:border-brand-coral transition-colors shadow-lg" data-astro-cid-74x777q6>` : renderTemplate`<div class="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-white/20 font-bold text-xl peer-checked:bg-brand-coral peer-checked:text-white transition-colors" data-astro-cid-74x777q6> ${candidate.name.charAt(0)} </div>`} </div> <div data-astro-cid-74x777q6> <div class="font-bold text-lg group-hover:text-brand-coral transition-colors" data-astro-cid-74x777q6>${candidate.name}</div> <div class="text-[10px] uppercase tracking-widest text-white/20" data-astro-cid-74x777q6>Candidate ID: ${candidate.id.slice(0, 8)}</div> </div> </div> <div class="w-6 h-6 rounded-full border-2 border-white/10 flex items-center justify-center peer-checked:border-brand-coral peer-checked:bg-brand-coral" data-astro-cid-74x777q6> ${renderComponent($$result2, "Check", Check, { "size": 14, "class": "text-white scale-0 peer-checked:scale-100 transition-transform", "data-astro-cid-74x777q6": true })} </div> </div> </label>`)} </div> </section>`)} <div class="pt-12 border-t border-white/5 flex flex-col items-center gap-6" data-astro-cid-74x777q6> <div class="text-center space-y-2" data-astro-cid-74x777q6> <h3 class="text-lg font-semibold" data-astro-cid-74x777q6>Review Your Selections</h3> <p class="text-white/20 text-xs italic" data-astro-cid-74x777q6>By submitting this ballot, you confirm that your choices are final.</p> </div> <button type="button" class="btn-primary px-12 py-5 rounded-2xl flex items-center gap-3 text-lg group shadow-[0_0_50px_rgba(255,85,85,0.2)]" onclick="document.getElementById('vote-modal').showModal()" data-astro-cid-74x777q6> ${renderComponent($$result2, "Vote", Vote, { "size": 24, "data-astro-cid-74x777q6": true })}
Cast My Final Vote
<span class="group-hover:translate-x-1 transition-transform" data-astro-cid-74x777q6>→</span> </button> </div> <!-- Vote Confirmation Modal --> <dialog id="vote-modal" class="bg-brand-black border border-white/10 rounded-3xl p-0 overflow-hidden max-w-md w-full" data-astro-cid-74x777q6> <div class="p-8" data-astro-cid-74x777q6> <div class="w-16 h-16 bg-brand-coral/10 text-brand-coral rounded-2xl flex items-center justify-center mb-6" data-astro-cid-74x777q6> ${renderComponent($$result2, "Vote", Vote, { "size": 32, "data-astro-cid-74x777q6": true })} </div> <h3 class="text-2xl font-outfit font-semibold mb-2 text-white" data-astro-cid-74x777q6>Cast your vote?</h3> <p class="text-white/60 text-sm mb-8" data-astro-cid-74x777q6>Once you submit, your ballot will be final and you will not be able to change your vote or vote again.</p> <div class="flex gap-4" data-astro-cid-74x777q6> <button type="button" onclick="this.closest('dialog').close()" class="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 transition-colors" data-astro-cid-74x777q6>Wait, Go Back</button> <button type="submit" class="flex-1 btn-primary py-3 rounded-xl" data-astro-cid-74x777q6>Yes, Submit Vote</button> </div> </div> </dialog> </form> </div> ` })} `;
}, "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/section/[token]/ballot.astro", void 0);

const $$file = "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/section/[token]/ballot.astro";
const $$url = "/section/[token]/ballot";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Ballot,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
