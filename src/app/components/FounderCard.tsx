'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Quote, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FoundersCarousel() {
  const t = useTranslations('Founders');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const cardWidth = current.offsetWidth;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const founders = [
    {
      id: 1,
      image: '/sumadots-founder.png', 
      key: 'founder1',
      linkedin: 'https://www.linkedin.com/in/fssantibanez/', // ⚠️ REEMPLAZAR con la URL real de Pipe
    },
    {
      id: 2,
      image: '/strategist-associate-sumadots.png',
      key: 'founder2',
      linkedin: 'https://www.linkedin.com/in/edmundo-spohr/', // ⚠️ REEMPLAZAR con la URL real de Ed
    }
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto">
      
      {/* Aura decorativa de fondo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-purple-600/30 rounded-[2.5rem] blur-2xl opacity-60 animate-pulse" />

      {/* Contenedor Principal */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900/90 backdrop-blur-3xl border border-white/10 shadow-2xl">
        
        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {founders.map((founder) => (
            <div key={founder.id} className="min-w-full p-8 md:p-10 flex flex-col gap-8 snap-center transition-opacity duration-300">
              
              {/* Header: Foto y Nombre */}
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden rounded-2xl border-2 border-white/10 shadow-lg group">
                  <Image 
                    src={founder.image} 
                    alt="Founder" 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">
                    {t(`${founder.key}.name`)}
                  </h4>
                  <p className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase mt-1.5">
                    {t(`${founder.key}.role`)}
                  </p>
                </div>
              </div>

              {/* Cita */}
              <div className="relative bg-white/5 p-6 rounded-3xl border border-white/5">
                <Quote className="absolute top-4 right-4 w-5 h-5 text-white/20" />
                <p className="text-lg text-zinc-300 font-light leading-relaxed italic pr-4">
                  "{t(`${founder.key}.quote`)}"
                </p>
              </div>

              {/* Footer: Botón LinkedIn y Navegación */}
              <div className="flex items-center justify-between mt-2 pt-2">
                
                {/* Botón LinkedIn con estilo de marca y traducción dinámica */}
                <a 
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white font-bold text-[11px] uppercase tracking-wider shadow-lg shadow-indigo-500/20 hover:opacity-90 hover:scale-105 transition-all duration-300 group/btn"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                  <span>{t('connect')}</span>
                </a>

                {/* Controles de navegación */}
                <div className="flex gap-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => scroll('left')}
                    className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => scroll('right')}
                    className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}