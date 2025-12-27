'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Partners() {
  const t = useTranslations('Partners');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const partners = [
    { 
      name: 'Azai Consultores', 
      logo: '/assets/partners/azai-consultores-2.svg',
      className: 'dark:invert',
      href: 'https://www.azai.co'
    },
    { 
      name: 'Growth Buddies', 
      logo: '/assets/partners/growth-buddies.svg',
      className: '',
      href: 'https://www.growthbuddies.cl/'
    },
    { 
      name: 'M-Block', 
      logo: '/assets/partners/m-block-green.png',
      className: '',
      href: 'https://mage.ai'
    },
    { 
      name: 'Red de Impacto', 
      logoLight: '/assets/partners/redimpacto-cuadrado.png',
      logoDark: '/assets/partners/redimpacto-cuadrado-blanco.png',
      className: '',
      isDynamic: true,
      href: 'https://redimpacto.org'
    },
  ];

  return (
    <section className="relative py-24 bg-background transition-colors duration-500">
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
          <div className="h-1.5 w-16 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24 items-center">
          {partners.map((partner, index) => {
            let currentLogo = partner.logo;
            
            if (partner.isDynamic && mounted) {
              currentLogo = resolvedTheme === 'dark' ? partner.logoDark : partner.logoLight;
            }

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex items-center justify-center h-24 w-full"
              >
                {/* El cambio ocurre SOLO en hover/interacción:
                  - Por defecto: escala de grises y 50% opacidad.
                  - Al interactuar (group-hover): se quita el gris, sube a 100% opacidad, crece un 10% y añade brillo azul.
                */}
                <Link 
                  href={partner.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative w-full h-full transition-all duration-500 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                >
                  {currentLogo && (
                    <Image
                      src={currentLogo}
                      alt={partner.name}
                      fill
                      className={`object-contain ${partner.className}`}
                      priority={index < 4}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}