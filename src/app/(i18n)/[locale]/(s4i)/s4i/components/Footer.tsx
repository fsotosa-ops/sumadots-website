import { useTranslations } from 'next-intl';
import { CONTACT_EMAIL } from '../constants';

export default function Footer() {
  const t = useTranslations('S4i.Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="max-w-6xl mx-auto px-6 md:px-10 mt-20 md:mt-32">
      <div className="hairline mb-12 md:mb-16"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-16">
        <div className="md:col-span-2">
          <img
            src="/s4i/sumadots_for_impact.png"
            alt={t('logoAlt')}
            className="w-32 md:w-40 h-auto object-contain mb-5 opacity-60 hover:opacity-100 transition-opacity duration-300"
          />
          <p className="text-[13px] text-white/40 font-light leading-relaxed max-w-xs">
            {t('tagline')}
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4">
            {t('ecosystemHeading')}
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="https://www.sumadots.com/es-CL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-white/50 hover:text-white transition-colors"
              >
                {t('linkSumadots')}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4">
            {t('contactHeading')}
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="#agenda"
                className="text-[13px] text-white/50 hover:text-white transition-colors"
              >
                {t('linkBooking')}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[13px] text-white/50 hover:text-[#7c3aed] transition-colors"
              >
                {t('linkContact')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white-[0.03]">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] shadow-[0_0_8px_rgba(124,58,237,0.8)]"></div>
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.28em]">
            {t('systemStatus')}
          </span>
        </div>

        <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.28em] text-center">
          {t('rights', { year })}
        </p>

        <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.28em]">
          {t('city')}
        </span>
      </div>
    </footer>
  );
}
