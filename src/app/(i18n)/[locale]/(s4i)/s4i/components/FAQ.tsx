'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type FaqItem = { id: string; question: string; answer: string };

export default function FAQ() {
  const t = useTranslations('S4i.FAQ');
  const items = t.raw('items') as FaqItem[];
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section
      id="faq"
      className="pb-32 md:pb-40 max-w-3xl mx-auto scroll-mt-24 px-4"
    >
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.1]">
          {t('titleSoft')}{' '}
          <span className="text-white/55">{t('titleStrong')}</span>
        </h2>
        <p className="text-base md:text-lg text-white/65 font-light">
          {t('description')}
        </p>
      </div>

      <div className="space-y-2">
        {items.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`border-b transition-colors duration-300 ${
                isOpen
                  ? 'border-white/20'
                  : 'border-white/5 hover:border-white/10'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
              >
                <h3
                  className={`text-[17px] md:text-lg font-medium tracking-tight transition-colors duration-300 ${
                    isOpen
                      ? 'text-white'
                      : 'text-white/70 group-hover:text-white/90'
                  }`}
                >
                  {faq.question}
                </h3>
                <div
                  className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-white' : 'text-white/40'
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="pb-8 pt-2 text-[15px] md:text-base text-white/60 font-light leading-relaxed pr-10">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <a
          href="#agenda"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-medium text-sm"
        >
          {t('anotherQuestion')}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
