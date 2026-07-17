"use client";

import { useRef } from "react";
import { gsap, useGSAP, splitChars } from "@/lib/gsap";

const BLADES = 8;

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const holeRef = useRef<SVGCircleElement>(null);
  const bladesRef = useRef<SVGGElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxR = Math.hypot(vw, vh) / 2 + 40;
      const midR = Math.min(vw, vh) * 0.34;

      const chars = titleRef.current ? splitChars(titleRef.current) : [];
      const counter = { v: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete,
      });

      tl.to(counter, {
        v: 100,
        duration: 2.1,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current)
            counterRef.current.textContent = String(
              Math.round(counter.v)
            ).padStart(3, "0");
        },
      })
        // shutter opens to reveal the title
        .to(holeRef.current, { attr: { r: midR }, duration: 1.4 }, "-=0.3")
        .to(
          bladesRef.current,
          { rotation: 60, scale: midR / 90, transformOrigin: "50% 50%", duration: 1.4 },
          "<"
        )
        .fromTo(
          chars,
          { opacity: 0, y: 26, rotateX: -50 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.035,
            ease: "expo.out",
          },
          "-=0.7"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, letterSpacing: "0.6em" },
          { opacity: 1, letterSpacing: "0.35em", duration: 1, ease: "power2.out" },
          "-=0.5"
        )
        .to({}, { duration: 0.7 }) // hold
        // shutter opens into the homepage
        .to([titleRef.current, subRef.current, counterRef.current], {
          opacity: 0,
          y: -30,
          duration: 0.7,
        })
        .to(holeRef.current, { attr: { r: maxR }, duration: 1.5 }, "-=0.45")
        .to(
          bladesRef.current,
          { rotation: 120, scale: maxR / 80, opacity: 0, duration: 1.5 },
          "<"
        )
        .to(root.current, { opacity: 0, duration: 0.4, ease: "none" }, "-=0.3");
    },
    { scope: root }
  );

  const bladeLines = Array.from({ length: BLADES }, (_, i) => {
    const a = (i / BLADES) * Math.PI * 2;
    const a2 = ((i + 1.25) / BLADES) * Math.PI * 2;
    return {
      x1: 500 + Math.cos(a) * 90,
      y1: 500 + Math.sin(a) * 90,
      x2: 500 + Math.cos(a2) * 240,
      y2: 500 + Math.sin(a2) * 240,
    };
  });

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-hidden="true"
    >
      {/* black sheet with an expanding iris hole */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <mask id="mc-iris">
            <rect width="100%" height="100%" fill="white" />
            <circle ref={holeRef} cx="50%" cy="50%" r="0" fill="black" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#000" mask="url(#mc-iris)" />
      </svg>

      {/* aperture blades */}
      <svg
        viewBox="0 0 1000 1000"
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2"
      >
        <g ref={bladesRef} opacity="0.9">
          {bladeLines.map((l, i) => (
            <line
              key={i}
              {...l}
              stroke="url(#mc-blade-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}
          <circle
            cx="500"
            cy="500"
            r="90"
            fill="none"
            stroke="rgba(214,178,94,0.5)"
            strokeWidth="1.5"
          />
        </g>
        <defs>
          <linearGradient id="mc-blade-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D6B25E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D6B25E" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>

      {/* identity inside the shutter */}
      <div className="relative z-10 text-center" style={{ perspective: "800px" }}>
        <h1
          ref={titleRef}
          className="font-serif text-[9vw] font-light leading-none tracking-[0.12em] text-chalk md:text-[4.5vw]"
        >
          MIRACLE CLICKZ
        </h1>
        <p
          ref={subRef}
          className="mt-4 text-[10px] uppercase tracking-cine text-gold opacity-0 md:text-xs"
        >
          Cinematic Wedding Stories
        </p>
      </div>

      <span
        ref={counterRef}
        className="absolute bottom-10 right-10 font-serif text-2xl font-light tabular-nums text-chalk/50"
      >
        000
      </span>
    </div>
  );
}
