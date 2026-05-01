import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { TRIGGER_ACCENTS, TRIGGER_IDS, type TriggerId } from '../constants';

const Icons: Record<TriggerId, React.ReactNode> = {
  T1: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  T2: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M12 12h.01" />
      <path d="M17 12h.01" />
      <path d="M7 12h.01" />
    </svg>
  ),
  T3: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

export default function ParaQuien() {
  const t = useTranslations('S4i.ParaQuien');
  const tRoot = useTranslations('S4i');
  const verticales = tRoot.raw('Verticales') as string[];

  return (
    <section
      id="para-quien"
      className="pb-32 md:pb-40 max-w-6xl mx-auto scroll-mt-24 px-4"
    >
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="eyebrow mb-5">
          <span>{t('eyebrow')}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.1]">
          {t('titleSoft')}
          <br />
          <span className="text-white/55">{t('titleStrong')}</span>
        </h2>
        <p className="text-base md:text-lg text-white/65 font-light leading-relaxed">
          {t('descriptionLead')}
          <span className="text-white font-medium">
            {t('descriptionRegion')}
          </span>
          {t('descriptionTrail')}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-16">
        {verticales.map((v) => (
          <span key={v} className="capability-chip">
            {v}
          </span>
        ))}
      </div>

      <div className="text-center mb-8">
        <span className="font-mono text-[11px] text-white/40 uppercase tracking-[0.3em]">
          {t('listenLabel')}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {TRIGGER_IDS.map((id) => {
          const accent = TRIGGER_ACCENTS[id];
          return (
            <div
              key={id}
              className="trigger-card group"
              style={{ ['--trigger-accent' as string]: accent } as CSSProperties}
            >
              <div className="trigger-glow" />

              <div className="trigger-header">
                <div className="trigger-icon">{Icons[id]}</div>

                <span className="trigger-tag flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      backgroundColor: accent,
                      boxShadow: `0 0 8px ${accent}`,
                    }}
                  />
                  {t('triggerLabelTemplate', { id })}
                </span>
              </div>

              <h3 className="trigger-title">{t(`triggers.${id}.title`)}</h3>

              <p className="trigger-desc">{t(`triggers.${id}.description`)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
