'use client';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Send, X, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function CTASection() {
  const t = useTranslations('CTA');
  const tTerms = useTranslations('Terms');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sections = [1, 2, 3, 4, 5, 6];

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* BLOQUE DE TEXTO */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-white">
                {t('title')}<br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  {t('titleAccent')}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-md mx-auto lg:mx-0">
                {t('description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-full flex justify-center lg:justify-start"
            >
              <button className="h-16 px-8 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all rounded-2xl flex items-center shadow-lg shadow-blue-900/20 group">
                <Calendar className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                {t('button')}
              </button>
            </motion.div>
          </div>

          {/* FORMULARIO */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[32px] shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-8 text-white">{t('formTitle')}</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder={t('formName')} className="w-full h-14 px-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-white placeholder:text-muted-foreground/50" />
                <input type="email" placeholder={t('formEmail')} className="w-full h-14 px-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-white placeholder:text-muted-foreground/50" />
              </div>
              <textarea placeholder={t('formHelp')} className="w-full min-h-[120px] p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-white resize-none placeholder:text-muted-foreground/50" />
              
              <div className="flex items-start gap-3 px-1">
                <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-600/50 cursor-pointer" />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-tight cursor-pointer select-none">
                  {t('formTerms')}{' '}
                  <button type="button" onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-indigo-400 transition-colors font-medium underline underline-offset-2">
                    {t('formTermsLink')}
                  </button>
                </label>
              </div>

              <div className="pt-2">
                <button className="w-full h-16 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all text-white flex items-center justify-center shadow-lg shadow-blue-900/20 group">
                  <Send className="mr-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  {t('formSubmit')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* MODAL DE TyC */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-2xl max-h-[85vh] bg-zinc-950 border border-white/10 rounded-[40px] shadow-[0_0_80px_rgba(79,70,229,0.15)] overflow-hidden flex flex-col">
              <div className="p-8 pb-6 border-b border-white/5 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-600/20 text-blue-500">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white leading-tight">{tTerms('title')}</h2>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-1 font-semibold">{tTerms('lastUpdate')}</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-all group"><X className="w-6 h-6 text-zinc-500 group-hover:text-white" /></button>
              </div>
              <div className="p-8 pt-6 overflow-y-auto custom-scrollbar flex-1">
                <p className="text-zinc-400 text-sm mb-10 italic border-l-2 border-purple-600/30 pl-4">{tTerms('intro')}</p>
                <div className="space-y-10">
                  {sections.map((num) => (
                    <section key={num} className="group transition-transform duration-300 hover:translate-x-1">
                      <h3 className="text-xs font-bold text-blue-500 uppercase tracking-[0.3em] mb-3 group-hover:text-indigo-400 transition-colors">{tTerms(`sec${num}Title`)}</h3>
                      <p className="text-zinc-300 text-[15px] font-light leading-relaxed border-l border-white/5 pl-6 group-hover:border-blue-500/50 transition-colors">{tTerms(`sec${num}Content`)}</p>
                    </section>
                  ))}
                </div>
                <footer className="mt-12 pt-8 border-t border-white/5 text-center">
                  <p className="text-[11px] text-zinc-600 uppercase tracking-widest mb-4">{tTerms('footerNote')}</p>
                  <div className="inline-flex h-1 w-24 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full" />
                </footer>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}