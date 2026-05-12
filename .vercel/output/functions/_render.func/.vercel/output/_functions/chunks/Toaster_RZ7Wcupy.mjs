import { jsx } from 'react/jsx-runtime';
import { Toaster as Toaster$1 } from 'sonner';

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

export { Toaster as T };
