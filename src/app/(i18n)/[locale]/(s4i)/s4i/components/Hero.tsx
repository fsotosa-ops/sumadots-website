import { useTranslations } from 'next-intl';

type TrustStat = { num: string; label: string };

export default function Hero() {
  const t = useTranslations('S4i.Hero');
  const tStats = useTranslations('S4i');
  const stats = tStats.raw('TrustStats') as TrustStat[];

  return (
    <header className="pt-24 md:pt-32 pb-24 md:pb-28 max-w-4xl mx-auto text-center">
      <div className="reveal reveal-d1 mb-8">
        <div className="eyebrow">
          <span className="dot"></span>
          <span>{t('eyebrow')}</span>
        </div>
      </div>

      <p className="reveal reveal-d2 text-2xl md:text-[32px] font-light tracking-tight leading-tight text-white/65 mb-10 max-w-3xl mx-auto">
        {t('subheadLead')}{' '}
        <span className="text-white">{t('subheadEmphasis')}</span>
        {t('subheadTrail')}
      </p>

      <h1 className="reveal reveal-d2 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8">
        <span className="text-white/55">{t('h1Soft')}</span>
        <br />
        <span className="text-white">{t('h1Strong')}</span>
      </h1>

      <p className="reveal reveal-d3 text-base md:text-lg text-white/65 font-light leading-relaxed max-w-2xl mx-auto mb-10">
        {t('description')}
      </p>

      <div className="reveal reveal-d3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
        <a href="#agenda" className="cta-primary">
          {t('ctaPrimary')}
        </a>
        <a href="#servicios" className="cta-secondary">
          {t('ctaSecondary')}
          <span className="cta-arrow">→</span>
        </a>
      </div>

      <p className="reveal reveal-d3 mb-16 font-mono text-[11px] text-white/40 tracking-[0.22em] uppercase">
        {t('microCta')}
      </p>

      <div className="reveal reveal-d4 trust-strip">
        {stats.map((stat) => (
          <div key={stat.label} className="trust-stat">
            <span className="num">{stat.num}</span>
            <span className="label">{stat.label}</span>
          </div>
        ))}
      </div>
    </header>
  );
}
