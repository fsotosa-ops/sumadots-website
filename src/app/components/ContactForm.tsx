'use client';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, ShieldCheck, ChevronDown, Search, Check } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import PhoneInput from 'react-phone-number-input/input';
import { getCountries, getCountryCallingCode, Country } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import flags from 'react-phone-number-input/flags';
import { cn } from "@/lib/utils";
import { useLocale } from 'next-intl';

type FlagProps = { title: string; className: string };
type FlagComponentType = React.ComponentType<FlagProps>;

const LOCALE_TO_COUNTRY: Record<string, Country> = {
  'es-CL': 'CL', 'en-US': 'US', 'pt-BR': 'BR'
};

export default function ContactForm() {
  const t = useTranslations('CTA');
  const tTerms = useTranslations('Terms');
  const locale = useLocale();
  
  // Estados
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [country, setCountry] = useState<Country>(LOCALE_TO_COUNTRY[locale] || 'CL'); 
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sections = [1, 2, 3, 4, 5, 6]; // Para el modal de términos

  // Efectos y Lógica (Copiados de tu CTA original)
  useEffect(() => {
    const newCountry = LOCALE_TO_COUNTRY[locale];
    if (newCountry) setCountry(newCountry);
  }, [locale]);

  const countryOptions = useMemo(() => {
    return getCountries().map((c) => ({
      code: c, name: en[c] || c, callingCode: getCountryCallingCode(c),
    })).filter((c) => {
      const search = searchTerm.toLowerCase();
      return c.name.toLowerCase().includes(search) || `+${c.callingCode}`.includes(search);
    });
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); setSearchTerm('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [isDropdownOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  const FlagComponent = flags[country] as unknown as FlagComponentType;

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              backgroundColor: 'var(--cta-card-bg)', 
              borderColor: 'var(--cta-card-border)',
              boxShadow: 'var(--cta-shadow)'
            }}
            className="relative w-full max-w-2xl backdrop-blur-3xl border p-8 md:p-12 rounded-[40px]"
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold mb-3 text-foreground tracking-tight">{t('formTitle')}</h3>
              <p className="text-muted-foreground">{t('formHelp')}</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Inputs Nombre y Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="text" required placeholder={t('formName')} style={{ backgroundColor: 'var(--cta-input-bg)' }} className="w-full h-14 px-5 border-none rounded-2xl text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-blue-500/20 transition-all outline-none" />
                <input type="email" required placeholder={t('formEmail')} style={{ backgroundColor: 'var(--cta-input-bg)' }} className="w-full h-14 px-5 border-none rounded-2xl text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-blue-500/20 transition-all outline-none" />
              </div>

              {/* Input Teléfono */}
              <div className="relative flex gap-3" ref={dropdownRef}>
                <div className="relative">
                  <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ backgroundColor: 'var(--cta-input-bg)' }} className="h-14 pl-4 pr-3 rounded-2xl flex items-center gap-2 transition-all outline-none focus:ring-1 focus:ring-blue-500/20 min-w-[110px] justify-between">
                    <div className="flex items-center gap-2">
                      {FlagComponent && <FlagComponent title={en[country]} className="w-6 h-4 rounded-[2px] shadow-sm object-cover" />}
                      <span className="text-sm font-medium text-foreground">+{getCountryCallingCode(country)}</span>
                    </div>
                    <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute top-16 left-0 w-[280px] max-h-[300px] bg-background border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col">
                        <div className="p-2 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                          <div className="relative"><Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" /><input ref={searchInputRef} type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full h-8 pl-8 pr-3 text-xs rounded-md bg-muted/50 border-none outline-none focus:ring-1 focus:ring-blue-500/50 text-foreground" /></div>
                        </div>
                        <div className="overflow-y-auto">
                          {countryOptions.map((opt) => {
                            const OptFlag = flags[opt.code] as unknown as FlagComponentType;
                            return (
                              <button key={opt.code} type="button" onClick={() => { setCountry(opt.code as Country); setIsDropdownOpen(false); setSearchTerm(''); }} className={cn("w-full px-4 py-2.5 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left", country === opt.code && "bg-blue-500/10")}>
                                {OptFlag && <OptFlag title={opt.name} className="w-5 h-4 rounded-[2px] flex-shrink-0" />}
                                <span className="text-sm flex-1 text-foreground truncate">{opt.name}</span>
                                <span className="text-xs text-muted-foreground">+{opt.callingCode}</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <PhoneInput country={country} value={phoneNumber} onChange={setPhoneNumber} placeholder={t('formPhone')} style={{ backgroundColor: 'var(--cta-input-bg)' }} className="flex-1 h-14 px-5 border-none rounded-2xl text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-blue-500/20 transition-all outline-none bg-transparent w-full font-medium" />
              </div>

              <textarea required placeholder={t('formHelp')} style={{ backgroundColor: 'var(--cta-input-bg)' }} className="w-full min-h-[140px] p-5 border-none rounded-2xl text-foreground resize-none placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-blue-500/20 transition-all outline-none" />
              
              <div className="flex items-start gap-3 px-1">
                <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded border-border bg-background text-blue-600 focus:ring-blue-500/20 cursor-pointer" />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer select-none">
                  {t('formTerms')}{' '}
                  <button type="button" onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-blue-400 font-medium transition-colors">{t('formTermsLink')}</button>
                </label>
              </div>

              <button disabled={isSubmitting} className="w-full h-16 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center hover:opacity-95 shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-70">
                {isSubmitting ? "Enviando..." : <><Send className="mr-2 w-5 h-5" />{t('formSubmit')}</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Modal de Términos */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative w-full max-w-2xl max-h-[85vh] bg-background border border-border/50 rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
              <div className="p-8 pb-6 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between text-foreground">
                <div className="flex items-center gap-4"><div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><ShieldCheck className="w-5 h-5" /></div><h2 className="text-lg font-bold">{tTerms('title')}</h2></div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <div className="p-8 pt-6 overflow-y-auto flex-1 text-foreground">
                <div className="space-y-8">{sections.map((num) => (<section key={num}><h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-2">{tTerms(`sec${num}Title`)}</h3><p className="text-sm font-light leading-relaxed text-muted-foreground">{tTerms(`sec${num}Content`)}</p></section>))}</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}