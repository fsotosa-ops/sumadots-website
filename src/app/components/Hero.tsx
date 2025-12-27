'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react"; 
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('Hero');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-background text-foreground transition-colors duration-500 pt-32 md:pt-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-blue-600/10 dark:bg-blue-600/15 rounded-[100%] blur-[120px] pointer-events-none z-0" />
      
      {/* MARCA DE AGUA */}
      <div className="absolute top-1/4 -right-20 opacity-[0.02] dark:opacity-[0.04] pointer-events-none z-0 rotate-12">
        <Image src="/suma-icon.svg" alt="" width={600} height={600} className="dark:invert" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[10px] uppercase tracking-[0.25em] font-bold border border-border bg-muted/50 rounded-full text-blue-500 dark:text-blue-400 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {t('badge')}
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95] text-foreground">
          {t('title')} <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent px-2">
            {t('titleAccent')}
          </span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-30">
          <Button 
            size="lg" 
            className="h-16 px-10 rounded-full text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:opacity-90 transition-all shadow-xl group text-white border-none cursor-pointer"
            onClick={() => scrollTo('contact')}
          >
            {t('ctaPrimary')}
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="h-16 px-10 rounded-full text-xl font-bold border-border bg-background/50 hover:bg-muted backdrop-blur-xl transition-all cursor-pointer"
            onClick={() => scrollTo('services-section')}
          >
            {t('ctaSecondary')}
          </Button>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/50 to-transparent z-20 pointer-events-none" />
    </section>
  );
}