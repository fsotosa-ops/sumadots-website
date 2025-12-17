import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // Idiomas soportados
  locales: ['en-US', 'es-CL','pt-BR'],
 
  // Idioma por defecto si no hay coincidencia
  defaultLocale: 'es-CL',

  // Esto evita que el prefijo /es aparezca si es el default (opcional)
  localePrefix: 'always' 
});
 
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);