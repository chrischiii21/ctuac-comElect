import { c as createComponent } from './astro-component_C3DWg1k6.mjs';
import 'piccolore';
import { n as renderComponent, r as renderTemplate, m as maybeRenderHead } from './entrypoint_DHDXgHmb.mjs';
import { $ as $$VoterLayout } from './VoterLayout_CQmdaQGK.mjs';
import { Landmark } from 'lucide-react';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "VoterLayout", $$VoterLayout, { "title": "COMELEC | Live Election Portal" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="text-center space-y-12 max-w-2xl mx-auto"> <div class="flex flex-col items-center gap-6"> <div class="w-20 h-20 bg-emerald-500 rounded-3xl rotate-12 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)]"> ${renderComponent($$result2, "Landmark", Landmark, { "size": 40, "class": "-rotate-12 text-black" })} </div> <div class="space-y-2"> <h1 class="text-6xl md:text-8xl font-outfit font-bold tracking-tighter">
COME<span class="text-emerald-500">LEC</span> </h1> <p class="text-white/20 font-mono text-sm tracking-[0.5em] uppercase">Student Government Elections</p> </div> </div> <div class="p-1 w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div> <div class="space-y-6"> <p class="text-white/40 text-lg leading-relaxed">
Welcome to the official live turnout portal. Please use the unique link provided to your section to cast your vote and monitor real-time results.
</p> <div class="flex flex-col md:flex-row items-center justify-center gap-4"> <a href="/admin" class="btn-primary w-full md:w-auto px-8 py-4 rounded-2xl flex items-center justify-center gap-2">
Admin Dashboard
</a> <div class="text-white/20 text-xs font-mono">OR</div> <button class="w-full md:w-auto px-8 py-4 rounded-2xl border border-white/10 text-white/60 hover:bg-white/5 transition-colors">
Find My Section
</button> </div> </div> <div class="pt-24 grid grid-cols-3 gap-8"> <div class="text-center"> <div class="text-2xl font-bold font-outfit">Real-time</div> <div class="text-[10px] uppercase tracking-widest text-white/20 mt-1">Updates</div> </div> <div class="text-center border-x border-white/5"> <div class="text-2xl font-bold font-outfit">Secure</div> <div class="text-[10px] uppercase tracking-widest text-white/20 mt-1">Verification</div> </div> <div class="text-center"> <div class="text-2xl font-bold font-outfit">Transparent</div> <div class="text-[10px] uppercase tracking-widest text-white/20 mt-1">Live Feed</div> </div> </div> </div> ` })}`;
}, "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/index.astro", void 0);

const $$file = "C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
