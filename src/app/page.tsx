'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function FounderCard() {
  const t = useTranslations('Founder');
  const [currentIndex, setCurrentIndex] = useState(0);

  const PROFILES = [
    {
      id: 'p1',
      image: '/founder-sumadots.png', // <--- RUTA ACTUALIZADA
      color: 'text-purple-400',
      bgGlow: 'from-purple-600/20 to-blue-600/20'
    },
    {
      id: 'p2',
      image: '/founder-sumadots.png', // <--- Usa la misma o cambia cuando tengas la del socio
      color: 'text-indigo-400',
      bgGlow: 'from-indigo-600/20 to-teal-600/20'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROFILES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentProfile = PROFILES[currentIndex];

  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0 min-h-[240px]">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="relative group w-full"
        >
          {/* Fondo sutil dinámico (Glow) */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${currentProfile.bgGlow} rounded-[2rem] blur-xl opacity-50 transition duration-1000`} />
          
          <div className="relative flex flex-col gap-5 p-6 rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm shadow-xl">
            
            <div className="flex items-center gap-4">
              {/* Avatar con borde sutil */}
              <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-sm bg-black">
                <Image 
                  src={currentProfile.image} 
                  alt={t(`${currentProfile.id}.name`)} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 56px"
                />
              </div>
              
              <div>
                <h4 className="text-base font-semibold text-white tracking-tight">
                  {t(`${currentProfile.id}.name`)}
                </h4>
                <p className={`text-[10px] font-medium tracking-[0.15em] uppercase opacity-90 ${currentProfile.color}`}>
                  {t(`${currentProfile.id}.role`)}
                </p>
              </div>
            </div>

            <div className="space-y-3 min-h-[80px]">
              <p className="text-sm text-zinc-300 font-light leading-relaxed italic opacity-90">
                "{t(`${currentProfile.id}.quote`)}"
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed border-l-2 border-white/10 pl-3">
                {t(`${currentProfile.id}.signature`)}
              </p>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-medium">
                  {t('status')}
                </span>
              </div>
              
              <div className="flex gap-1.5">
                {PROFILES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 ' + currentProfile.color.replace('text', 'bg') : 'w-1 bg-zinc-700'}`}
                    aria-label={`Ver perfil ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}