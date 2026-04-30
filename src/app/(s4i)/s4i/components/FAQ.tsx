'use client';

import { useState } from 'react';

const FAQS = [
  {
    id: '01',
    question:
      '¿Cómo financiamos esta transformación si tenemos presupuesto limitado?',
    answer:
      'Entendemos la realidad del sector. Por eso, diseñamos tu proyecto tecnológico con la robustez necesaria para incluirlo en postulaciones a fondos de alto impacto (BID, GORE, fundaciones internacionales). El objetivo es que el sistema se financie con el fondo adjudicado, no con tus recursos operativos actuales.',
  },
  {
    id: '02',
    question:
      '¿En qué etapa debe estar nuestra organización para trabajar juntos?',
    answer:
      'Nuestro enfoque es ideal para equipos de 15 a 50 personas que ya tienen tracción y datos, pero que están limitados por procesos manuales o el uso extremo de planillas (como Google Sheets). Si tienen el propósito claro pero les falta el equipo para escalar ordenadamente, somos el aliado correcto.',
  },
  {
    id: '03',
    question: '¿Qué los diferencia de una agencia de software tradicional?',
    answer:
      'Una agencia tradicional entrega código y se va. Nosotros sabemos que la tecnología no sirve de nada si tu equipo no la adopta. Nos enfocamos en la estrategia operativa, el entrenamiento y en asegurar que el sistema realmente mueva tus indicadores sociales (tu ROI Social).',
  },
  {
    id: '04',
    question: '¿Es necesario que nuestro equipo sepa de tecnología?',
    answer:
      'En absoluto. Nosotros operamos como tu equipo tecnológico experto. Traducimos tus necesidades operativas en soluciones automatizadas y fáciles de usar. Tu equipo solo debe preocuparse por su misión principal: generar impacto en el territorio.',
  },
  {
    id: '05',
    question: '¿Qué pasa exactamente en el diagnóstico de 30 minutos?',
    answer:
      'Es una sesión estratégica, no una venta de software. Analizaremos tu cuello de botella actual, revisaremos si tu organización está lista para dar el salto, y te entregaremos un mapa claro de los siguientes pasos operativos, decidamos trabajar juntos o no.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('01');

  return (
    <section
      id="faq"
      className="pb-32 md:pb-40 max-w-3xl mx-auto scroll-mt-24 px-4"
    >
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.1]">
          Claridad antes de <span className="text-white/55">avanzar.</span>
        </h2>
        <p className="text-base md:text-lg text-white/65 font-light">
          Resolvemos las dudas más comunes de los equipos directivos y
          fundadores con los que trabajamos.
        </p>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq) => {
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
          ¿Tienes otra pregunta? Háblanos en el diagnóstico
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
