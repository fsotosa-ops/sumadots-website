'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function FAQ() {
  const t = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = ['q1', 'q2', 'q3', 'q4', 'q5'];

  const formatAnswer = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          // CORRECCIÓN: Usamos colores explícitos para Light/Dark
          // Light: Indigo oscuro | Dark: Indigo brillante (Cyan/Morado)
          <span key={index} className="font-bold text-indigo-600 dark:text-indigo-400">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden transition-colors duration-500">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Cabecera */}
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

        {/* Lista de Preguntas */}
        <div className="space-y-5">
          {questions.map((qKey, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={qKey}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                // ESTRATEGIA DEFINITIVA: Usar variables CSS del ContactForm
                // Eliminamos bg-white/bg-zinc de las clases para que mande la variable
                style={{ 
                  backgroundColor: 'var(--cta-card-bg)', 
                  borderColor: isOpen ? 'rgba(99, 102, 241, 0.5)' : 'var(--cta-card-border)', // Borde Indigo si abierto
                  boxShadow: isOpen ? 'var(--cta-shadow)' : 'none'
                }}
                className={cn(
                  "group relative rounded-[2.5rem] border overflow-hidden transition-all duration-500",
                  "backdrop-blur-3xl", // Efecto cristal
                  !isOpen && "hover:border-black/10 dark:hover:border-white/10"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 md:p-8 text-left cursor-pointer select-none outline-none"
                >
                  <span className={cn(
                    "text-lg md:text-xl font-medium pr-8 transition-all duration-300",
                    isOpen 
                      // Titulo con Gradiente cuando está abierto
                      ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent font-bold" 
                      : "text-foreground group-hover:opacity-80"
                  )}>
                    {t(`${qKey}.question`)}
                  </span>
                  
                  <span className={cn(
                    "shrink-0 p-2 rounded-full transition-all duration-500 border flex items-center justify-center",
                    isOpen 
                      // Botón con Gradiente
                      ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 border-transparent text-white rotate-180 shadow-md" 
                      : "border-black/10 text-muted-foreground group-hover:border-black/20 group-hover:text-foreground dark:border-white/10 dark:group-hover:border-white/20"
                  )}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      {/* Texto de respuesta: text-muted-foreground se adapta solo al tema */}
                      <div className="px-6 md:px-8 pb-8 pt-0 text-base md:text-lg leading-relaxed border-t border-transparent text-muted-foreground">
                        {formatAnswer(t(`${qKey}.answer`))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}