import TestimonialCarousel from './TestimonialCarousel';

const CLIENT_LOGOS = [
  { name: 'Focus', src: '/s4i/clients/focus-logo-white.png' },
  { name: 'Fundación Summer', src: '/s4i/clients/fsummer-logo-white.png' },
  {
    name: 'América Solidaria',
    src: '/s4i/clients/logo-white-anericasolidaria.svg',
  },
];

const TESTIMONIALS = [
  {
    id: '01',
    quote:
      'S4i ha sido clave en la transformación de nuestros procesos internos, generando aprendizaje para nuestra organización y nuestros stakeholders. Su enfoque permite profesionalizar nuestro trabajo.',
    name: 'Karen Sarabia',
    role: 'Coordinadora de Transformación · América Solidaria',
    verified: 'NODE_VERIFIED // AS_CHILE',
  },
  {
    id: '02',
    quote:
      'La ingeniería de Sumadots for Impact nos ha permitido llevar nuestra gestión de datos a un nivel de rigor corporativo. Es el aliado técnico que las fundaciones necesitan para escalar su propósito.',
    name: 'Emanuel Pacheco',
    role: 'Director Ejecutivo · Fundación Summer',
    verified: 'NODE_VERIFIED // F_SUMMER',
  },
];

export default function Clients() {
  return (
    <section
      id="clientes"
      className="pb-32 pt-20 max-w-5xl mx-auto scroll-mt-24 px-6"
    >
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <div className="eyebrow mb-5">
          <span>Trusted By</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.1]">
          Organizaciones que{' '}
          <span className="text-white/55">ya escalaron.</span>
        </h3>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 mb-24 opacity-60 hover:opacity-100 transition-opacity duration-500">
        {CLIENT_LOGOS.map((c) => (
          <img
            key={c.name}
            src={c.src}
            alt={c.name}
            className="h-8 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
          />
        ))}
      </div>

      <TestimonialCarousel items={TESTIMONIALS} />
    </section>
  );
}
