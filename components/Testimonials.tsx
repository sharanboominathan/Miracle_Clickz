"use client";

import { TESTIMONIALS } from "@/lib/data";
import SectionHeading from "./SectionHeading";

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 star Google review">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#D6B25E" aria-hidden="true">
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="glass mx-3 w-[320px] flex-shrink-0 rounded-sm p-7 transition-colors duration-500 hover:border-gold/30 md:w-[380px]">
      <div className="flex items-center gap-4">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full font-serif text-lg text-jet"
          style={{
            background: "linear-gradient(135deg, #E8CD8C, #A3823B)",
          }}
          aria-hidden="true"
        >
          {t.initial}
        </span>
        <div>
          <figcaption className="text-sm text-white/90">{t.name}</figcaption>
          <div className="mt-1 flex items-center gap-2">
            <Stars />
            <span className="text-[9px] uppercase tracking-wide2 text-white/35">
              Google
            </span>
          </div>
        </div>
      </div>
      <blockquote className="mt-5 font-serif text-lg font-light italic leading-relaxed text-white/70">
        “{t.text}”
      </blockquote>
    </figure>
  );
}

export default function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="relative overflow-hidden py-28 md:py-44">
      <div className="px-6">
        <SectionHeading kicker="Kind Words" title="Loved by Couples" reveal="blur" />
      </div>
      <div className="marquee-paused relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent md:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent md:w-48" />
        <div className="marquee-track py-2">
          {doubled.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
