'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Clients() {
  const t = useTranslations('Clients');
  // Sustituir con tus rutas reales en public/logos/
  const logos = ["/logo1.svg", "/logo2.svg", "/logo3.svg", "/logo4.svg"]; 

  return (
    <section className="py-20 relative z-30">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-zinc-500 text-xs uppercase tracking-[0.3em] mb-12">{t('title')}</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
          {logos.map((logo, i) => (
            <div key={i} className="h-8 w-32 relative">
               {/* Placeholder si no tienes los archivos aún */}
               <div className="bg-zinc-800 h-full w-full rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}