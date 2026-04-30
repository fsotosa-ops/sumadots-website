import { WHATSAPP_URL } from '../constants';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Conversa por WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
