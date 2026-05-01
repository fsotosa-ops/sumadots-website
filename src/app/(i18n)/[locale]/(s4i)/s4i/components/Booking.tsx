import { useTranslations } from 'next-intl';
import { BOOKING_URL, CONTACT_EMAIL, buildWhatsAppUrl } from '../constants';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function Booking() {
  const t = useTranslations('S4i.Booking');
  const tWa = useTranslations('S4i.WhatsApp');
  const whatsappUrl = buildWhatsAppUrl(tWa('prefill'));

  return (
    <section
      id="agenda"
      className="pb-32 md:pb-40 max-w-5xl mx-auto px-2 scroll-mt-24"
    >
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <div className="eyebrow mb-5">
          <span>{t('eyebrow')}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.1]">
          {t('titleSoft')}{' '}
          <span className="text-white/55">{t('titleStrong')}</span>
        </h2>
        <p className="text-base md:text-lg text-white/65 font-light leading-relaxed">
          {t('description')}
        </p>
      </div>

      <div className="booking-frame">
        <div className="browser-chrome">
          <div className="chrome-dots">
            <span className="chrome-dot dot-red" aria-hidden="true"></span>
            <span className="chrome-dot dot-yellow" aria-hidden="true"></span>
            <span className="chrome-dot dot-green" aria-hidden="true"></span>
          </div>
          <div className="chrome-url">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span className="chrome-url-text">calendar.google.com</span>
          </div>
          <div className="chrome-meta"></div>
        </div>

        <iframe
          src={BOOKING_URL}
          title={t('iframeTitle')}
          width="100%"
          height="600"
          frameBorder="0"
          style={{ border: 0 }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-8">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-fallback contact-whatsapp"
        >
          <WhatsAppIcon size={13} /> {t('whatsapp')}
        </a>
        <span className="text-white/15 font-mono">·</span>
        <a href={`mailto:${CONTACT_EMAIL}`} className="contact-fallback">
          {CONTACT_EMAIL}
        </a>
      </div>
    </section>
  );
}
