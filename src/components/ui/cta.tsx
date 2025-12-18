'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, Send } from 'lucide-react';

export default function CTASection() {
  const t = useTranslations('CTA');

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
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
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
              <button className="h-16 px-8 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all rounded-2xl flex items-center group">
                <Calendar className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                {t('button')}
              </button>
            </motion.div>
          </div>

          {/* FORMULARIO CON TyC */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[32px] shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-8">{t('formTitle')}</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text"
                  placeholder={t('formName')} 
                  className="w-full h-14 px-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-foreground placeholder:text-muted-foreground/50" 
                />
                <input 
                  type="email"
                  placeholder={t('formEmail')} 
                  className="w-full h-14 px-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-foreground placeholder:text-muted-foreground/50" 
                />
              </div>
              <textarea 
                placeholder={t('formHelp')} 
                className="w-full min-h-[120px] p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-foreground resize-none placeholder:text-muted-foreground/50" 
              />
              
              {/* --- CHECKBOX DE TÉRMINOS Y CONDICIONES --- */}
              <div className="flex items-start gap-3 px-1">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required
                  className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-600/50" 
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                  {t('formTerms')}{' '}
                  <a href="/terms" className="text-blue-500 hover:underline transition-all">
                    {/* Puedes crear una página sencilla de Términos después */}
                    {t('formTermsLink')}
                  </a>
                </label>
              </div>

              <button className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center">
                <Send className="mr-2 w-5 h-5" />
                {t('formSubmit')}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}