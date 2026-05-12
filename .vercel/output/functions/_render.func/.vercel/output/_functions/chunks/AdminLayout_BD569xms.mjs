import { c as createComponent, d as addAttribute, r as renderHead, e as renderComponent, f as renderSlot, g as renderTemplate, h as createAstro } from './astro/server_C3obWGp1.mjs';
import 'kleur/colors';
/* empty css                              */
import { T as Toaster } from './Toaster_RZ7Wcupy.mjs';

const $$Astro = createAstro();
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | COMELEC Live Turnout</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-black text-white font-inter selection:bg-emerald-500/30"> ${renderComponent($$result, "Toaster", Toaster, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/L E N O V O/Documents/ctuac-comelect/src/components/Toaster", "client:component-export": "default" })} <div class="min-h-screen flex flex-col"> <nav class="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50"> <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"> <div class="flex items-center gap-4"> <img src="/logo.jpg" alt="CTU Logo" class="w-10 h-10 object-contain rounded-full shadow-[0_0_15px_rgba(255,85,85,0.3)]"> <div class="flex flex-col"> <span class="font-outfit font-bold tracking-tight text-lg leading-tight">CTU-AC COMELEC</span> <span class="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Commission on Elections</span> </div> </div> <div class="flex items-center gap-6 text-sm text-white/60"> <a href="/admin" class="hover:text-white transition-colors">Overview</a> <a href="/admin/sections" class="hover:text-white transition-colors">Sections</a> <a href="/admin/candidates" class="hover:text-white transition-colors">Candidates</a> </div> </div> </nav> <main class="flex-1 max-w-7xl mx-auto w-full px-6 py-12"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="border-t border-white/5 py-12 text-center text-white/20 text-xs"> <p>&copy; 2026 CTU COMELEC • Live Turnout System</p> </footer> </div>  </body> </html>`;
}, "C:/Users/L E N O V O/Documents/ctuac-comelect/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
