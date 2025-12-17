import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Matcher para saltar carpetas internas como _next o api
  matcher: ['/', '/(es|en)/:path*']
};