import { c as createComponent } from './astro-component_DWe0-cby.mjs';
import 'piccolore';
import { h as addAttribute, o as renderHead, n as renderComponent, p as renderSlot, r as renderTemplate } from './entrypoint_B_saWg1x.mjs';
import { T as Toaster, r as renderScript } from './Toaster_D2OPQX15.mjs';

const $$VoterLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$VoterLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | CTU COMELEC</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-black text-white font-inter selection:bg-emerald-500/30"> ${renderComponent($$result, "Toaster", Toaster, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/L E N O V O/Documents/ctuac-comelect/src/components/Toaster", "client:component-export": "default" })} <div class="min-h-screen flex flex-col"> <main class="flex-1 flex flex-col items-center justify-center p-6"> ${renderSlot($$result, $$slots["default"])} </main> </div> ${renderScript($$result, "C:/Users/L E N O V O/Documents/ctuac-comelect/src/layouts/VoterLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/L E N O V O/Documents/ctuac-comelect/src/layouts/VoterLayout.astro", void 0);

export { $$VoterLayout as $ };
