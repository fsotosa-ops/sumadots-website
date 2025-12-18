'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Calendar, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CTA() {
  const t = useTranslations('CTA');
  const calendarLink = "https://calendar.app.google/rDk7iZ65kzBoKoS86";

  const inputClasses = cn(
    "w-full rounded-xl px-4 py-4 text-sm outline-none transition-all duration-300",
    "bg-black/40 border border-white/10 text-foreground placeholder:text-muted-foreground/50",
    "focus:border-indigo-500 focus:ring-2 focus:ring-purple-500/10",
    "focus:scale-[1.01] focus:bg-black/60"
  );

  return (
    <section className="py-24 relative bg-background overflow-hidden" id="contact">
      {/* Glow de fondo para profundidad */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Lado Izquierdo: Sin cursivas y con gradiente correcto */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-foreground leading-[0.9]">
            {t('title')} <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent px-1">
              {t('titleAccent')}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-medium">
            {t('description')}
          </p>
          
          <Button 
            size="lg" 
            className="h-16 px-8 rounded-2xl text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:opacity-90 text-white transition-all shadow-2xl shadow-indigo-500/20 mb-10 group"
            onClick={() => window.open(calendarLink, '_blank')}
          >
            <Calendar className="mr-3 w-6 h-6 transition-transform group-hover:scale-110" />
            {t('button')}
          </Button>

          {/* Eliminada la cursiva del social proof */}
          <p className="text-sm text-muted-foreground font-medium pl-4 border-l-2 border-indigo-500/30">
            {t('socialProof')}
          </p>
        </motion.div>

        {/* Lado Derecho: Formulario de Contacto */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-[32px] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-40"></div>

          <h3 className="text-2xl font-bold mb-8 text-foreground tracking-tight">{t('formTitle')}</h3>
          <form className="space-y-6 relative z-10">
            <input required className={inputClasses} placeholder={t('formName')} />
            <input required type="email" className={inputClasses} placeholder={t('formEmail')} />
            <textarea required className={cn(inputClasses, "h-32 resize-none")} placeholder={t('formHelp')} />
            
            <Button className="w-full h-14 rounded-xl font-bold flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:opacity-90 transition-all shadow-lg shadow-indigo-500/20 group">
              {t('formSubmit')} 
              <Send size={18} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-center text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-4 font-bold">
              {t('formFooter')}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}