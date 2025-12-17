'use client';
import { useTranslations } from 'next-intl';

export default function Partners() {
  const t = useTranslations('Partners');
  return (
    <section className="py-20 border-t border-white/5 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-10 text-center">{t('title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Aquí irían logos de Partners como Microsoft, OpenAI, etc. */}
          <div className="h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-zinc-600 font-bold">Partner A</div>
          <div className="h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-zinc-600 font-bold">Partner B</div>
          <div className="h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-zinc-600 font-bold">Partner C</div>
          <div className="h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-zinc-600 font-bold">Partner D</div>
        </div>
      </div>
    </section>
  );
}