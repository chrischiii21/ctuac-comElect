import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CF9yxCz6.mjs';
import { manifest } from './manifest_CCb4YGak.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/candidates.astro.mjs');
const _page2 = () => import('./pages/admin/sections/_id_.astro.mjs');
const _page3 = () => import('./pages/admin/sections.astro.mjs');
const _page4 = () => import('./pages/admin.astro.mjs');
const _page5 = () => import('./pages/api/upload-section.astro.mjs');
const _page6 = () => import('./pages/section/_token_/ballot.astro.mjs');
const _page7 = () => import('./pages/section/_token_.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/candidates.astro", _page1],
    ["src/pages/admin/sections/[id].astro", _page2],
    ["src/pages/admin/sections/index.astro", _page3],
    ["src/pages/admin/index.astro", _page4],
    ["src/pages/api/upload-section.ts", _page5],
    ["src/pages/section/[token]/ballot.astro", _page6],
    ["src/pages/section/[token]/index.astro", _page7],
    ["src/pages/index.astro", _page8]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "e298b5e4-38a9-4ace-a8a5-ec94406a3462",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
