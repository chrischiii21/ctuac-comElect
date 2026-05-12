import { c as createComponent, d as addAttribute, r as renderHead, e as renderComponent, f as renderSlot, g as renderTemplate, h as createAstro } from './astro/server_C3obWGp1.mjs';
import 'kleur/colors';
/* empty css                              */
import { T as Toaster } from './Toaster_RZ7Wcupy.mjs';

const $$Astro = createAstro();
const $$VoterLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VoterLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | CTU COMELEC</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-black text-white font-inter selection:bg-emerald-500/30"> ${renderComponent($$result, "Toaster", Toaster, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/L E N O V O/Documents/ctuac-comelect/src/components/Toaster", "client:component-export": "default" })} <div class="min-h-screen flex flex-col"> <main class="flex-1 flex flex-col items-center justify-center p-6"> ${renderSlot($$result, $$slots["default"])} </main> </div>  </body> </html>`;
}, "C:/Users/L E N O V O/Documents/ctuac-comelect/src/layouts/VoterLayout.astro", void 0);

export { $$VoterLayout as $ };
