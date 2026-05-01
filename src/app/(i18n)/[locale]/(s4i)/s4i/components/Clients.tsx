import { useTranslations } from 'next-intl';
import TestimonialCarousel from './TestimonialCarousel';

type Logo = { name: string; src: string };
type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  verified: string;
};

export default function Clients() {
  const t = useTranslations('S4i.Clients');
  const logos = t.raw('logos') as Logo[];
  const testimonials = t.raw('testimonials') as Testimonial[];

  return (
    <section
      id="clientes"
      className="pb-32 pt-20 max-w-5xl mx-auto scroll-mt-24 px-6"
    >
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <div className="eyebrow mb-5">
          <span>{t('eyebrow')}</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.1]">
          {t('titleSoft')}{' '}
          <span className="text-white/55">{t('titleStrong')}</span>
        </h3>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 mb-24 opacity-60 hover:opacity-100 transition-opacity duration-500">
        {logos.map((c) => (
          <img
            key={c.name}
            src={c.src}
            alt={c.name}
            className="h-8 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
          />
        ))}
      </div>

      <TestimonialCarousel items={testimonials} />
    </section>
  );
}
