'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function WhatsAppWidget() {
  const t = useTranslations('WhatsApp');
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');

  // 1. Lógica para la hora en tiempo real
  useEffect(() => {
    const now = new Date();
    const formattedTime = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
    setTime(formattedTime);

    // 2. Apertura automática a los 4 segundos
    const timer = setTimeout(() => setIsOpen(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/56972183201`; // Tu número real

  return (
    <div className={cn("fixed bottom-6 right-6 z-[100] flex flex-col items-end", roboto.className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[320px] overflow-hidden rounded-[20px] shadow-2xl border border-black/5"
          >
            {/* Cabecera Realista (Color WhatsApp) */}
            <div className="bg-[#075e54] p-4 text-white flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image 
                  src="/whatsapp-avatar.png" // Ruta corregida hacia public/
                  alt="Pipe Avatar"
                  fill
                  className="rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#075e54] bg-[#25D366]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-medium leading-tight">Pipe</span>
                <span className="text-[12px] opacity-90">{t('status')}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="ml-auto opacity-70 hover:opacity-100 transition-opacity">
                <X size={20} />
              </button>
            </div>

            {/* Cuerpo del Chat */}
            <div className="relative h-48 bg-[#e5ddd5] dark:bg-[#0b141a] p-4">
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]" />
              
              <div className="relative z-10 flex">
                <div className="bg-white dark:bg-[#202c33] p-3 rounded-2xl rounded-tl-none text-[14.5px] leading-snug text-zinc-900 dark:text-zinc-100 shadow-sm max-w-[95%] relative">
                  {/* Cola de la burbuja */}
                  <div className="absolute top-0 -left-2 w-0 h-0 border-t-[12px] border-t-white dark:border-t-[#202c33] border-l-[12px] border-l-transparent" />
                  
                  {t('message')}
                  
                  {/* HORA DINÁMICA */}
                  <span className="mt-1 block text-right text-[11px] opacity-50 font-medium lowercase">
                    {time}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer / Botón */}
            <div className="p-3 bg-white dark:bg-[#111b21]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-[15px] font-bold text-white transition-all hover:bg-[#20ba59] shadow-md active:scale-95"
              >
                <Send size={16} fill="white" />
                {t('button')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300",
          isOpen ? "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-white" : "bg-[#25D366] text-white hover:scale-110 active:scale-90"
        )}
      >
        {isOpen ? <X size={28} /> : (
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        )}
      </button>
    </div>
  );
}