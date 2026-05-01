'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { CALENDAR_URL, TRINIDAD_URL } from '@/lib/links';

const CONTACT_EMAIL = 'felipe@sumadots.com';
const WHATSAPP_URL = 'https://wa.me/56994989722';

export default function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[color:var(--hairline)] bg-background/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-14">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-5 transition-opacity hover:opacity-80"
            >
              <Image
                src="/suma-icon.svg"
                alt="Sumadots"
                width={32}
                height={32}
                className="dark:invert"
              />
              <span className="font-mono text-[12px] uppercase tracking-[0.28em] text-foreground">
                Sumadots
              </span>
            </Link>
            <p className="text-sm text-foreground/65 font-light leading-relaxed max-w-sm mb-6">
              {t('tagline')}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="capability-chip">Software Factory</span>
              <span className="capability-chip">Automatización</span>
              <span className="capability-chip">Data &amp; IA</span>
            </div>
          </div>

          {/* Sitio */}
          <div className="md:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/45 mb-4 block">
              {t('siteHeading')}
            </span>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/#services-section"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  {t('linkServices')}
                </Link>
              </li>
              <li>
                <Link
                  href="/s4i"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  {t('linkImpact')}
                  <span className="text-foreground/40">↗</span>
                </Link>
              </li>
              <li>
                <a
                  href={TRINIDAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  {t('linkTrinidad')}
                  <span className="text-foreground/40">↗</span>
                </a>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div className="md:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/45 mb-4 block">
              {t('legalHeading')}
            </span>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  {t('linkTerms')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  {t('linkPrivacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/45 mb-4 block">
              {t('contactHeading')}
            </span>
            <ul className="flex flex-col gap-3 mb-6">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  WhatsApp
                  <span className="text-foreground/40">↗</span>
                </a>
              </li>
              <li>
                <span className="text-sm text-foreground/55 font-light">
                  Santiago · Chile
                </span>
              </li>
            </ul>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary text-[12px]"
              style={{ padding: '8px 16px' }}
            >
              {t('ctaSchedule')}
              <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[color:var(--hairline)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-foreground/45 uppercase tracking-[0.22em]">
            © {year} Suma Dots SpA · {t('rights')}
          </p>
          <p className="font-mono text-[10px] text-foreground/45 uppercase tracking-[0.22em]">
            {t('madeIn')}
          </p>
        </div>
      </div>
    </footer>
  );
}
