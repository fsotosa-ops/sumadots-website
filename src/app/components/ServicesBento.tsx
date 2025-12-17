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
      {/* 1. Agentes Autónomos - Ocupa 2 cols y 2 filas */}
      <motion.div variants={item} className="md:col-span-2 md:row-span-2">
        <Card className="h-full relative overflow-hidden bg-card border-border flex flex-col justify-end p-8 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 group">
          {/* Gradiente de fondo constante */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent dark:from-blue-600/20" />
          
          <div className="relative z-10">
            <Bot className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
            <CardTitle className="text-3xl font-bold mb-3 text-foreground">{t('automation.title')}</CardTitle>
            <CardDescription className="text-muted-foreground text-lg leading-relaxed">
              {t('automation.desc')}
            </CardDescription>
          </div>
        </Card>
      </motion.div>

      {/* 2. Análisis de Datos - Ocupa 2 cols (Fila superior derecha) */}
      <motion.div variants={item} className="md:col-span-2">
        {/* SOLUCIÓN: Se añade h-full para alinear con el bloque de la izquierda */}
        <Card className="h-full relative overflow-hidden bg-card border-border p-8 hover:border-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300 flex flex-col justify-between group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="max-w-[80%]">
              <CardTitle className="text-xl mb-2 text-foreground">{t('analysis.title')}</CardTitle>
              <CardDescription className="text-muted-foreground">{t('analysis.desc')}</CardDescription>
            </div>
            <BarChart3 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
        </Card>
      </motion.div>

      {/* 3. Optimización - Fila inferior derecha (Col 3) */}
      <motion.div variants={item}>
        {/* SOLUCIÓN: h-full asegura que la base coincida con Agentes */}
        <Card className="h-full relative overflow-hidden bg-card border-border p-6 hover:border-yellow-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10">
            <Zap className="w-7 h-7 text-yellow-600 dark:text-yellow-500 mb-4 group-hover:animate-pulse" />
            <CardTitle className="text-lg mb-1 text-foreground">{t('optimization.title')}</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">{t('optimization.desc')}</CardDescription>
          </div>
        </Card>
      </motion.div>

      {/* 4. Consultoría - Fila inferior derecha (Col 4) */}
      <motion.div variants={item}>
        {/* SOLUCIÓN: h-full para cerrar el grid perfectamente */}
        <Card className="h-full relative overflow-hidden bg-card border-border p-6 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10">
            <Cpu className="w-7 h-7 text-purple-600 dark:text-purple-500 mb-4 group-hover:rotate-12 transition-transform" />
            <CardTitle className="text-lg mb-1 text-foreground">{t('consulting.title')}</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">{t('consulting.desc')}</CardDescription>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}