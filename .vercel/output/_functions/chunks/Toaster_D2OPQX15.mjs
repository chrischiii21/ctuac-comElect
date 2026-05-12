import { q as createRenderInstruction } from './entrypoint_B_saWg1x.mjs';
import { jsx } from 'react/jsx-runtime';
import { Toaster as Toaster$1 } from 'sonner';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

function Toaster() {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      position: "top-right",
      theme: "dark",
      expand: true,
      richColors: true,
      toastOptions: {
        style: {
          background: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          color: "white"
        }
      }
    }
  );
}

export { Toaster as T, renderScript as r };
