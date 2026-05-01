'use client';

import { useState, useEffect } from 'react';

type TestimonialItem = {
  id: string;
  quote: string;
  name: string;
  role: string;
  verified: string;
};

type Props = { items: TestimonialItem[] };

export default function TestimonialCarousel({ items }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (!items || items.length === 0) return null;

  return (
    <div className="relative min-h-[320px] md:min-h-[280px] flex flex-col justify-center max-w-4xl mx-auto">
      <div
        key={active}
        className="animate-in fade-in slide-in-from-bottom-4 duration-1000"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] shadow-[0_0_8px_#7c3aed]" />
          <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
            {items[active].verified}
          </span>
        </div>

        <blockquote className="text-xl md:text-3xl font-light text-white/90 leading-relaxed tracking-tight mb-10 italic">
          “{items[active].quote}”
        </blockquote>

        <div className="flex flex-col gap-1">
          <cite className="text-lg font-medium text-white not-italic tracking-tight">
            {items[active].name}
          </cite>
          <span className="font-mono text-[11px] text-white/40 uppercase tracking-[0.2em]">
            {items[active].role}
          </span>
        </div>
      </div>

      <div className="flex gap-3 mt-12">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className="group py-4 focus:outline-none"
          >
            <div
              className={`h-[1px] transition-all duration-700 ${
                active === idx
                  ? 'w-16 bg-white'
                  : 'w-8 bg-white/10 group-hover:bg-white/30'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
