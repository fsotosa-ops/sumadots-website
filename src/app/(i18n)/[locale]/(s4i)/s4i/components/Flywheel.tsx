'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';

const TerminalIcon: ReactNode = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
const ServerIcon: ReactNode = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
const ChartIcon: ReactNode = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

type PhaseId = 'P1' | 'P2' | 'P3';

const PHASE_META: Array<{
  phaseId: PhaseId;
  idx: string;
  accent: string;
  icon: ReactNode;
}> = [
  { phaseId: 'P1', idx: '01', accent: '#cbd5e1', icon: TerminalIcon },
  { phaseId: 'P2', idx: '02', accent: '#a78bfa', icon: ServerIcon },
  { phaseId: 'P3', idx: '03', accent: '#7c3aed', icon: ChartIcon },
];

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');
}

type LocalizedPhase = {
  phaseId: PhaseId;
  idx: string;
  accent: string;
  icon: ReactNode;
  name: string;
  subtitle: string;
  items: string[];
};

export default function Flywheel() {
  const t = useTranslations('S4i.Flywheel');
  const [activePhase, setActivePhase] = useState(0);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  const PHASES: LocalizedPhase[] = PHASE_META.map((m) => {
    const phase = t.raw(`phases.${m.phaseId}`) as {
      name: string;
      subtitle: string;
      items: string[];
    };
    return { ...m, ...phase };
  });

  const size = 600;
  const center = size / 2;
  const orbitRadius = 200;
  const labelRadius = 265;
  const gapDegrees = 12;

  const sliceAngle = 360 / PHASES.length;

  const sectors = PHASES.map((p, i) => {
    const baseStartAngle = i * sliceAngle - sliceAngle / 2;
    const baseEndAngle = baseStartAngle + sliceAngle;

    const startAngle = baseStartAngle + gapDegrees / 2;
    const endAngle = baseEndAngle - gapDegrees / 2;

    const path = describeArc(center, center, orbitRadius, startAngle, endAngle);

    const midAngle = baseStartAngle + sliceAngle / 2;
    const labelCoords = polarToCartesian(
      center,
      center,
      labelRadius,
      midAngle,
    );

    return {
      ...p,
      path,
      labelPos: {
        left: `${(labelCoords.x / size) * 100}%`,
        top: `${(labelCoords.y / size) * 100}%`,
      },
    };
  });

  const active = sectors[activePhase];
  const centerData = hoveredPhase !== null ? sectors[hoveredPhase] : null;

  return (
    <section id="servicios" className="pt-12 pb-24 md:pb-32 scroll-mt-24">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <div className="eyebrow mb-5">
          <span>{t('eyebrow')}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5">
          {t('titleSoft')}{' '}
          <span className="text-white/55">{t('titleStrong')}</span>
        </h2>
        <p className="text-base md:text-lg text-white/65 font-light leading-relaxed">
          {t('description')}
        </p>
      </div>

      <div
        className="flywheel-disk-wrapper"
        style={
          {
            ['--hub-accent' as string]: centerData ? centerData.accent : '#ffffff',
          } as CSSProperties
        }
        onMouseLeave={() => setHoveredPhase(null)}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="flywheel-disk-svg"
          aria-hidden="true"
        >
          <defs>
            <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          <circle
            cx={center}
            cy={center}
            r="130"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />
          <circle
            cx={center}
            cy={center}
            r={orbitRadius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          <circle
            cx={center}
            cy={center}
            r="280"
            fill="none"
            stroke="rgba(255,255,255,0.02)"
            strokeWidth="1"
          />

          {sectors.map((sector, i) => {
            const isActive = activePhase === i || hoveredPhase === i;
            return (
              <path
                key={`sec-${i}`}
                d={sector.path}
                fill="none"
                stroke={sector.accent}
                strokeOpacity={isActive ? 1 : 0.3}
                strokeWidth={isActive ? '4' : '2'}
                strokeLinecap="round"
                className="flywheel-arc"
                style={{ transition: 'all 300ms ease' }}
              />
            );
          })}

          <g className="flywheel-satellite">
            <circle
              cx={center}
              cy={center - orbitRadius}
              r="4"
              fill={active.accent}
              filter="url(#dot-glow)"
              style={{ transition: 'fill 480ms ease' }}
            />
            <circle
              cx={center}
              cy={center - orbitRadius}
              r="1.5"
              fill="#fff"
            />
          </g>
        </svg>

        {sectors.map((sector, i) => {
          const isActive = activePhase === i || hoveredPhase === i;
          return (
            <div
              key={`label-${i}`}
              className={`pill-container ${isActive ? 'is-active' : ''} ${
                hoveredPhase === i ? 'is-hovered' : ''
              }`}
              style={
                {
                  top: sector.labelPos.top,
                  left: sector.labelPos.left,
                  ['--sec-accent' as string]: sector.accent,
                } as CSSProperties
              }
              onMouseEnter={() => setHoveredPhase(i)}
              onClick={() => setActivePhase(i)}
            >
              <button
                className="pill-label"
                aria-label={t('ariaLabelTemplate', {
                  phaseId: sector.phaseId,
                  name: sector.name,
                })}
              >
                <div className="pill-icon">{sector.icon}</div>
                <span className="pill-text">{sector.name}</span>
              </button>

              <div className={`pill-tooltip tooltip-pos-${i}`}>
                <ul className="pill-tooltip-list">
                  {sector.items.map((item) => (
                    <li key={item}>
                      <span style={{ color: sector.accent }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        <div className="hub-center-disk">
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.3em] mb-2">
            {t('hubLabel')}
          </span>
          <h3 className="text-[36px] md:text-[40px] font-extrabold text-white tracking-tight leading-none mb-2">
            OKRs
          </h3>
          <div className="w-8 h-px bg-white/10 mb-2"></div>
          <span className="text-[12px] text-white/50 font-medium">
            {t('hubSubtitle')}
          </span>
        </div>
      </div>

      <div className="flywheel-detail mobile-only" key={activePhase}>
        <div
          className="font-mono text-[11px] uppercase tracking-[0.28em] mb-4"
          style={{ color: active.accent }}
        >
          {active.phaseId} · {t('detailSuffix')}
        </div>
        <h4 className="text-2xl md:text-[28px] font-semibold text-white tracking-tight mb-6">
          {active.subtitle}
        </h4>
        <ul className="flywheel-detail-bullets">
          {active.items.map((item) => (
            <li key={item}>
              <span
                className="font-mono mt-[2px]"
                style={{ color: active.accent }}
              >
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
