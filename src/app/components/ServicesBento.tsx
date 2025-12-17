'use client';
import { useTranslations } from 'next-intl';
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, BarChart3, Zap, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesBento() {
  const t = useTranslations('Services');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 max-w-7xl mx-auto px-6"
    >
      {/* Agentes Autónomos - Grande */}
      <motion.div variants={item} className="md:col-span-2 md:row-span-2">
        <Card className="h-full bg-gradient-to-br from-blue-600/20 to-zinc-900/50 border-white/10 flex flex-col justify-end p-8 hover:border-blue-500/50 transition-all group">
          <Bot className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
          <CardTitle className="text-3xl font-bold mb-3">{t('automation.title')}</CardTitle>
          <CardDescription className="text-zinc-400 text-lg leading-relaxed">
            {t('automation.desc')}
          </CardDescription>
        </Card>
      </motion.div>

      {/* Análisis de Datos - Largo */}
      <motion.div variants={item} className="md:col-span-2">
        <Card className="bg-zinc-900/50 border-white/10 p-8 hover:bg-zinc-800/50 transition-all flex items-start justify-between">
          <div className="max-w-[70%]">
            <CardTitle className="text-xl mb-2">{t('analysis.title')}</CardTitle>
            <CardDescription className="text-zinc-400">{t('analysis.desc')}</CardDescription>
          </div>
          <BarChart3 className="w-10 h-10 text-indigo-400" />
        </Card>
      </motion.div>

      {/* Optimización - Pequeño */}
      <motion.div variants={item}>
        <Card className="bg-zinc-900/50 border-white/10 p-6 hover:bg-zinc-800/50 transition-all">
          <Zap className="w-7 h-7 text-yellow-500 mb-4" />
          <CardTitle className="text-lg mb-1">{t('optimization.title')}</CardTitle>
          <CardDescription className="text-zinc-500 text-sm">{t('optimization.desc')}</CardDescription>
        </Card>
      </motion.div>

      {/* Consultoría - Pequeño */}
      <motion.div variants={item}>
        <Card className="bg-zinc-900/50 border-white/10 p-6 hover:bg-zinc-800/50 transition-all">
          <Cpu className="w-7 h-7 text-purple-500 mb-4" />
          <CardTitle className="text-lg mb-1">{t('consulting.title')}</CardTitle>
          <CardDescription className="text-zinc-500 text-sm">{t('consulting.desc')}</CardDescription>
        </Card>
      </motion.div>
    </motion.div>
  );
}