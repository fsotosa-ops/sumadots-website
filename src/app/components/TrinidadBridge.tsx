'use client';
import { useTranslations } from 'next-intl';
import { TRINIDAD_URL } from '@/lib/links';

const ROLES = ['CMO', 'CPO', 'CTO'] as const;

export default function TrinidadBridge() {
  const t = useTranslations('Trinidad');

  return (
    <section
      id="trinidad"
      className="relative scroll-mt-24 py-24 md:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl border border-[color:var(--hairline-strong)] p-10 md:p-16"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 100% 0%, color-mix(in srgb, var(--accent-brand) 12%, transparent), transparent 70%), var(--boutique-surface)',
          }}
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
               style={{
                 background:
                   'radial-gradient(circle, color-mix(in srgb, var(--accent-brand-light) 8%, transparent), transparent 60%)',
                 filter: 'blur(80px)',
               }} />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex mb-5">
                <div className="eyebrow">
                  <span className="dot" />
                  <span>{t('eyebrow')}</span>
                </div>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
                <span className="text-foreground/55">{t('titleSoft')}</span>
                <br />
                <span className="text-foreground">{t('titleStrong')}</span>
              </h2>

              <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed mb-8 max-w-2xl">
                {t('description')}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {ROLES.map((role) => (
                  <span key={role} className="capability-chip">
                    {role}
                  </span>
                ))}
              </div>

              <a
                href={TRINIDAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
              >
                {t('cta')}
                <span className="cta-arrow">↗</span>
              </a>
            </div>

            <div className="lg:col-span-5">
              <div className="relative p-7 md:p-8 rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--boutique-surface)]">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/45 mb-5 block">
                  {t('contrastTag')}
                </span>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-[11px] text-foreground/45 tracking-[0.2em] flex-shrink-0 mt-1 min-w-[80px]">
                      SUMADOTS
                    </span>
                    <span className="text-sm text-foreground/80 font-light leading-relaxed">
                      {t('contrastSumadots')}
                    </span>
                  </li>
                  <li className="border-t border-[color:var(--hairline)] pt-4 flex items-start gap-3">
                    <span
                      className="font-mono text-[11px] tracking-[0.2em] flex-shrink-0 mt-1 min-w-[80px]"
                      style={{ color: 'var(--accent-brand-light)' }}
                    >
                      TRINIDAD
                    </span>
                    <span className="text-sm text-foreground/80 font-light leading-relaxed">
                      {t('contrastTrinidad')}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
