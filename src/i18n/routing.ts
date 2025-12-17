import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en-US', 'es-CL', 'pt-BR'],
  defaultLocale: 'en-US', // Cambiado a inglés americano
  localePrefix: 'always' 
});
 
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);