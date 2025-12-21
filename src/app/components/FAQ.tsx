'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const t = useTranslations('FAQ');
  // Controlamos qué pregunta está abierta (solo una a la vez)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions = ['q1', 'q2', 'q3', 'q4','q5'];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Cabecera de la sección */}
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
        <div className="space-y-4">
          {questions.map((qKey, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={qKey}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-zinc-900/40 border-blue-500/30 shadow-lg shadow-blue-900/10' 
                    : 'bg-zinc-900/20 border-white/5 hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left cursor-pointer"
                >
                  <span className={`text-base md:text-lg font-medium pr-8 transition-colors ${
                    isOpen ? 'text-blue-400' : 'text-foreground'
                  }`}>
                    {t(`${qKey}.question`)}
                  </span>
                  <span className={`shrink-0 p-1 rounded-full transition-colors duration-300 ${
                    isOpen ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-400'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed text-sm md:text-base border-t border-transparent">
                        {t(`${qKey}.answer`)}
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