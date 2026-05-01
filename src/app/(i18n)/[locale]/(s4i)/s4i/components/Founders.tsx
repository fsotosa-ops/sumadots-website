import { useTranslations } from 'next-intl';

type FounderEntry = {
  id: string;
  tag: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  milestones: string[];
};

const PHOTOS: Record<string, string> = {
  pipe: '/s4i/sumadots-founder.webp',
  ed: '/s4i/groddies-founder-2.jpeg',
};

const ACCENTS: Record<string, string> = {
  pipe: '#a78bfa',
  ed: '#60a5fa',
};

export default function Founders() {
  const t = useTranslations('S4i.Founders');
  const founders = t.raw('list') as FounderEntry[];

  return (
    <section
      id="founders"
      className="pt-24 pb-40 max-w-6xl mx-auto scroll-mt-24"
    >
      <div className="mb-20">
        <div className="eyebrow mb-6">
          <span>{t('eyebrow')}</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-[1.1] max-w-3xl">
          {t('titleLine1')}
          <br />
          <span className="text-white/45 italic font-light">
            {t('titleLine2')}
          </span>
          <br />
          {t('titleLine3')}
        </h2>
      </div>

      <div className="flex flex-col gap-32">
        {founders.map((f, idx) => {
          const accent = ACCENTS[f.id] ?? '#a78bfa';
          const photo = PHOTOS[f.id];
          return (
            <div
              key={f.id}
              className={`flex flex-col ${
                idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-12 md:gap-20 items-center`}
            >
              <div className="w-full md:w-5/12 relative group">
                <div className="absolute -inset-4 border border-white/5 rounded-2xl -z-10 group-hover:border-white/10 transition-colors" />
                <div className="aspect-[4/5] rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-white/5 border border-white/10">
                  <img
                    src={photo}
                    alt={f.name}
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>
                <div className="absolute top-8 -right-4 md:-right-8 origin-bottom-right -rotate-90">
                  <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] whitespace-nowrap">
                    {t('engineeringLabel')} // {f.company}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-7/12">
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.3em] mb-4 block"
                  style={{ color: accent }}
                >
                  {f.tag}
                </span>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  {f.name}
                </h3>
                <p className="font-mono text-[12px] text-white/40 uppercase tracking-widest mb-8">
                  {f.role} · {f.company}
                </p>

                <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-10 max-w-xl">
                  {f.bio}
                </p>

                <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-white/5">
                  {f.milestones.map((m) => (
                    <div key={m} className="flex items-center gap-3">
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: accent }}
                      />
                      <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
                        {m}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
