'use client';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, Zap, BarChart3, Bot } from "lucide-react"; // Ya tienes lucide-react instalado

export default function ServicesBento() {
  const t = useTranslations('Services');

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 max-w-7xl mx-auto px-6 py-20">
      {/* Card Principal - Automatización */}
      <Card className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-600/20 to-transparent border-white/10 flex flex-col justify-end p-6 hover:bg-blue-600/10 transition-all cursor-default">
        <Bot className="w-12 h-12 text-blue-400 mb-4" />
        <CardTitle className="text-3xl mb-2">{t('automation.title')}</CardTitle>
        <CardDescription className="text-zinc-400 text-lg leading-relaxed">
          {t('automation.desc')}
        </CardDescription>
      </Card>

      {/* Card - Análisis con IA */}
      <Card className="md:col-span-2 bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all cursor-default">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="mb-2">{t('analysis.title')}</CardTitle>
            <CardDescription className="text-zinc-400">{t('analysis.desc')}</CardDescription>
          </div>
          <BarChart3 className="w-8 h-8 text-indigo-400" />
        </div>
      </Card>

      {/* Card - Optimización */}
      <Card className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all cursor-default">
        <Zap className="w-6 h-6 text-yellow-400 mb-4" />
        <CardTitle className="text-lg">{t('optimization.title')}</CardTitle>
        <CardDescription className="text-zinc-400 text-sm mt-2">{t('optimization.desc')}</CardDescription>
      </Card>

      {/* Card - Consultoría */}
      <Card className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all cursor-default">
        <Cpu className="w-6 h-6 text-purple-400 mb-4" />
        <CardTitle className="text-lg">{t('consulting.title')}</CardTitle>
        <CardDescription className="text-zinc-400 text-sm mt-2">{t('consulting.desc')}</CardDescription>
      </Card>
    </div>
  );
}