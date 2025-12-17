'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname, routing } from '@/i18n/routing';
import { useTransition, useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react"; // Asegúrate de tener lucide-react instalado

const Flags = {
  'es-CL': () => (
    <svg viewBox="0 0 1500 1000" className="w-4 h-3 rounded-sm shadow-sm">
      <rect width="1500" height="1000" fill="#fff"/>
      <rect width="1500" height="500" y="500" fill="#d52b1e"/>
      <rect width="500" height="500" fill="#0039a6"/>
      <path fill="#fff" d="M250 101l34 105h110l-89 65 34 105-89-64-89 64 34-105-89-65h110z"/>
    </svg>
  ),
  'en-US': () => (
    <svg viewBox="0 0 7410 3900" className="w-4 h-3 rounded-sm shadow-sm">
      <rect width="7410" height="3900" fill="#b22234"/>
      <path d="M0 300h7410M0 900h7410M0 1500h7410M0 2100h7410M0 2700h7410M0 3300h7410" stroke="#fff" strokeWidth="300"/>
      <rect width="2964" height="2100" fill="#3c3b6e"/>
      <circle cx="1482" cy="1050" r="600" fill="#fff" opacity="0.2" />
    </svg>
  ),
  'pt-BR': () => (
    <svg viewBox="0 0 720 504" className="w-4 h-3 rounded-sm shadow-sm">
      <rect width="720" height="504" fill="#009739"/>
      <path fill="#fedd00" d="M360 41L41 252l319 211 319-211z"/>
      <circle cx="360" cy="252" r="113" fill="#012169"/>
    </svg>
  )
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera
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
      {/* Botón Principal (Idioma Actual) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-[11px] font-bold tracking-tight border",
          "bg-white/5 border-white/10 hover:bg-white/10 text-foreground backdrop-blur-sm",
          isOpen && "border-blue-500/50 bg-white/10"
        )}
      >
        <CurrentFlag />
        <span>{locale.split('-')[0].toUpperCase()}</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      {/* Lista Desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 py-1.5 rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {routing.locales.map((l) => {
            const Flag = Flags[l as keyof typeof Flags];
            const isSelected = locale === l;

            return (
              <button
                key={l}
                disabled={isPending}
                onClick={() => {
                  setIsOpen(false);
                  startTransition(() => router.replace(pathname, { locale: l as any }));
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 text-[10px] font-bold tracking-wider transition-colors",
                  isSelected 
                    ? "bg-blue-600/20 text-blue-400" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Flag />
                <span>{l.split('-')[0].toUpperCase()}</span>
                {isSelected && <div className="ml-auto w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}