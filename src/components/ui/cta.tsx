'use client';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Send, X, ShieldCheck, ChevronDown, Check, Search } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';

// --- IMPORTS DE LA LIBRERÍA DE TELÉFONO ---
import PhoneInput from 'react-phone-number-input/input';
import { getCountries, getCountryCallingCode, Country } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import flags from 'react-phone-number-input/flags';
import { cn } from "@/lib/utils";

// Definimos un tipo para el componente de bandera que acepte className
type FlagProps = { title: string; className: string };
type FlagComponentType = React.ComponentType<FlagProps>;

// Mapeo de Idioma -> Código de País
const LOCALE_TO_COUNTRY: Record<string, Country> = {
  'es-CL': 'CL',
  'en-US': 'US',
  'pt-BR': 'BR'
};

export default function CTASection() {
  const t = useTranslations('CTA');
  const tTerms = useTranslations('Terms');
  const locale = useLocale(); // Obtenemos el idioma actual (ej: 'es-CL')
  
  // Estados del Formulario
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estados del Teléfono
  // Inicializamos con el país correspondiente al idioma o 'CL' por defecto
  const [country, setCountry] = useState<Country>(LOCALE_TO_COUNTRY[locale] || 'CL'); 
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const sections = [1, 2, 3, 4, 5, 6];

  // Efecto para actualizar el país si el usuario cambia el idioma en el Navbar
  useEffect(() => {
    const newCountry = LOCALE_TO_COUNTRY[locale];
    if (newCountry) {
      setCountry(newCountry);
    }
  }, [locale]);

  // Generar lista de países ordenada y filtrada
  const countryOptions = useMemo(() => {
    const allCountries = getCountries();
    return allCountries
      .map((c) => ({
        code: c,
        name: en[c] || c,
        callingCode: getCountryCallingCode(c),
      }))
      .filter((c) => {
        const search = searchTerm.toLowerCase();
        return (
          c.name.toLowerCase().includes(search) || 
          `+${c.callingCode}`.includes(search)
        );
      });
  }, [searchTerm]);

  // Manejo de clicks fuera del dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enfocar buscador al abrir
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Aquí puedes enviar "country" y "phoneNumber" a tu backend
    console.log({ 
      locale,
      country, 
      callingCode: getCountryCallingCode(country),
      fullPhone: phoneNumber 
    });
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  // Obtener la bandera actual
  const FlagComponent = flags[country] as unknown as FlagComponentType;

  return (
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
            <button className="h-14 px-8 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center shadow-md hover:opacity-90 transition-all mx-auto lg:mx-0 font-semibold cursor-pointer">
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
            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* Grid Nombre y Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  required
                  placeholder={t('formName')} 
                  style={{ backgroundColor: 'var(--cta-input-bg)' }}
                  className="w-full h-12 px-5 border-none rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-blue-500/20 transition-all outline-none" 
                />
                <input 
                  type="email" 
                  required
                  placeholder={t('formEmail')} 
                  style={{ backgroundColor: 'var(--cta-input-bg)' }}
                  className="w-full h-12 px-5 border-none rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-blue-500/20 transition-all outline-none" 
                />
              </div>

              {/* INPUT TELEFÓNICO CUSTOMIZADO */}
              <div className="relative flex gap-3" ref={dropdownRef}>
                {/* Selector de País (Trigger) */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ backgroundColor: 'var(--cta-input-bg)' }}
                    className="h-12 pl-4 pr-3 rounded-xl flex items-center gap-2 transition-all outline-none focus:ring-1 focus:ring-blue-500/20 hover:bg-black/5 dark:hover:bg-white/5 min-w-[100px] justify-between border border-transparent"
                  >
                    <div className="flex items-center gap-2">
                      {FlagComponent && (
                        <FlagComponent title={en[country]} className="w-6 h-4 rounded-[2px] shadow-sm object-cover" />
                      )}
                      <span className="text-sm font-medium text-foreground">
                        +{getCountryCallingCode(country)}
                      </span>
                    </div>
                    <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Lista de Países */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute top-14 left-0 w-[280px] max-h-[320px] bg-popover border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col bg-background"
                      >
                        {/* Buscador sticky */}
                        <div className="p-2 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
                            <input
                              ref={searchInputRef}
                              type="text"
                              placeholder="Buscar..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-full h-8 pl-8 pr-3 text-xs rounded-md bg-muted/50 border-none outline-none focus:ring-1 focus:ring-blue-500/50 text-foreground placeholder:text-muted-foreground"
                            />
                          </div>
                        </div>

                        {/* Lista Scrollable */}
                        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                          {countryOptions.map((option) => {
                            const OptionFlag = flags[option.code] as unknown as FlagComponentType;
                            return (
                              <button
                                key={option.code}
                                type="button"
                                onClick={() => {
                                  setCountry(option.code as Country);
                                  setIsDropdownOpen(false);
                                  setSearchTerm('');
                                }}
                                className={cn(
                                  "w-full px-4 py-2.5 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left",
                                  country === option.code && "bg-blue-500/10"
                                )}
                              >
                                {OptionFlag && <OptionFlag title={option.name} className="w-5 h-4 rounded-[2px] shadow-sm flex-shrink-0" />}
                                <span className="text-sm flex-1 text-foreground truncate">{option.name}</span>
                                <span className="text-xs text-muted-foreground font-mono">+{option.callingCode}</span>
                                {country === option.code && <Check className="w-3.5 h-3.5 text-blue-500" />}
                              </button>
                            );
                          })}
                          {countryOptions.length === 0 && (
                            <div className="p-4 text-center text-xs text-muted-foreground">
                              No se encontraron países
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input Numérico (Library) */}
                <PhoneInput
                  country={country}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  placeholder={t('formPhone')}
                  style={{ backgroundColor: 'var(--cta-input-bg)' }}
                  className="flex-1 h-12 px-5 border-none rounded-xl text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-blue-500/20 transition-all outline-none bg-transparent w-full font-medium"
                />
              </div>

              {/* Textarea */}
              <textarea 
                required
                placeholder={t('formHelp')} 
                style={{ backgroundColor: 'var(--cta-input-bg)' }}
                className="w-full min-h-[120px] p-5 border-none rounded-xl text-foreground resize-none placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-blue-500/20 transition-all outline-none" 
              />
              
              {/* TyC */}
              <div className="flex items-start gap-3 px-1">
                <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded border-border bg-background text-blue-600 focus:ring-blue-500/20 cursor-pointer" />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-tight cursor-pointer select-none">
                  {t('formTerms')}{' '}
                  <button type="button" onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                    {t('formTermsLink')}
                  </button>
                </label>
              </div>

              <button disabled={isSubmitting} className="w-full h-14 font-bold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center hover:opacity-95 shadow-sm active:scale-[0.98] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <span className="animate-pulse">Enviando...</span>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    {t('formSubmit')}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* MODAL DE TÉRMINOS (Sin cambios) */}
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