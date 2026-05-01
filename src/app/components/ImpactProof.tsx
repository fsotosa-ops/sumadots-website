'use client';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const STATS = [
  { num: '+$1M', labelKey: 'stat1Label' },
  { num: '+70%', labelKey: 'stat2Label' },
  { num: '1.5x', labelKey: 'stat3Label' },
  { num: '7x', labelKey: 'stat4Label' },
] as const;

const CLIENT_LOGOS = [
  { name: 'América Solidaria', src: '/s4i/clients/logo-white-anericasolidaria.svg' },
  { name: 'Fundación Summer', src: '/s4i/clients/fsummer-logo-white.png' },
  { name: 'Focus', src: '/s4i/clients/focus-logo-white.png' },
];

export default function ImpactProof() {
  const t = useTranslations('ImpactProof');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <section
      id="impact-proof"
      className="relative scroll-mt-24 py-24 md:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="inline-flex mb-5">
            <div className="eyebrow">
              <span className="dot" />
              <span>{t('eyebrow')}</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">
            <span className="text-foreground">{t('titleSoft')}</span>{' '}
            <span className="text-foreground/55">{t('titleStrong')}</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/65 font-light leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="trust-strip mb-16">
          {STATS.map((s) => (
            <div key={s.num} className="trust-stat">
              <span className="num">{s.num}</span>
              <span className="label">{t(s.labelKey)}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-14 md:gap-x-24 gap-y-8 mb-16">
          {CLIENT_LOGOS.map((c) => (
            <img
              key={c.name}
              src={c.src}
              alt={c.name}
              className={`h-10 md:h-12 w-auto max-w-[180px] object-contain opacity-60 hover:opacity-100 transition-opacity duration-500 ${
                isDark ? '' : 'invert'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          <article className="relative p-7 md:p-8 rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--boutique-surface)]">
            <Quote className="absolute top-6 right-6 w-5 h-5 text-foreground/15" />
            <span className="badge-validated mb-5">{t('validatedBadge')}</span>
            <p className="text-base md:text-lg text-foreground/80 font-light leading-relaxed mb-6">
              &ldquo;{t('quote1')}&rdquo;
            </p>
            <div className="pt-5 border-t border-[color:var(--hairline)]">
              <p className="text-sm font-semibold text-foreground">
                {t('quote1Name')}
              </p>
              <p className="font-mono text-[11px] text-foreground/50 uppercase tracking-[0.2em] mt-1">
                {t('quote1Role')}
              </p>
            </div>
          </article>

          <article className="relative p-7 md:p-8 rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--boutique-surface)]">
            <Quote className="absolute top-6 right-6 w-5 h-5 text-foreground/15" />
            <span className="badge-validated mb-5">{t('validatedBadge')}</span>
            <p className="text-base md:text-lg text-foreground/80 font-light leading-relaxed mb-6">
              &ldquo;{t('quote2')}&rdquo;
            </p>
            <div className="pt-5 border-t border-[color:var(--hairline)]">
              <p className="text-sm font-semibold text-foreground">
                {t('quote2Name')}
              </p>
              <p className="font-mono text-[11px] text-foreground/50 uppercase tracking-[0.2em] mt-1">
                {t('quote2Role')}
              </p>
            </div>
          </article>
        </div>

        <div className="flex justify-center">
          <a href="/s4i" className="cta-secondary">
            {t('seeMore')}
            <span className="cta-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
