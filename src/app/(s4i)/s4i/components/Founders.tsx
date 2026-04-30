type Founder = {
  id: string;
  tag: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  milestones: string[];
  photo: string;
  accent: string;
};

const FOUNDERS: Founder[] = [
  {
    id: 'pipe',
    tag: '[ THE_ARCHITECT ]',
    name: 'Pipe Soto',
    role: 'Co-Founder & Lead Architect',
    company: 'SUMADOTS FOR IMPACT',
    bio: 'Construí sistemas para +100M de usuarios en LATAM (Mercado Libre, Falabella). Actualmente lidero Sumadots (S4i) y proyectos de trazabilidad en la Amazonía con Red Impacto Latam. Mi misión es clara: inyectar el rigor del Big Tech a los desafíos sociales. Que la tecnología sea tu motor, no tu techo.',
    milestones: [
      '+100M Usuarios Escalados',
      'Comité Andino Amazónico',
      'Mentor de Líderes Sociales (MIAMI · LATAM)',
    ],
    photo: '/s4i/sumadots-founder.webp',
    accent: '#a78bfa',
  },
  {
    id: 'ed',
    tag: '[ THE_STRATEGIST ]',
    name: 'Ed Spohr',
    role: 'Co-Founder & Director of Growth',
    company: 'SUMADOTS FOR IMPACT',
    bio: '15+ años diseñando soluciones digitales de alta adopción en LATAM, hoy enfocado en IA generativa y agentes inteligentes para fundaciones e instituciones de impacto social.',
    milestones: [
      'Ex-Microsoft, JLL y Bechtel',
      'Certificado Prosci, Scrum y Azure',
      'Growth Buddies SpA',
    ],
    photo: '/s4i/groddies-founder-2.jpeg',
    accent: '#60a5fa',
  },
];

export default function Founders() {
  return (
    <section
      id="founders"
      className="pt-24 pb-40 max-w-6xl mx-auto scroll-mt-24"
    >
      <div className="mb-20">
        <div className="eyebrow mb-6">
          <span>La Alianza · s4i</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-[1.1] max-w-3xl">
          Dos mundos.
          <br />
          <span className="text-white/45 italic font-light">
            Una sola obsesión:
          </span>
          <br />
          Escalar el ROI Social.
        </h2>
      </div>

      <div className="flex flex-col gap-32">
        {FOUNDERS.map((f, idx) => (
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
                  src={f.photo}
                  alt={f.name}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
              </div>
              <div className="absolute top-8 -right-4 md:-right-8 origin-bottom-right -rotate-90">
                <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] whitespace-nowrap">
                  Engineering Authority // {f.company}
                </span>
              </div>
            </div>

            <div className="w-full md:w-7/12">
              <span
                className="font-mono text-[11px] uppercase tracking-[0.3em] mb-4 block"
                style={{ color: f.accent }}
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
                      style={{ backgroundColor: f.accent }}
                    />
                    <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
                      {m}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
