'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Minus } from 'lucide-react';

const QUESTIONS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export default function FAQ() {
  const t = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const formatAnswer = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span key={index} className="font-semibold text-foreground">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 py-24 md:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="inline-flex mb-5">
            <div className="eyebrow">
              <span className="dot" />
              <span>{t('eyebrow')}</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">
            <span className="text-foreground">{t('titleSoft')}</span>{' '}
            <span className="text-foreground/55">{t('titleStrong')}</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/65 font-light leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="border-t border-[color:var(--hairline)]">
          {QUESTIONS.map((qKey, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={qKey}
                className="border-b border-[color:var(--hairline)]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full py-6 md:py-7 text-left cursor-pointer select-none outline-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 flex-1 pr-4">
                    <span className="font-mono text-[11px] tracking-[0.22em] text-foreground/45 mt-[7px] flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base md:text-lg font-medium text-foreground leading-snug">
                      {t(`${qKey}.question`)}
                    </span>
                  </div>
                  <span
                    className="shrink-0 w-9 h-9 rounded-full border border-[color:var(--hairline-strong)] flex items-center justify-center text-foreground/70 group-hover:border-[color:var(--accent-brand)] group-hover:text-foreground transition-all duration-200"
                    style={{
                      background: isOpen
                        ? 'color-mix(in srgb, var(--accent-brand) 12%, transparent)'
                        : 'transparent',
                      borderColor: isOpen
                        ? 'color-mix(in srgb, var(--accent-brand) 50%, transparent)'
                        : undefined,
                      color: isOpen ? 'var(--accent-brand-light)' : undefined,
                    }}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>

                <div
                  className="grid transition-all duration-400 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pl-12 pr-12 pb-7 text-[15px] md:text-base leading-relaxed text-foreground/70 font-light">
                      {formatAnswer(t(`${qKey}.answer`))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
