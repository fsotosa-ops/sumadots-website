import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

export default function Navbar() {
  const t = useTranslations('Navbar');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
      <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
        SUMADOTS
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <Link href="/#services" className="hover:text-white transition-colors">{t('services')}</Link>
        <Link href="/blog" className="hover:text-white transition-colors">{t('blog')}</Link>
        <Link href="/#contact" className="hover:text-white transition-colors">{t('contact')}</Link>
      </div>

      <div className="flex items-center gap-4">
        <LocaleSwitcher />
      </div>
    </nav>
  );
}