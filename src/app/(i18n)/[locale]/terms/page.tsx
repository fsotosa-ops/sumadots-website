import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations('Terms');

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 text-foreground selection:bg-blue-500/30">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* BOTÓN DE RETORNO PROFESIONAL */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {/* Asegúrate de añadir esta llave en tu JSON o cámbiala por texto fijo */}
          Volver al Inicio
        </Link>

        <header className="mb-16 border-b border-white/10 pb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white leading-tight">
            {t('title')}
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-blue-600 rounded-full" />
            <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-semibold">
              {t('lastUpdate')}
            </p>
          </div>
        </header>

        <div className="space-y-16 text-zinc-400 leading-relaxed text-lg font-light">
          <section className="group">
            <h2 className="text-sm font-bold text-blue-500 mb-4 uppercase tracking-[0.3em] group-hover:text-blue-400 transition-colors">
              {t('section1Title')}
            </h2>
            <p className="border-l border-white/5 pl-6">{t('section1Content')}</p>
          </section>

          <section className="group">
            <h2 className="text-sm font-bold text-blue-500 mb-4 uppercase tracking-[0.3em] group-hover:text-blue-400 transition-colors">
              {t('section2Title')}
            </h2>
            <p className="border-l border-white/5 pl-6">{t('section2Content')}</p>
          </section>

          <section className="group">
            <h2 className="text-sm font-bold text-blue-500 mb-4 uppercase tracking-[0.3em] group-hover:text-blue-400 transition-colors">
              {t('section3Title')}
            </h2>
            <p className="border-l border-white/5 pl-6">{t('section3Content')}</p>
          </section>

          <footer className="pt-16 border-t border-white/5">
            <div className="bg-zinc-900/30 p-8 rounded-3xl border border-white/5 italic text-sm text-zinc-500 text-center">
              "{t('footerNote')}"
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}