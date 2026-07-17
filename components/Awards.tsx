"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { AWARDS } from "@/lib/data";
import SectionHeading from "./SectionHeading";

function Trophy() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#mc-trophy)"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mc-trophy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4E3B2" />
          <stop offset="100%" stopColor="#A3823B" />
        </linearGradient>
      </defs>
      <path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0V4z" />
      <path d="M7 5H4.5A1.5 1.5 0 0 0 3 6.5C3 9 5 10.5 7 10.5M17 5h2.5A1.5 1.5 0 0 1 21 6.5C21 9 19 10.5 17 10.5" />
    </svg>
  );
}

export default function Awards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".mc-award", {
        opacity: 0,
        rotateY: -90,
        transformOrigin: "50% 50% -80px",
        duration: 1.3,
        stagger: 0.14,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".mc-award-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      // continuous slow trophy sway
      gsap.utils.toArray<HTMLElement>(".mc-award-glyph").forEach((el, i) => {
        gsap.to(el, {
          rotateY: 20,
          duration: 3.2 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative px-6 py-28 md:py-40 lg:px-10">
      <SectionHeading kicker="Recognition" title="Awarded, Humbled" reveal="rotate" />
      <div className="mc-award-grid mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "1200px" }}>
        {AWARDS.map((a) => (
          <div
            key={a.title}
            className="mc-award glass-gold group relative overflow-hidden rounded-sm p-8 text-center transition-shadow duration-700 hover:shadow-[0_30px_80px_-25px_rgba(214,178,94,0.35)]"
          >
            {/* gold light wash */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(70% 55% at 50% 0%, rgba(214,178,94,0.16), transparent 70%)",
              }}
            />
            <div
              className="mc-award-glyph mx-auto mb-6 w-fit"
              style={{ transformStyle: "preserve-3d", filter: "drop-shadow(0 0 14px rgba(214,178,94,0.4))" }}
            >
              <Trophy />
            </div>
            <p className="font-serif text-lg font-light leading-snug text-white">
              {a.title}
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-wide2 text-gold/80">
              {a.org}
            </p>
            <p className="mt-1 text-[10px] text-white/35">{a.year}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
