'use client';
import { useTranslations } from 'next-intl';
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, BarChart3, Zap, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesBento() {
  const t = useTranslations('Services');

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div id="services-section" className="scroll-mt-24">
      {/* TÍTULO NORMALIZADO */}
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4 uppercase"
        >
          {t('title')}
        </motion.h2>
        <div className="h-1 w-12 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 max-w-7xl mx-auto px-6"
      >
        <motion.div variants={item} className="md:col-span-2 md:row-span-2">
          <Card className="h-full relative overflow-hidden bg-card border-border flex flex-col justify-end p-8 hover:border-blue-500 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent" />
            <div className="relative z-10">
              <Bot className="w-12 h-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
              <CardTitle className="text-3xl font-bold mb-3">{t('automation.title')}</CardTitle>
              <CardDescription className="text-muted-foreground text-lg leading-relaxed">
                {t('automation.desc')}
              </CardDescription>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item} className="md:col-span-2">
          <Card className="h-full relative overflow-hidden bg-card border-border p-8 hover:border-indigo-500 transition-all group">
            <div className="flex items-start justify-between relative z-10">
              <div className="max-w-[80%]">
                <CardTitle className="text-xl mb-2">{t('analysis.title')}</CardTitle>
                <CardDescription className="text-muted-foreground">{t('analysis.desc')}</CardDescription>
              </div>
              <BarChart3 className="w-10 h-10 text-indigo-600" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full relative overflow-hidden bg-card border-border p-6 hover:border-yellow-500 transition-all">
            <Zap className="w-7 h-7 text-yellow-600 mb-4" />
            <CardTitle className="text-lg mb-1">{t('optimization.title')}</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">{t('optimization.desc')}</CardDescription>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full relative overflow-hidden bg-card border-border p-6 hover:border-purple-500 transition-all">
            <Cpu className="w-7 h-7 text-purple-600 mb-4" />
            <CardTitle className="text-lg mb-1">{t('consulting.title')}</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">{t('consulting.desc')}</CardDescription>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}