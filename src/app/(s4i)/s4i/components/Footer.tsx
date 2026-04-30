import { CONTACT_EMAIL } from '../constants';

export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 md:px-10 mt-20 md:mt-32">
      <div className="hairline mb-12 md:mb-16"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-16">
        <div className="md:col-span-2">
          <img
            src="/s4i/sumadots_for_impact.png"
            alt="Sumadots for Impact"
            className="w-32 md:w-40 h-auto object-contain mb-5 opacity-60 hover:opacity-100 transition-opacity duration-300"
          />
          <p className="text-[13px] text-white/40 font-light leading-relaxed max-w-xs">
            Ingeniería y estrategia operativa para organizaciones que buscan
            escalar su impacto social sin deuda técnica.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4">
            Ecosistema
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="https://www.sumadots.com/es-CL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-white/50 hover:text-white transition-colors"
              >
                Sumadots ↗
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4">
            Contacto
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="#agenda"
                className="text-[13px] text-white/50 hover:text-white transition-colors"
              >
                Agendar Diagnóstico
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[13px] text-white/50 hover:text-[#7c3aed] transition-colors"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white-[0.03]">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] shadow-[0_0_8px_rgba(124,58,237,0.8)]"></div>
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.28em]">
            System · Operational
          </span>
        </div>

        <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.28em] text-center">
          © {new Date().getFullYear()} SUMADOTS FOR IMPACT · All Rights
          Reserved
        </p>

        <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.28em]">
          SCL · MIA
        </span>
      </div>
    </footer>
  );
}
