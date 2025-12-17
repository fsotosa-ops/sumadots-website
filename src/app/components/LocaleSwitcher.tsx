'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname, routing } from '@/i18n/routing';
import { useTransition, useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
// Librería oficial para banderas precisas
import { CL, US, BR } from 'country-flag-icons/react/3x2';

const Flags = {
  'es-CL': CL,
  'en-US': US,
  'pt-BR': BR
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const CurrentFlag = Flags[locale as keyof typeof Flags];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón Circular Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={cn(
          "relative w-9 h-9 rounded-full overflow-hidden border-2 transition-all duration-300 flex items-center justify-center shadow-lg",
          isOpen 
            ? "border-blue-600 ring-4 ring-blue-500/20 scale-105" 
            : "border-border hover:border-blue-400 hover:scale-110"
        )}
      >
        {/* SOLUCIÓN AL CLIPPING: preserveAspectRatio="xMidYMid slice" */}
        <CurrentFlag 
          preserveAspectRatio="xMidYMid slice" 
          className="w-full h-full min-w-full min-h-full object-cover"
        />
      </button>

      {/* Menú vertical minimalista */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute right-0 mt-3 w-14 p-2 rounded-[24px] border border-border bg-background/95 backdrop-blur-xl shadow-2xl z-50 flex flex-col gap-3 items-center"
          >
            {routing.locales.map((l) => {
              const Flag = Flags[l as keyof typeof Flags];
              if (locale === l) return null; // Ocultar el idioma ya seleccionado

              return (
                <button
                  key={l}
                  disabled={isPending}
                  onClick={() => {
                    setIsOpen(false);
                    startTransition(() => router.replace(pathname, { locale: l as any }));
                  }}
                  className="relative w-9 h-9 rounded-full overflow-hidden border border-transparent hover:border-blue-500 hover:scale-110 transition-all flex items-center justify-center shadow-sm"
                >
                  <Flag 
                    preserveAspectRatio="xMidYMid slice" 
                    className="w-full h-full min-w-full min-h-full object-cover"
                  />
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}