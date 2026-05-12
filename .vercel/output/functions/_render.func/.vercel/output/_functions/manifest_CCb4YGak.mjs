import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CT1tFO-W.mjs';
import 'es-module-lexer';
import { i as decodeKey } from './chunks/astro/server_C3obWGp1.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/L%20E%20N%20O%20V%20O/Documents/ctuac-comelect/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Cncekc7b.js"}],"styles":[{"type":"external","src":"/_astro/candidates.C4qQnTOo.css"},{"type":"inline","content":"select[data-astro-cid-uu2oykal]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' opacity='0.2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:right 1rem center;background-size:1.5em}\n"}],"routeData":{"route":"/admin/candidates","isIndex":false,"type":"page","pattern":"^\\/admin\\/candidates\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"candidates","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/candidates.astro","pathname":"/admin/candidates","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Cncekc7b.js"}],"styles":[{"type":"external","src":"/_astro/candidates.C4qQnTOo.css"}],"routeData":{"route":"/admin/sections/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/sections\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"sections","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/admin/sections/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Cncekc7b.js"}],"styles":[{"type":"external","src":"/_astro/candidates.C4qQnTOo.css"}],"routeData":{"route":"/admin/sections","isIndex":true,"type":"page","pattern":"^\\/admin\\/sections\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"sections","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/sections/index.astro","pathname":"/admin/sections","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.jSWIx1oX.js"}],"styles":[{"type":"external","src":"/_astro/candidates.C4qQnTOo.css"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/upload-section","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/upload-section\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"upload-section","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/upload-section.ts","pathname":"/api/upload-section","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DSOvC7Ow.js"}],"styles":[{"type":"external","src":"/_astro/candidates.C4qQnTOo.css"},{"type":"inline","content":"input[data-astro-cid-74x777q6]:checked~.bento-card[data-astro-cid-74x777q6]{transform:translateY(-4px);box-shadow:0 10px 30px -10px #ff55554d}\n"}],"routeData":{"route":"/section/[token]/ballot","isIndex":false,"type":"page","pattern":"^\\/section\\/([^/]+?)\\/ballot\\/?$","segments":[[{"content":"section","dynamic":false,"spread":false}],[{"content":"token","dynamic":true,"spread":false}],[{"content":"ballot","dynamic":false,"spread":false}]],"params":["token"],"component":"src/pages/section/[token]/ballot.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DSOvC7Ow.js"}],"styles":[{"type":"external","src":"/_astro/candidates.C4qQnTOo.css"},{"type":"inline","content":"select[data-astro-cid-pqsqqeyy]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' opacity='0.2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:right 1rem center;background-size:1.5em}\n"}],"routeData":{"route":"/section/[token]","isIndex":true,"type":"page","pattern":"^\\/section\\/([^/]+?)\\/?$","segments":[[{"content":"section","dynamic":false,"spread":false}],[{"content":"token","dynamic":true,"spread":false}]],"params":["token"],"component":"src/pages/section/[token]/index.astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DSOvC7Ow.js"}],"styles":[{"type":"external","src":"/_astro/candidates.C4qQnTOo.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/admin/candidates.astro",{"propagation":"none","containsHead":true}],["C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/admin/sections/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/admin/sections/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/section/[token]/ballot.astro",{"propagation":"none","containsHead":true}],["C:/Users/L E N O V O/Documents/ctuac-comelect/src/pages/section/[token]/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/admin/candidates@_@astro":"pages/admin/candidates.astro.mjs","\u0000@astro-page:src/pages/admin/sections/[id]@_@astro":"pages/admin/sections/_id_.astro.mjs","\u0000@astro-page:src/pages/admin/sections/index@_@astro":"pages/admin/sections.astro.mjs","\u0000@astro-page:src/pages/api/upload-section@_@ts":"pages/api/upload-section.astro.mjs","\u0000@astro-page:src/pages/section/[token]/ballot@_@astro":"pages/section/_token_/ballot.astro.mjs","\u0000@astro-page:src/pages/section/[token]/index@_@astro":"pages/section/_token_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/L E N O V O/Documents/ctuac-comelect/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_CCb4YGak.mjs","C:/Users/L E N O V O/Documents/ctuac-comelect/src/components/Toaster":"_astro/Toaster.D6TPmgOI.js","/astro/hoisted.js?q=0":"_astro/hoisted.jSWIx1oX.js","/astro/hoisted.js?q=1":"_astro/hoisted.DSOvC7Ow.js","C:/Users/L E N O V O/Documents/ctuac-comelect/src/components/VoteStandings":"_astro/VoteStandings.DlyFVYEg.js","@astrojs/react/client.js":"_astro/client.D-R5JqEN.js","C:/Users/L E N O V O/Documents/ctuac-comelect/src/components/SectionStatus":"_astro/SectionStatus.DXxhqGrr.js","/astro/hoisted.js?q=2":"_astro/hoisted.Cncekc7b.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/candidates.C4qQnTOo.css","/logo.jpg","/data/sample_students.csv","/_astro/browser.Q4dEN22c.js","/_astro/client.D-R5JqEN.js","/_astro/createLucideIcon.Q6t8lqzf.js","/_astro/hoisted.Cncekc7b.js","/_astro/hoisted.DSOvC7Ow.js","/_astro/hoisted.jSWIx1oX.js","/_astro/index.Ckm1FQso.js","/_astro/index.DGbRx3yF.js","/_astro/index.DOJto88o.js","/_astro/jsx-runtime.Drj9pAKT.js","/_astro/SectionStatus.DXxhqGrr.js","/_astro/Toaster.D6TPmgOI.js","/_astro/toasts.DTpQMfWf.js","/_astro/VoteStandings.DlyFVYEg.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"WrmWsNij1e+PgguNHGSoljy9WH3Fnxl9UCAKDTNoGq4=","experimentalEnvGetSecretEnabled":false});

export { manifest };
