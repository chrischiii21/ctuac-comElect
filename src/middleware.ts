import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const { url, cookies, redirect } = context;

  // Protect all /admin routes
  if (url.pathname.startsWith('/admin')) {
    const accessCookie = cookies.get('admin_access')?.value;
    if (accessCookie !== 'CTUAC2026') {
      return redirect('/restricted');
    }
  }

  return next();
});
