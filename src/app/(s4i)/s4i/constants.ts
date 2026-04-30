export const CONTACT_EMAIL = 'felipe@sumadots.com';

export const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3vHSYQ5JYmIfIhA9NRWldmtt_E1oPA1iNGz-7AYFCQYfQMcBVNvSoQEOzt_t5f2tpXpFxd2TDa?gv=true';

export const WHATSAPP_NUMBER = '56994989722';
export const WHATSAPP_PREFILL =
  'Hola Growth Social Impact! Vengo del sitio web y me gustaría agendar un diagnóstico de 30 min. ¿Podemos coordinar?';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_PREFILL,
)}`;

export type TrustStat = { num: string; label: string };

export const TRUST_STATS: TrustStat[] = [
  { num: '+$1M', label: 'USD Recaudados' },
  { num: '+70%', label: 'Aceleración Operativa' },
  { num: '1.5x', label: 'Aumento Ticket Base' },
  { num: '7x', label: 'Aumento Ticket Nuevo' },
];

export const VERTICALES: string[] = [
  'Educación',
  'Salud',
  'Empleabilidad',
  'Microfinanzas',
];

export type Trigger = {
  id: 'T1' | 'T2' | 'T3';
  title: string;
  accent: string;
  description: string;
};

export const TRIGGERS: Trigger[] = [
  {
    id: 'T1',
    title: 'Colapso Operativo',
    accent: '#f87171',
    description:
      'Tu equipo (15-50 personas) opera con Google Sheets o herramientas desconectadas que ya llegaron a su límite y frenan la ejecución.',
  },
  {
    id: 'T2',
    title: 'Levantamiento de Fondos',
    accent: '#34d399',
    description:
      'Postulas a fondos de +$50K USD (GORE, BID) y necesitas una arquitectura técnica nivel senior para asegurar la adjudicación.',
  },
  {
    id: 'T3',
    title: 'Aceleración Activa',
    accent: '#a78bfa',
    description:
      'Eres fellow de Propel, Ashoka u otra red global y necesitas un partner técnico confiable para ejecutar tu visión.',
  },
];
