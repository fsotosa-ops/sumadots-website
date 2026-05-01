'use client';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';
import { CALENDAR_URL } from '@/lib/links';

export default function Navbar() {
  const t = useTranslations('Navbar');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[color:var(--hairline)] bg-background/80 backdrop-blur-md">
      <Link
        href="/"
        className="flex items-center transition-opacity hover:opacity-80"
      >
        <Image
          src="/suma-dots-logo-header.svg"
          alt="Sumadots Logo"
          width={300}
          height={64}
          className="h-20 md:h-24 w-auto dark:invert object-contain"
          priority
        />
      </Link>

      <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-foreground/55">
        <Link
          href="/#services-section"
          className="hover:text-foreground transition-colors"
        >
          {t('services')}
        </Link>
        <a
          href="/s4i"
          className="hover:text-foreground transition-colors"
        >
          {t('impact')}
        </a>
        <Link
          href="/#contact"
          className="hover:text-foreground transition-colors"
        >
          {t('contact')}
        </Link>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary-sm hidden sm:inline-flex"
        >
          {t('schedule')}
          <span className="arrow">→</span>
        </a>
        <ThemeToggle />
        <LocaleSwitcher />
      </div>
    </nav>
  );
}
