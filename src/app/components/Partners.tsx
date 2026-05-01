'use client';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Logo = {
  name: string;
  href: string;
  src: string;
  srcDark?: string;
  keepInDark?: boolean;
};

const LOGOS: Logo[] = [
  {
    name: 'Azai Consultores',
    href: 'https://www.azai.co',
    src: '/assets/partners/azai-consultores-2.svg',
  },
  {
    name: 'Growth Buddies',
    href: 'https://www.growthbuddies.cl/',
    src: '/assets/partners/growth-buddies.svg',
  },
  {
    name: 'M-Block',
    href: 'https://mage.ai',
    src: '/assets/partners/m-block-green.png',
    keepInDark: true,
  },
  {
    name: 'Red de Impacto',
    href: 'https://redimpacto.org',
    src: '/assets/partners/redimpacto-cuadrado.png',
    srcDark: '/assets/partners/redimpacto-horizontal-blanco.png',
  },
];

export default function Partners() {
  const t = useTranslations('Partners');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="partners"
      className="relative scroll-mt-24 py-24 md:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex mb-5">
            <div className="eyebrow">
              <span className="dot" />
              <span>{t('eyebrow')}</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">
            <span className="text-foreground">{t('titleSoft')}</span>{' '}
            <span className="text-foreground/55">{t('titleStrong')}</span>
          </h2>
          <p className="text-base md:text-lg text-foreground/65 font-light leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-12 md:gap-x-20 gap-y-8">
          {LOGOS.map((logo) => {
            const isDark = mounted && resolvedTheme === 'dark';
            const currentSrc = isDark && logo.srcDark ? logo.srcDark : logo.src;
            const applySilhouetteInDark = !logo.srcDark && !logo.keepInDark;

            return (
              <Link
                key={logo.name}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity duration-500"
                aria-label={logo.name}
              >
                <img
                  src={currentSrc}
                  alt={logo.name}
                  className={`h-14 md:h-16 w-auto max-w-[200px] object-contain ${
                    applySilhouetteInDark
                      ? 'dark:[filter:brightness(0)_invert(1)]'
                      : ''
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
