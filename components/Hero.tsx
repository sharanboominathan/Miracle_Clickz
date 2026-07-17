"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, splitChars, prefersReducedMotion } from "@/lib/gsap";
import MagneticButton from "./MagneticButton";
import { useRevealed } from "./Experience";

const BOKEH = [
  { left: "12%", top: "22%", size: 90, opacity: 0.22, delay: "0s", hue: 42 },
  { left: "78%", top: "16%", size: 60, opacity: 0.18, delay: "-2s", hue: 38 },
  { left: "88%", top: "58%", size: 120, opacity: 0.14, delay: "-4s", hue: 45 },
  { left: "6%", top: "66%", size: 70, opacity: 0.16, delay: "-3s", hue: 210 },
  { left: "30%", top: "10%", size: 44, opacity: 0.2, delay: "-5s", hue: 40 },
  { left: "62%", top: "78%", size: 80, opacity: 0.15, delay: "-1.5s", hue: 350 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const revealed = useRevealed();

  // The reveal itself is a plain effect driven by a single shared
  // RevealContext (see Experience.tsx) instead of a global window flag/event.
  useEffect(() => {
    if (!revealed || prefersReducedMotion()) return;

    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .to(charsRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.3,
        stagger: 0.04,
      })
      .to(
        ".mc-hero-sub",
        { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
        "-=0.8"
      )
      .to(".mc-hero-cta", { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
      .to(".mc-hero-scroll", { opacity: 1, y: 0, duration: 0.9 }, "-=0.5");
  }, [revealed]);

  useGSAP(
    () => {
      if (titleRef.current && charsRef.current.length === 0) {
        charsRef.current = splitChars(titleRef.current);
      }

      if (!prefersReducedMotion()) {
        gsap.set(charsRef.current, { opacity: 0, y: 60, rotateX: -60 });
        gsap.set([".mc-hero-sub", ".mc-hero-cta", ".mc-hero-scroll"], {
          opacity: 0,
          y: 24,
        });
      }

      // perpetual very slow cinematic zoom
      gsap.to(bgRef.current, {
        scale: 1.18,
        duration: 26,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      // slow rotating ring pair behind the title
      gsap.to(".mc-hero-ring", {
        rotate: 360,
        duration: 90,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".mc-hero-ring-2", {
        rotate: -360,
        duration: 120,
        repeat: -1,
        ease: "none",
      });

      // scroll: text fades, scene scales
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        })
        .to(".mc-hero-content", { opacity: 0, y: -110, ease: "none" }, 0)
        .to(bgRef.current, { opacity: 0.3, ease: "none" }, 0)
        .to(".mc-hero-scroll", { opacity: 0 }, 0);
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* cinematic "footage" backdrop with very slow zoom */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        {/* sample local image (public/images/sample-hero.jpg) — swap with real footage/photo */}
        <Image
          src="/images/sample-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(110% 85% at 50% 110%, hsla(38, 68%, 45%, 0.62), transparent 58%),
              radial-gradient(75% 60% at 18% 12%, hsla(218, 55%, 38%, 0.42), transparent 62%),
              radial-gradient(65% 50% at 84% 24%, hsla(348, 48%, 34%, 0.36), transparent 60%),
              radial-gradient(50% 40% at 50% 45%, hsla(40, 40%, 30%, 0.25), transparent 70%),
              linear-gradient(180deg, #07070a 0%, #100c07 55%, #1a140b 100%)
            `,
          }}
        />
        {/* glowing horizon */}
        <div
          className="absolute inset-x-0 bottom-[24%] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 8%, rgba(232,205,140,0.7) 50%, transparent 92%)",
            boxShadow: "0 0 48px 10px rgba(214,178,94,0.35)",
          }}
        />
        <div className="light-rays" />
        {/* floating bokeh */}
        {BOKEH.map((b, i) => (
          <span
            key={i}
            className="float-slow absolute rounded-full"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              opacity: b.opacity,
              animationDelay: b.delay,
              background: `radial-gradient(circle, hsla(${b.hue}, 85%, 72%, 0.9), transparent 68%)`,
              filter: "blur(2px)",
            }}
          />
        ))}
        {/* drifting lens flare */}
        <div
          className="float-slow absolute left-[62%] top-[20%] h-64 w-64 rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(214,178,94,0.4), transparent 65%)",
            filter: "blur(14px)",
          }}
        />
      </div>

      {/* cinematic gradient overlay (kept lighter so the scene breathes) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.82) 100%)",
        }}
      />
      {/* side vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* wedding-ring motif behind the title */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <div className="mc-hero-ring h-[68vmin] w-[68vmin] rounded-full border border-gold/15" style={{ boxShadow: "0 0 60px rgba(214,178,94,0.08), inset 0 0 60px rgba(214,178,94,0.06)" }} />
        <div className="mc-hero-ring-2 absolute left-1/2 top-1/2 h-[54vmin] w-[54vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/10" />
      </div>

      <div className="mc-hero-content relative z-10 flex flex-col items-center px-6 text-center">
        <p className="mc-hero-sub mb-6 text-[10px] uppercase tracking-cine text-gold md:text-xs">
          Luxury Wedding Photography & Films
        </p>
        <h1
          ref={titleRef}
          className="font-serif text-[13vw] font-light leading-[0.95] tracking-[0.08em] text-chalk md:text-[7.5vw]"
          style={{
            perspective: "900px",
            textShadow: "0 0 80px rgba(214,178,94,0.25)",
          }}
        >
          MIRACLE CLICKZ
        </h1>
        <p className="mc-hero-sub mt-8 font-serif text-2xl font-light italic leading-snug text-chalk/80 md:text-4xl">
          Every Love Story
          <br />
          <span className="text-shimmer not-italic">Deserves a Masterpiece</span>
        </p>
        <div className="mc-hero-cta mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <MagneticButton href="#portfolio" variant="solid">
            View Portfolio
          </MagneticButton>
          <MagneticButton href="#book" chalk>
            Book Your Story
          </MagneticButton>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="mc-hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-[9px] uppercase tracking-cine text-chalk/40">
          Scroll
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-chalk/15">
          <span
            className="absolute left-0 top-0 h-4 w-px bg-gold"
            style={{ animation: "scrollhint 2s ease-in-out infinite" }}
          />
        </span>
        <style>{`@keyframes scrollhint { 0% { transform: translateY(-100%);} 100% { transform: translateY(400%);} }`}</style>
      </div>
    </section>
  );
}
