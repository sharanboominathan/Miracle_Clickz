"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { STATS } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const nums = gsap.utils.toArray<HTMLElement>(".mc-stat-num");
      if (prefersReducedMotion()) {
        nums.forEach((el, i) => {
          el.textContent = String(STATS[i].value);
        });
        return;
      }
      nums.forEach((el, i) => {
        const target = STATS[i].value;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });
      gsap.from(".mc-stat-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.6,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(".mc-stat-label", {
        opacity: 0,
        y: 16,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden px-6 py-28 md:py-40">
      <div className="light-rays opacity-60" />
      <SectionHeading
        kicker="Why Miracle Clickz"
        title="Trusted by a Thousand Love Stories"
        reveal="blur"
      />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-14 sm:gap-x-10 sm:gap-y-16 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col">
            <div className="flex flex-wrap items-baseline">
              <span className="mc-stat-num font-serif text-4xl font-light tabular-nums text-white sm:text-6xl md:text-8xl">
                0
              </span>
              <span className="ml-1 font-serif text-xl text-gold sm:text-3xl md:text-5xl">
                {s.suffix}
              </span>
            </div>
            <span className="mc-stat-rule mt-5 block h-px w-full bg-gradient-to-r from-gold/70 to-transparent" />
            <span className="mc-stat-label mt-4 text-[10px] uppercase tracking-cine text-white/50">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
