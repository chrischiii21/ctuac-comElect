import { Toaster as SonnerToaster } from 'sonner';

export default function Toaster() {
  return (
    <SonnerToaster 
      position="top-right" 
      theme="dark" 
      expand={true}
      richColors 
      toastOptions={{
        style: {
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          color: 'white',
        }
      }}
    />
  );
}
