'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Clients() {
  const t = useTranslations('Clients');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const clients = [
    {
      name: 'Factor Social',
      logo: '/assets/clients/factor-social.svg',
      className: 'dark:invert',
      scale: 'scale-[0.8]' 
    },
    {
      name: 'WebCarga',
      logoLight: '/assets/clients/webcarga-lightmode.png',
      logoDark: '/assets/clients/webcarga.png',
      isDynamic: true,
      className: '',
      scaleDark: 'scale-[2.0]', 
      scaleLight: 'scale-[0.65]' 
    },
    {
      name: 'Fundación Summer',
      logoLight: '/assets/clients/fsummer-lightmode.png', 
      logoDark: '/assets/clients/fsummer-darkmode.png',
      isDynamic: true,
      className: '',
      scaleDark: 'scale-[0.45]', 
      scaleLight: 'scale-[2.5] translate-y-3'  
    }
  ];

  return (
    <section className="relative py-20 bg-background transition-colors duration-500 overflow-hidden" id="clients">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4"
          >
            {t('title')}
          </motion.h2>
          {/* LÍNEA CON GRADIENTE ACTUALIZADA */}
          <div className="h-1.5 w-16 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-24 items-center justify-items-center">
          {clients.map((client, index) => {
            let currentLogo = client.logo;
            let currentScale = client.scale || 'scale-100';

            if (client.isDynamic && mounted) {
              const isDark = resolvedTheme === 'dark';
              currentLogo = isDark ? client.logoDark : client.logoLight;
              currentScale = isDark ? (client.scaleDark || 'scale-100') : (client.scaleLight || 'scale-100');
            }

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex items-center justify-center h-24 w-full cursor-pointer"
              >
                <div className={`relative w-full h-full transition-all duration-500 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] ${currentScale}`}>
                  {currentLogo && (
                    <Image
                      src={currentLogo}
                      alt={client.name}
                      fill
                      className={`object-contain ${client.className || ''}`}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}