'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import FounderCard from './FounderCard';

export default function ReadyToGrow() {
  const t = useTranslations('ReadyToGrow');
  const calendarLink = "https://calendar.app.google/rDk7iZ65kzBoKoS86";

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* LADO IZQUIERDO: Texto y Botón */}
          <div className="flex flex-col justify-center text-center lg:text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-xl mx-auto lg:mx-0"
            >
              {/* CAMBIO AQUÍ: Aumentado a text-6xl (móvil) y text-8xl (escritorio) */}
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-foreground">
                {t('title')}<br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  {t('titleAccent')}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mt-6 font-light leading-relaxed">
                {t('description')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }}
            >
              <Button 
                onClick={() => window.open(calendarLink, '_blank')}
                className="h-14 px-8 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white hover:opacity-90 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-none cursor-pointer"
              >
                <Calendar className="mr-2 w-5 h-5" />
                {t('ctaButton')}
              </Button>
            </motion.div>
          </div>

          {/* LADO DERECHO: Carrusel */}
          <div className="flex justify-center lg:justify-start w-full">
            <FounderCard />
          </div>

        </div>
      </div>
    </section>
  );
}