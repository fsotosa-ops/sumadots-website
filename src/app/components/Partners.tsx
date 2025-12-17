'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Importamos Link para la navegación

export default function Partners() {
  const t = useTranslations('Partners');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Agregamos el campo 'href' con los links correspondientes
  const partners = [
    { 
      name: 'Azai Consultores', 
      logo: '/assets/partners/azai-consultores-2.svg',
      className: 'dark:invert',
      href: 'https://www.azai.co' // Sustituir por el link real
    },
    { 
      name: 'Growth Buddies', 
      logo: '/assets/partners/growth-buddies.svg',
      className: '',
      href: 'https://www.growthbuddies.cl/' // Sustituir por el link real
    },
    { 
      name: 'M-Block', 
      logo: '/assets/partners/m-block-green.png',
      className: '',
      href: 'https://mage.ai' // Sustituir por el link real
    },
    { 
      name: 'Red de Impacto', 
      logoLight: '/assets/partners/redimpacto-cuadrado.png',
      logoDark: '/assets/partners/redimpacto-cuadrado-blanco.png',
      className: '',
      isDynamic: true,
      href: 'https://redimpacto.org' // Sustituir por el link real
    },
  ];

  return (
    <section className="relative py-24 bg-background transition-colors duration-500">
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
          <div className="h-1 w-12 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
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
                {/* 2. Envolvemos el contenido en un Link */}
                <Link 
                  href={partner.href} 
                  target="_blank" // Abre en pestaña nueva
                  rel="noopener noreferrer" // Seguridad para links externos
                  className="relative w-full h-full transition-all duration-500 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
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