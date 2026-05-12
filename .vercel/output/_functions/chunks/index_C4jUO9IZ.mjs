import { c as createComponent } from './astro-component_C3DWg1k6.mjs';
import 'piccolore';
import { n as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_DHDXgHmb.mjs';
import { $ as $$VoterLayout } from './VoterLayout_CQmdaQGK.mjs';
import { S as SectionStatus } from './SectionStatus_B61OPlsi.mjs';
import { s as supabase } from './supabase_DWl81F3w.mjs';
import { Check } from 'lucide-react';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const { token } = Astro2.params;
  const { data: section, error: sectionError } = await supabase.from("sections").select("*").eq("token", token).single();
  if (sectionError || !section) {
    return Astro2.redirect("/404");
  }
  const { data: students } = await supabase.from("students").select("*").eq("section_id", section.id).order("full_name");
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const studentId = formData.get("studentId");
    if (studentId) {
      return Astro2.redirect(`/section/${token}/ballot?studentId=${studentId}`);
    }
  }
  return renderTemplate`${renderComponent($$result, "VoterLayout", $$VoterLayout, { "title": `${section.name} | Live Turnout`, "data-astro-cid-pqsqqeyy": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-astro-cid-pqsqqeyy> <!-- Left Side: Branding & Info --> <div class="space-y-8" data-astro-cid-pqsqqeyy> <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-coral/10 text-brand-coral text-[10px] font-bold uppercase tracking-widest border border-brand-coral/20" data-astro-cid-pqsqqeyy> <span class="relative flex h-2 w-2" data-astro-cid-pqsqqeyy> <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-coral/40 opacity-75" data-astro-cid-pqsqqeyy></span> <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-coral" data-astro-cid-pqsqqeyy></span> </span>
Election Live
</div> <div class="space-y-4" data-astro-cid-pqsqqeyy> <h1 class="text-5xl md:text-7xl font-outfit font-bold tracking-tighter leading-none" data-astro-cid-pqsqqeyy> ${section.name} <br data-astro-cid-pqsqqeyy> <span class="text-white/20" data-astro-cid-pqsqqeyy>Voter Turnout</span> </h1> <p class="text-white/40 text-lg max-w-sm" data-astro-cid-pqsqqeyy>
Transparent, real-time election monitoring for the CTU Student Government.
</p> </div> ${Astro2.url.searchParams.has("success") && renderTemplate`<div class="p-6 bg-brand-coral/10 border border-brand-coral/20 rounded-2xl flex items-center gap-4 text-brand-coral" data-astro-cid-pqsqqeyy> ${renderComponent($$result2, "Check", Check, { "size": 24, "data-astro-cid-pqsqqeyy": true })} <div data-astro-cid-pqsqqeyy> <div class="font-bold" data-astro-cid-pqsqqeyy>Vote Successfully Cast!</div> <div class="text-xs opacity-60" data-astro-cid-pqsqqeyy>Thank you for participating in the election.</div> </div> </div>`} ${Astro2.url.searchParams.has("error") && renderTemplate`<div class="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-400" data-astro-cid-pqsqqeyy> <div class="font-bold" data-astro-cid-pqsqqeyy>Error: ${Astro2.url.searchParams.get("error") === "already_voted" ? "You have already voted." : "An error occurred."}</div> </div>`} <div class="bento-card bg-white/[0.03] border-white/5 p-8 max-w-sm" data-astro-cid-pqsqqeyy> <h2 class="font-semibold mb-4 flex items-center gap-2" data-astro-cid-pqsqqeyy>
Cast Your Ballot
</h2> <form method="POST" class="space-y-4" data-astro-cid-pqsqqeyy> <div class="space-y-2" data-astro-cid-pqsqqeyy> <label class="text-[10px] font-bold uppercase tracking-widest text-white/20" data-astro-cid-pqsqqeyy>Verify Identity</label> <select name="studentId" required class="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-coral transition-colors appearance-none" data-astro-cid-pqsqqeyy> <option value="" data-astro-cid-pqsqqeyy>Select your name...</option> ${students?.filter((s) => !s.has_voted).map((s) => renderTemplate`<option${addAttribute(s.student_id, "value")} data-astro-cid-pqsqqeyy>${s.full_name}</option>`)} </select> </div> <button type="submit" class="w-full btn-primary py-4 rounded-xl" data-astro-cid-pqsqqeyy>
Confirm & Vote
</button> <p class="text-[10px] text-center text-white/10 italic" data-astro-cid-pqsqqeyy>
*Once submitted, your status will update instantly.
</p> </form> </div> </div> <!-- Right Side: Real-time Island --> <div class="w-full" data-astro-cid-pqsqqeyy> ${renderComponent($$result2, "SectionStatus", SectionStatus, { "client:load": true, "sectionId": section.id, "initialStudents": students || [], "client:component-hydration": "load", "client:component-path": "C:/Users/L E N O V O/Documents/ctuac-comelect/src/components/SectionStatus", "client:component-export": "default", "data-astro-cid-pqsqqeyy": true })} </div> </div> ` })}`;
}, "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/section/[token]/index.astro", void 0);

const $$file = "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/section/[token]/index.astro";
const $$url = "/section/[token]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
