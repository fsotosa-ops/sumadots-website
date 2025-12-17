import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import { ThemeToggle } from './ThemeToggle'; // Asegúrate de crear este archivo

export default function Navbar() {
  const t = useTranslations('Navbar');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md">
      <Link 
        href="/" 
        className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity text-foreground"
      >
        SUMADOTS
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link 
          href="/#services" 
          className="hover:text-foreground transition-colors"
        >
          {t('services')}
        </Link>
        <Link 
          href="/blog" 
          className="hover:text-foreground transition-colors"
        >
          {t('blog')}
        </Link>
        <Link 
          href="/#contact" 
          className="hover:text-foreground transition-colors"
        >
          {t('contact')}
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Switch para cambiar entre modo claro y oscuro */}
        <ThemeToggle />
        {/* Switch para cambiar el idioma */}
        <LocaleSwitcher />
      </div>
    </nav>
  );
}