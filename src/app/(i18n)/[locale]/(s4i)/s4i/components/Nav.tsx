import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LocaleSwitcher from '@/app/components/LocaleSwitcher';

export default function Nav() {
  const t = useTranslations('S4i.Nav');

  return (
    <>
      <nav className="max-w-6xl mx-auto px-6 md:px-10 py-7 flex justify-between items-center">
        <a
          href="#top"
          aria-label={t('backToTop')}
          className="flex items-center transition-transform hover:scale-[1.02]"
        >
          <img
            src="/s4i/sumadots_for_impact.png"
            alt={t('logoAlt')}
            className="w-40 md:w-52 h-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href="#servicios" className="nav-link">
            {t('servicios')}
          </a>
          <a href="#para-quien" className="nav-link">
            {t('paraQuien')}
          </a>
          <a href="#clientes" className="nav-link">
            {t('clientes')}
          </a>
          <a href="#founders" className="nav-link">
            {t('founders')}
          </a>
          <Link href="/" className="nav-link inline-flex items-center gap-1">
            {t('sumadots')}
            <span className="text-white/30">↗</span>
          </Link>
          <a href="#agenda" className="nav-cta">
            {t('cta')}
            <span className="arrow">→</span>
          </a>
          <LocaleSwitcher />
        </div>

        <div className="md:hidden">
          <LocaleSwitcher />
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="hairline"></div>
      </div>
    </>
  );
}
