'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#050505]">
      {/* 1. EFECTO GLOW AZUL EXPANDIDO (ZONA CTAs) */}
      {/* Resplandor principal: Más grande y posicionado para cubrir los CTAs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-blue-600/15 rounded-[100%] blur-[120px] pointer-events-none z-0" />
      
      {/* Resplandor secundario de profundidad */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl"
      >
        {/* Badge superior */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[10px] uppercase tracking-[0.25em] font-bold border border-white/10 bg-white/5 rounded-full text-blue-400 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {t('badge')}
        </motion.div>
        
        {/* Título Principal - Ajuste de clipping en la "e" */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95] text-white">
          {t('title')} <br />
          {/* Añadimos px-4 para evitar que se corte la última letra del gradiente */}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent px-2">
            {t('titleAccent')}
          </span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
          {t('description')}
        </p>

        {/* CTAs TAMAÑO PREMIUM Y RESALTADOS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-30">
          <Button 
            size="lg" 
            className="h-16 px-10 rounded-full text-xl font-bold bg-white text-black hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)] group"
          >
            {t('ctaPrimary')}
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="h-16 px-10 rounded-full text-xl font-bold border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-xl transition-all text-white"
          >
            {t('ctaSecondary')}
          </Button>
        </div>
      </motion.div>

      {/* 2. GRADIENTE DE TRANSICIÓN (FADE OUT) */}
      {/* Se asegura de que el azul no se corte brusco al bajar a la siguiente sección */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent z-20 pointer-events-none" />
    </section>
  );
}