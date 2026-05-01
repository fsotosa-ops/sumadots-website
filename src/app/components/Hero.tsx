'use client';
import { useTranslations } from 'next-intl';
import { CALENDAR_URL } from '@/lib/links';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section
      id="hero"
      className="relative min-h-[88vh] flex flex-col items-center justify-center px-6 pt-32 md:pt-36 pb-20 md:pb-28 text-center"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="reveal reveal-d1 mb-8 flex justify-center">
          <div className="eyebrow">
            <span className="dot" />
            <span>{t('eyebrow')}</span>
          </div>
        </div>

        <h1 className="reveal reveal-d2 text-[44px] md:text-7xl font-extrabold tracking-tight leading-[1.02] mb-8 max-w-4xl mx-auto">
          <span className="text-foreground">{t('titleLine1')}</span>{' '}
          <span className="text-foreground/55">{t('titleLine2')}</span>
        </h1>

        <p className="reveal reveal-d3 text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-2xl mx-auto mb-12">
          {t('description')}
        </p>

        <div className="reveal reveal-d3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary"
          >
            {t('ctaPrimary')}
          </a>
          <a href="/s4i" className="cta-secondary">
            {t('ctaSecondary')}
            <span className="cta-arrow">→</span>
          </a>
        </div>

        <p className="reveal reveal-d3 font-mono text-[11px] text-foreground/45 tracking-[0.22em] uppercase">
          {t('microCta')}
        </p>
      </div>
    </section>
  );
}
