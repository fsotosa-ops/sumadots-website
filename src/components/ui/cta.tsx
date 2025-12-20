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
    // AJUSTE AQUÍ: Se agregó id="contact" y scroll-mt-20
    <section id="contact" className="py-24 relative overflow-hidden bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* BLOQUE DE TEXTO */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-foreground">
                {t('title')}<br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  {t('titleAccent')}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mt-4 max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
                {t('description')}
              </p>
            </motion.div>
            <button className="h-14 px-8 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center shadow-md hover:opacity-90 transition-all mx-auto lg:mx-0 font-semibold">
              <Calendar className="mr-2 w-5 h-5" />
              {t('button')}
            </button>
          </div>

          {/* FORMULARIO SUPERPUESTO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              backgroundColor: 'var(--cta-card-bg)', 
              borderColor: 'var(--cta-card-border)',
              boxShadow: 'var(--cta-shadow)'
            }}
            className="relative backdrop-blur-3xl border p-8 md:p-10 rounded-[40px]"
          >
            <h3 className="text-2xl font-bold mb-8 text-foreground tracking-tight">{t('formTitle')}</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder={t('formName')} 
                  style={{ backgroundColor: 'var(--cta-input-bg)' }}
                  className="w-full h-12 px-5 border-none rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-blue-500/20 transition-all outline-none" 
                />
                <input 
                  type="email" 
                  placeholder={t('formEmail')} 
                  style={{ backgroundColor: 'var(--cta-input-bg)' }}
                  className="w-full h-12 px-5 border-none rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-blue-500/20 transition-all outline-none" 
                />
              </div>
              <textarea 
                placeholder={t('formHelp')} 
                style={{ backgroundColor: 'var(--cta-input-bg)' }}
                className="w-full min-h-[120px] p-5 border-none rounded-xl text-foreground resize-none placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-blue-500/20 transition-all outline-none" 
              />
              
              {/* TyC RECUPERADOS */}
              <div className="flex items-start gap-3 px-1">
                <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded border-border bg-background text-blue-600 focus:ring-blue-500/20 cursor-pointer" />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-tight cursor-pointer select-none">
                  {t('formTerms')}{' '}
                  <button type="button" onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                    {t('formTermsLink')}
                  </button>
                </label>
              </div>

              <button className="w-full h-14 font-bold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center hover:opacity-95 shadow-sm active:scale-[0.98] transition-all">
                <Send className="mr-2 w-5 h-5" />
                {t('formSubmit')}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* MODAL DE TÉRMINOS */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative w-full max-w-2xl max-h-[85vh] bg-background border border-border/50 rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
              <div className="p-8 pb-6 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between text-foreground">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><ShieldCheck className="w-5 h-5" /></div>
                  <h2 className="text-lg font-bold">{tTerms('title')}</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <div className="p-8 pt-6 overflow-y-auto flex-1 text-foreground">
                <div className="space-y-8">
                  {sections.map((num) => (
                    <section key={num}>
                      <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-2">{tTerms(`sec${num}Title`)}</h3>
                      <p className="text-sm font-light leading-relaxed text-muted-foreground">{tTerms(`sec${num}Content`)}</p>
                    </section>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}