import { useTranslations } from 'next-intl';
import { buildWhatsAppUrl } from '../constants';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function FloatingWhatsApp() {
  const t = useTranslations('S4i.WhatsApp');
  const url = buildWhatsAppUrl(t('prefill'));

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label={t('ariaFloating')}
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
