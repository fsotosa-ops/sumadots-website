'use client';
import { useTranslations } from 'next-intl';
import { CALENDAR_URL } from '@/lib/links';

export default function FinalCTA() {
  const t = useTranslations('FinalCTA');

  return (
    <section
      id="final-cta"
      className="relative scroll-mt-24 py-24 md:py-32 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex mb-6">
          <div className="eyebrow">
            <span className="dot" />
            <span>{t('eyebrow')}</span>
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-8 max-w-3xl mx-auto">
          <span className="text-foreground">{t('titleSoft')}</span>{' '}
          <span className="text-foreground/55">{t('titleStrong')}</span>
        </h2>

        <p className="text-base md:text-lg text-foreground/65 font-light leading-relaxed max-w-xl mx-auto mb-10">
          {t('description')}
        </p>

        <div className="flex justify-center mb-5">
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary"
          >
            {t('cta')}
          </a>
        </div>

        <p className="font-mono text-[11px] text-foreground/45 tracking-[0.22em] uppercase">
          {t('microCta')}
        </p>
      </div>
    </section>
  );
}
