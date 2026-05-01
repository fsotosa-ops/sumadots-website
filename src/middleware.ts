import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Matcher inclusivo: todas las rutas excepto /api, /_next, /_vercel y archivos con extensión.
  // Permite que rutas sin prefijo de locale (e.g. /s4i) redirijan al locale del navegador.
  matcher: ['/((?!api|_next|_vercel|favicons|.*\\..*).*)']
};
