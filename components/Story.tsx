"use client";

import { useRef } from "react";
import { gsap, useGSAP, splitWords, prefersReducedMotion } from "@/lib/gsap";
import CinemaArt from "./CinemaArt";

const LINES = [
  "We don't take photographs.",
  "We preserve the way he looked at her.",
  "The tear her father hid.",
  "The second before the first kiss.",
  "We make cinema out of your truth.",
];

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // growing gold timeline + camera that follows scroll
      gsap.fromTo(
        ".mc-story-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        }
      );
      gsap.fromTo(
        ".mc-story-cam",
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".mc-story-rail",
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        }
      );

      // each line reveals with a different flavour
      gsap.utils.toArray<HTMLElement>(".mc-story-text").forEach((el, i) => {
        const words = splitWords(el);
        const variants = [
          { opacity: 0, y: 50 },
          { opacity: 0, filter: "blur(12px)" },
          { opacity: 0, rotateX: -60, y: 30 },
          { opacity: 0, scale: 1.3 },
          { opacity: 0, letterSpacing: "0.2em" },
        ];
        gsap.from(words, {
          ...variants[i % variants.length],
          duration: 1,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // photos drift in alternating from sides
      gsap.utils.toArray<HTMLElement>(".mc-story-photo").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 ? 90 : -90,
          opacity: 0,
          rotate: i % 2 ? 5 : -5,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="story" className="relative px-6 py-28 md:py-44">
      <div className="mx-auto max-w-5xl">
        <div className="mb-20 text-center">
          <span className="text-[10px] uppercase tracking-cine text-gold">
            Our Story
          </span>
        </div>

        <div className="relative">
          {/* rail */}
          <div className="mc-story-rail absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block">
            <div className="absolute inset-0 bg-white/8" />
            <div className="mc-story-line absolute inset-0 bg-gradient-to-b from-gold via-gold/70 to-gold/20" />
            {/* camera icon follows the scroll */}
            <div className="mc-story-cam absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-black shadow-[0_0_24px_rgba(214,178,94,0.35)]">
                <svg width="17" height="14" viewBox="0 0 20 16" fill="none" aria-hidden="true">
                  <path
                    d="M7 1.5L5.7 3.5H2.5C1.7 3.5 1 4.2 1 5v8c0 .8.7 1.5 1.5 1.5h15c.8 0 1.5-.7 1.5-1.5V5c0-.8-.7-1.5-1.5-1.5h-3.2L13 1.5H7z"
                    stroke="#D6B25E"
                    strokeWidth="1.1"
                  />
                  <circle cx="10" cy="8.6" r="3.1" stroke="#D6B25E" strokeWidth="1.1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-28 md:gap-40">
            {LINES.map((line, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-10 md:flex-row md:gap-16 ${
                  i % 2 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`md:w-1/2 ${i % 2 ? "md:pl-16" : "md:pr-16"}`}>
                  <p
                    className="mc-story-text font-serif text-3xl font-light leading-[1.2] text-white md:text-5xl"
                    style={{ perspective: "700px" }}
                  >
                    {line}
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="mc-story-photo relative mx-auto w-64 md:w-72">
                    <CinemaArt
                      hue={[38, 205, 330, 160, 45][i]}
                      hue2={[220, 40, 45, 40, 300][i]}
                      seed={i + 7}
                      className="aspect-[4/5] rounded-sm"
                    />
                    <div className="absolute -bottom-3 -right-3 h-full w-full rounded-sm border border-gold/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
