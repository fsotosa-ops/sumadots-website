'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check, X } from 'lucide-react';

export default function Comparison() {
  const t = useTranslations('Comparison');

  const rows = [
    { cat: t('row1.0'), suma: t('row1.1'), trad: t('row1.2') },
    { cat: t('row2.0'), suma: t('row2.1'), trad: t('row2.2') },
    { cat: t('row3.0'), suma: t('row3.1'), trad: t('row3.2') },
    { cat: t('row4.0'), suma: t('row4.1'), trad: t('row4.2') },
    { cat: t('row5.0'), suma: t('row5.1'), trad: t('row5.2') },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase">
            {t('title')} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('titleAccent')}</span>
          </h2>
        </div>

        <div className="overflow-x-auto rounded-[32px] border border-white/5 bg-zinc-900/10 backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-8 text-zinc-500 uppercase text-[10px] tracking-widest font-bold">{t('colCategory')}</th>
                <th className="p-8 bg-blue-600/10 text-blue-400 font-black text-xl italic">{t('colSumadots')}</th>
                <th className="p-8 text-zinc-400 font-bold">{t('colYourPath')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-8 font-bold text-foreground transition-transform group-hover:translate-x-1">{row.cat}</td>
                  <td className="p-8 bg-blue-600/5 text-foreground font-medium">
                    <div className="flex items-center gap-3">
                      <Check className="text-blue-500 w-5 h-5 flex-shrink-0" />
                      {row.suma}
                    </div>
                  </td>
                  <td className="p-8 text-zinc-500">
                    <div className="flex items-center gap-3 opacity-50">
                      <X className="w-5 h-5 flex-shrink-0 text-red-900" />
                      {row.trad}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}