"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { INSTAGRAM } from "@/lib/data";
import CinemaArt from "./CinemaArt";
import SectionHeading from "./SectionHeading";

const HEIGHTS: Record<string, string> = {
  tall: "aspect-[3/4.6]",
  mid: "aspect-[3/3.6]",
  short: "aspect-[3/2.8]",
};

export default function InstagramSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        const el = root.current?.querySelector(".mc-ig-count");
        if (el) el.textContent = "48.7";
        return;
      }
      gsap.from(".mc-ig-item", {
        opacity: 0,
        scale: 0.88,
        y: 40,
        duration: 0.9,
        stagger: { each: 0.06, grid: "auto", from: "center" },
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".mc-ig-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      const obj = { v: 0 };
      gsap.to(obj, {
        v: 48.7,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
        onUpdate: () => {
          const el = root.current?.querySelector(".mc-ig-count");
          if (el) el.textContent = obj.v.toFixed(1);
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative px-6 py-28 md:py-44 lg:px-10">
      <SectionHeading kicker="@miracleclickz" title="Life in Frames" reveal="scale" />

      <div className="mc-ig-grid mx-auto max-w-6xl columns-2 gap-5 md:columns-4">
        {INSTAGRAM.map((p, i) => (
          <a
            key={i}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mc-ig-item group relative mb-5 block overflow-hidden rounded-sm"
            aria-label={`Instagram reel ${i + 1}, ${p.likes} likes`}
          >
            <CinemaArt
              hue={p.hue}
              hue2={(p.hue + 140) % 360}
              seed={i + 21}
              image={p.image}
              className={`${HEIGHTS[p.h]} w-full transition-transform duration-[1.3s] ease-lux group-hover:scale-110`}
            />
            {/* reel-playing shimmer on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.08) 50%, transparent 65%)",
                backgroundSize: "280% 100%",
                animation: "shimmer 2.2s linear infinite",
              }}
            />
            {/* glass overlay */}
            <div className="glass absolute inset-x-3 bottom-3 flex translate-y-14 items-center justify-between rounded-sm px-4 py-3 opacity-0 transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
              <span className="flex items-center gap-2 text-[11px] text-chalk/85">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#D6B25E" aria-hidden="true">
                  <path d="M12 21s-8-5.2-10.2-10C.4 7.6 3 4 6.5 4 9 4 12 6.8 12 6.8S15 4 17.5 4C21 4 23.6 7.6 22.2 11 20 15.8 12 21 12 21z" />
                </svg>
                {p.likes}
              </span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.4" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5.5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="17.8" cy="6.2" r="1" fill="rgba(255,255,255,0.8)" stroke="none" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center gap-2">
        <p className="font-serif text-4xl font-light text-white md:text-5xl">
          <span className="mc-ig-count tabular-nums text-shimmer">0.0</span>
          <span className="text-gold">k</span>
        </p>
        <p className="text-[10px] uppercase tracking-cine text-white/40">
          Followers & counting
        </p>
      </div>
    </section>
  );
}
