"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { PROCESS } from "@/lib/data";

/**
 * Horizontal pinned timeline — the page scrolls, the process travels sideways,
 * each step blooming into the next.
 */
export default function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const t = track.current!;
        const distance = t.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance + window.innerHeight * 0.5}`,
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(t, { x: -distance, ease: "none" });

        gsap.utils.toArray<HTMLElement>(".mc-step").forEach((step) => {
          gsap.fromTo(
            step,
            { opacity: 0.25, scale: 0.9, filter: "blur(2px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: step,
                containerAnimation: tl,
                start: "left 70%",
                end: "left 35%",
                scrub: true,
              },
            }
          );
        });

        gsap.fromTo(
          ".mc-process-rail",
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${distance + window.innerHeight * 0.5}`,
              scrub: 0.7,
            },
          }
        );
      });

      // simple vertical reveals on mobile
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".mc-step").forEach((step) => {
          gsap.from(step, {
            opacity: 0,
            y: 50,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="process" className="relative overflow-hidden">
      <div className="flex min-h-screen flex-col justify-center py-24">
        <div className="mb-16 px-6 text-center lg:px-10">
          <span className="text-[10px] uppercase tracking-cine text-gold">
            The Process
          </span>
          <h2 className="mt-5 font-serif text-4xl font-light md:text-6xl">
            From Hello to Heirloom
          </h2>
        </div>

        <div className="relative">
          <div className="mc-process-rail absolute left-0 top-[54px] hidden h-px w-full bg-gradient-to-r from-gold via-gold/60 to-gold/10 md:block" />
          <div
            ref={track}
            className="flex flex-col gap-14 px-6 md:w-max md:flex-row md:gap-0 md:px-[18vw]"
          >
            {PROCESS.map((p, i) => (
              <div key={p.step} className="mc-step relative md:w-[38vw] md:pr-20">
                <div className="flex items-center gap-5">
                  <span className="relative z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full border border-gold/70 bg-black text-[10px] text-gold shadow-[0_0_18px_rgba(214,178,94,0.35)]">
                    {i + 1}
                  </span>
                  <span className="h-px flex-1 bg-white/10 md:hidden" />
                </div>
                <h3 className="mt-8 font-serif text-5xl font-light text-white md:text-7xl">
                  {p.step}
                </h3>
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/45">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
