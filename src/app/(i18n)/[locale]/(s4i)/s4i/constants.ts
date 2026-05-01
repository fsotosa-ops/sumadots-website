export const CONTACT_EMAIL = 'felipe@sumadots.com';

export const BOOKING_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3vHSYQ5JYmIfIhA9NRWldmtt_E1oPA1iNGz-7AYFCQYfQMcBVNvSoQEOzt_t5f2tpXpFxd2TDa?gv=true';

export const WHATSAPP_NUMBER = '56994989722';

export function buildWhatsAppUrl(prefill: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`;
}

export const TRIGGER_ACCENTS: Record<'T1' | 'T2' | 'T3', string> = {
  T1: '#f87171',
  T2: '#34d399',
  T3: '#a78bfa',
};

export const TRIGGER_IDS = ['T1', 'T2', 'T3'] as const;
export type TriggerId = (typeof TRIGGER_IDS)[number];

export const DIAGNOSTIC_QUESTION_SCORES: Record<string, number[]> = {
  vertical: [2, 2, 2, 2, 1],
  team: [0, 1, 2, 1],
  stack: [2, 2, 1, 0],
  accelerator: [2, 1, 0],
  funds: [2, 1, 0],
  metrics: [1, 2, 2],
  bottleneck: [2, 2, 2, 2],
};
