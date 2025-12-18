'use client';
import { useTranslations } from 'next-intl';
import { X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TableComparison() {
  const t = useTranslations('Comparison');

  const rows = [
    { cat: t('row1.0'), suma: t('row1.1'), path: t('row1.2') },
    { cat: t('row2.0'), suma: t('row2.1'), path: t('row2.2') },
    { cat: t('row3.0'), suma: t('row3.1'), path: t('row3.2') },
    { cat: t('row4.0'), suma: t('row4.1'), path: t('row4.2') },
    { cat: t('row5.0'), suma: t('row5.1'), path: t('row5.2') },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* CABECERA */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4"
          >
            {t('title')} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent px-1">{t('titleAccent')}</span>
          </motion.h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
        </div>

        {/* --- VERSIÓN ESCRITORIO (TABLA) --- */}
        <div className="hidden md:block overflow-x-auto rounded-[32px] border border-white/5 bg-zinc-900/10 backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-8 text-zinc-500 text-[11px] tracking-widest font-bold w-1/4 uppercase">{t('colCategory')}</th>
                <th className="p-8 bg-blue-600/15 text-blue-400 font-bold text-lg tracking-tight w-1/3">{t('colSumadots')}</th>
                <th className="p-8 text-zinc-400 font-bold w-1/3">{t('colYourPath')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-8 font-bold text-foreground transition-transform group-hover:translate-x-1">{row.cat}</td>
                  <td className="p-8 bg-blue-600/5 text-foreground font-medium">
                    <div className="flex items-center gap-3">
                      <Image 
                        src="/suma-icon.svg" 
                        alt="Check" 
                        width={20} 
                        height={20} 
                        className="dark:invert brightness-125 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]"
                      />
                      {row.suma}
                    </div>
                  </td>
                  <td className="p-8 text-zinc-500">
                    <div className="flex items-center gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                      <X className="w-5 h-5 flex-shrink-0 text-red-900" />
                      {row.path}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- VERSIÓN MÓVIL (CARDS) --- */}
        <div className="md:hidden space-y-6">
          {rows.map((row, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/5 bg-zinc-900/20 p-6 space-y-4"
            >
              <h3 className="text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase border-b border-white/5 pb-2">
                {row.cat}
              </h3>
              
              {/* Opción Sumadots */}
              <div className="bg-blue-600/10 rounded-xl p-4 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Image src="/suma-icon.svg" alt="Suma" width={16} height={16} className="dark:invert" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">{t('colSumadots')}</span>
                </div>
                <p className="text-sm font-medium text-foreground leading-relaxed">{row.suma}</p>
              </div>

              {/* Opción Tradicional */}
              <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <X className="w-4 h-4 text-red-900" />
                  <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{t('colYourPath')}</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{row.path}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}