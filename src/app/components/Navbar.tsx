'use client';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const t = useTranslations('Navbar');
  const calendarLink = "https://calendar.app.google/rDk7iZ65kzBoKoS86";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md">
      <Link href="/" className="text-xl font-bold tracking-tighter text-foreground">
        SUMADOTS
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <Link href="/#services" className="hover:text-foreground transition-colors">{t('services')}</Link>
        <Link href="/blog" className="hover:text-foreground transition-colors">{t('blog')}</Link>
        <Link href="/#contact" className="hover:text-foreground transition-colors">{t('contact')}</Link>
      </div>

      <div className="flex items-center gap-4">
        {/* BOTÓN CON GRADIENTE DE MARCA */}
        <div className="hidden sm:block">
          <Button 
            className="rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:opacity-90 text-white font-bold px-6 h-9 text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-indigo-500/20"
            onClick={() => window.open(calendarLink, '_blank')}
          >
            {t('schedule')}
          </Button>
        </div>
        <ThemeToggle />
        <LocaleSwitcher />
      </div>
    </nav>
  );
}