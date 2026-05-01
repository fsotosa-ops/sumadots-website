'use client';
import { useTranslations } from 'next-intl';
import { Cpu, Layers, BrainCircuit, ArrowRight } from 'lucide-react';
import { CALENDAR_URL } from '@/lib/links';

type ServiceKey = 'infrastructure' | 'product' | 'intelligence';

const SERVICES: Array<{
  key: ServiceKey;
  tag: string;
  icon: typeof Cpu;
  accent: string;
}> = [
  {
    key: 'infrastructure',
    tag: '01 / Core',
    icon: Cpu,
    accent: '#a78bfa',
  },
  {
    key: 'product',
    tag: '02 / Modelo A',
    icon: Layers,
    accent: '#7c3aed',
  },
  {
    key: 'intelligence',
    tag: '03 / Data & IA',
    icon: BrainCircuit,
    accent: '#cbd5e1',
  },
];

export default function ServicesBento() {
  const t = useTranslations('Services');

  return (
    <section
      id="services-section"
      className="relative scroll-mt-24 py-24 md:py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const capabilities = (t.raw(
              `${s.key}.capabilities`,
            ) as string[]) ?? [];

            return (
              <a
                key={s.key}
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col p-6 md:p-8 rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--boutique-surface)] hover:bg-[color:var(--boutique-surface-hover)] hover:border-[color:var(--hairline-strong)] hover:-translate-y-1 transition-all duration-320"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center border"
                    style={{
                      color: s.accent,
                      background: `color-mix(in srgb, ${s.accent} 10%, transparent)`,
                      borderColor: `color-mix(in srgb, ${s.accent} 22%, transparent)`,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
                    {s.tag}
                  </span>
                </div>

                <h3 className="text-xl md:text-[22px] font-bold tracking-tight text-foreground mb-3">
                  {t(`${s.key}.title`)}
                </h3>
                <p className="text-sm md:text-[15px] text-foreground/65 font-light leading-relaxed mb-6">
                  {t(`${s.key}.description`)}
                </p>

                <ul className="flex flex-col gap-2 mb-8">
                  {capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-2 text-[13px] text-foreground/70 font-light"
                    >
                      <span
                        className="font-mono mt-[3px] flex-shrink-0"
                        style={{ color: s.accent }}
                      >
                        —
                      </span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 border-t border-[color:var(--hairline)] flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55 group-hover:text-foreground transition-colors">
                    {t(`${s.key}.cta`)}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
