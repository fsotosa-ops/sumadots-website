'use client';
import { useTranslations } from 'next-intl';

export default function Partners() {
  const t = useTranslations('Partners');
  return (
    <section className="py-20 border-t border-border bg-muted/30 dark:bg-zinc-950/50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-10 text-center text-foreground">{t('title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Los cuadros ahora tienen un fondo que resalta en ambos temas */}
          <div className="h-20 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground font-bold shadow-sm">
            Partner A
          </div>
          <div className="h-20 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground font-bold shadow-sm">
            Partner B
          </div>
          <div className="h-20 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground font-bold shadow-sm">
            Partner C
          </div>
          <div className="h-20 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground font-bold shadow-sm">
            Partner D
          </div>
        </div>
      </div>
    </section>
  );
}