"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { FAQS } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Faq() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".mc-faq-item", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.09,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".mc-faq-list",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden px-6 py-28 md:py-40">
      {/* background morph */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 transition-all duration-[1.2s] ease-lux"
        style={{
          background: `radial-gradient(circle, hsla(${
            42 + (open ?? 0) * 24
          }, 55%, 40%, 0.10), transparent 65%)`,
          filter: "blur(40px)",
          transform: `translate(-50%, -50%) scale(${1 + (open ?? 0) * 0.08})`,
        }}
      />
      <SectionHeading kicker="Questions" title="Before You Ask" reveal="mask" />
      <div className="mc-faq-list mx-auto max-w-3xl">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="mc-faq-item border-b border-white/8">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span
                  className={`font-serif text-xl font-light transition-colors duration-500 md:text-2xl ${
                    isOpen ? "text-gold" : "text-white group-hover:text-gold/80"
                  }`}
                >
                  {f.q}
                </span>
                <span
                  className={`relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-lux ${
                    isOpen ? "rotate-45 border-gold/70" : "border-white/15 group-hover:border-white/40"
                  }`}
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 1v10M1 6h10" stroke={isOpen ? "#D6B25E" : "rgba(255,255,255,0.6)"} strokeWidth="1" />
                  </svg>
                </span>
              </button>
              <div
                className="grid transition-all duration-700 ease-lux"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-7 text-sm leading-relaxed text-white/50">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
