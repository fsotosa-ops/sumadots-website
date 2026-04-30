import { TRUST_STATS } from '../constants';

export default function Hero() {
  return (
    <header className="pt-24 md:pt-32 pb-24 md:pb-28 max-w-4xl mx-auto text-center">
      <div className="reveal reveal-d1 mb-8">
        <div className="eyebrow">
          <span className="dot"></span>
          <span>El Techo del Impacto Social</span>
        </div>
      </div>

      <p className="reveal reveal-d2 text-2xl md:text-[32px] font-light tracking-tight leading-tight text-white/65 mb-10 max-w-3xl mx-auto">
        El impacto social tiene techo.{' '}
        <span className="text-white">No es por falta de propósito</span> — es
        por falta de sistema.
      </p>

      <h1 className="reveal reveal-d2 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8">
        <span className="text-white/55">Ingeniería para el</span>
        <br />
        <span className="text-white">Impacto Social</span>
      </h1>

      <p className="reveal reveal-d3 text-base md:text-lg text-white/65 font-light leading-relaxed max-w-2xl mx-auto mb-10">
        Escalar el impacto con rigor y eficiencia. No construimos software
        aislado; creamos un sistema de inercia tecnológica alineado a sus
        objetivos estratégicos.
      </p>

      <div className="reveal reveal-d3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
        <a href="#agenda" className="cta-primary">
          Agendar diagnóstico
        </a>
        <a href="#servicios" className="cta-secondary">
          Ver el sistema
          <span className="cta-arrow">→</span>
        </a>
      </div>

      <p className="reveal reveal-d3 mb-16 font-mono text-[11px] text-white/40 tracking-[0.22em] uppercase">
        Diagnóstico gratuito · 30 min · Sin compromiso
      </p>

      <div className="reveal reveal-d4 trust-strip">
        {TRUST_STATS.map((stat) => (
          <div key={stat.label} className="trust-stat">
            <span className="num">{stat.num}</span>
            <span className="label">{stat.label}</span>
          </div>
        ))}
      </div>
    </header>
  );
}
