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
      url: 'https://www.linkedin.com/company/factor-social-chile/?originalSubdomain=cl',
      scale: 'scale-[0.65]',
      translate: 'translate-y-0' // Ya está bien centrado
    },
    {
      name: 'WebCarga',
      logoLight: '/assets/clients/webcarga-lightmode.svg',
      logoDark: '/assets/clients/webcarga-darkmode.svg',
      url: 'https://app.webcarga.com/',
      isDynamic: true,
      scaleDark: 'scale-[1.1]', 
      scaleLight: 'scale-[1.1]',
      // AJUSTE: Bajamos WebCarga 4px para compensar su altura óptica
      translate: 'translate-y-[4px]' 
    },
    {
      name: 'Fundación Summer',
      logoLight: '/assets/clients/fsummer-lightmode.svg', 
      logoDark: '/assets/clients/fsummer-darkmode.svg',
      url: 'https://fsummer.org/',
      isDynamic: true,
      scaleDark: 'scale-[1.5]', 
      scaleLight: 'scale-[1.5]',
      translate: 'translate-y-0'
    }
  ];

  return (
    <section className="relative py-24 bg-background transition-colors duration-500 overflow-hidden" id="clients">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4"
          >
            {t('title')}
          </motion.h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 md:gap-24 items-center justify-items-center">
          {clients.map((client, index) => {
            let currentLogo = client.logo;
            let currentScale = client.scale || 'scale-100';

            if (client.isDynamic && mounted) {
              const isDark = resolvedTheme === 'dark';
              currentLogo = isDark ? client.logoDark : client.logoLight;
              currentScale = isDark ? (client.scaleDark || 'scale-100') : (client.scaleLight || 'scale-100');
            }

            return (
              <motion.a 
                key={index}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex items-center justify-center h-24 w-full cursor-pointer"
              >
                {/* Aplicamos el scale y el translate aquí */}
                <div className={`relative w-full h-full transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.3)] ${currentScale} ${client.translate}`}>
                  {currentLogo && (
                    <Image
                      src={currentLogo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}