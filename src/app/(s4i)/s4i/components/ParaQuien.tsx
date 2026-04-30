import type { CSSProperties } from 'react';
import { VERTICALES, TRIGGERS } from '../constants';

const Icons: Record<'T1' | 'T2' | 'T3', React.ReactNode> = {
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
  return (
    <section
      id="para-quien"
      className="pb-32 md:pb-40 max-w-6xl mx-auto scroll-mt-24 px-4"
    >
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="eyebrow mb-5">
          <span>System Match</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.1]">
          ONGs con datos y voluntad,
          <br />
          <span className="text-white/55">y sin brazo ejecutor.</span>
        </h2>
        <p className="text-base md:text-lg text-white/65 font-light leading-relaxed">
          Operamos como partners técnicos para organizaciones de impacto en{' '}
          <span className="text-white font-medium">
            LATAM y Estados Unidos
          </span>
          . No trabajamos con ideas en papel, trabajamos con tracción.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-16">
        {VERTICALES.map((v) => (
          <span key={v} className="capability-chip">
            {v}
          </span>
        ))}
      </div>

      <div className="text-center mb-8">
        <span className="font-mono text-[11px] text-white/40 uppercase tracking-[0.3em]">
          [ Sistemas Escuchando Señales ]
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {TRIGGERS.map((t) => (
          <div
            key={t.id}
            className="trigger-card group"
            style={{ ['--trigger-accent' as string]: t.accent } as CSSProperties}
          >
            <div className="trigger-glow" />

            <div className="trigger-header">
              <div className="trigger-icon">{Icons[t.id]}</div>

              <span className="trigger-tag flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{
                    backgroundColor: t.accent,
                    boxShadow: `0 0 8px ${t.accent}`,
                  }}
                />
                Trigger {t.id}
              </span>
            </div>

            <h3 className="trigger-title">{t.title}</h3>

            <p className="trigger-desc">{t.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
