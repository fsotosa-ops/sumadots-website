'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname, routing } from '@/i18n/routing';
import { useTransition } from 'react';
import { cn } from "@/lib/utils";

const Flags = {
  'es-CL': () => (
    <svg viewBox="0 0 1500 1000" className="w-5 h-3.5 rounded-sm">
      <rect width="1500" height="1000" fill="#fff"/>
      <rect width="1500" height="500" y="500" fill="#d52b1e"/>
      <rect width="500" height="500" fill="#0039a6"/>
      <path fill="#fff" d="M250 101l34 105h110l-89 65 34 105-89-64-89 64 34-105-89-65h110z"/>
    </svg>
  ),
  'en-US': () => (
    <svg viewBox="0 0 7410 3900" className="w-5 h-3.5 rounded-sm">
      <rect width="7410" height="3900" fill="#b22234"/>
      <path d="M0 300h7410M0 900h7410M0 1500h7410M0 2100h7410M0 2700h7410M0 3300h7410" stroke="#fff" strokeWidth="300"/>
      <rect width="2964" height="2100" fill="#3c3b6e"/>
      {/* (Simplificado para el ejemplo) */}
      <circle cx="1482" cy="1050" r="600" fill="#fff" opacity="0.2" />
    </svg>
  ),
  'pt-BR': () => (
    <svg viewBox="0 0 720 504" className="w-5 h-3.5 rounded-sm">
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

  return (
    <div className="flex gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
      {routing.locales.map((l) => {
        const Flag = Flags[l as keyof typeof Flags];
        return (
          <button
            key={l}
            disabled={isPending}
            onClick={() => startTransition(() => router.replace(pathname, { locale: l as any }))}
            className={cn(
              "flex items-center gap-2 px-2.5 py-1.5 rounded-full transition-all text-[10px] font-bold tracking-tighter",
              locale === l 
                ? "bg-white text-black" 
                : "text-zinc-500 hover:text-white"
            )}
          >
            <Flag />
            <span>{l.split('-')[0].toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}