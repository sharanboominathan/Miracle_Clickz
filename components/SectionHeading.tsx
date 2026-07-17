"use client";

import { useRef } from "react";
import { gsap, useGSAP, splitWords } from "@/lib/gsap";

/**
 * Shared cinematic section heading with a per-section reveal style,
 * so no two sections enter the same way.
 */
export default function SectionHeading({
  kicker,
  title,
  reveal = "mask",
  align = "center",
}: {
  kicker: string;
  title: string;
  reveal?: "mask" | "blur" | "rotate" | "scale";
  align?: "center" | "left";
}) {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const words = titleRef.current ? splitWords(titleRef.current) : [];
      const st = {
        trigger: root.current,
        start: "top 82%",
        toggleActions: "play none none reverse",
      };

      gsap.from(".mc-kicker", {
        opacity: 0,
        letterSpacing: "0.7em",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: st,
      });
      gsap.from(".mc-kicker-line", {
        scaleX: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: st,
      });

      if (reveal === "mask") {
        gsap.from(words, {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.07,
          ease: "expo.out",
          scrollTrigger: st,
        });
      } else if (reveal === "blur") {
        gsap.from(words, {
          opacity: 0,
          filter: "blur(14px)",
          y: 20,
          duration: 1.2,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: st,
        });
      } else if (reveal === "rotate") {
        gsap.from(words, {
          opacity: 0,
          rotateX: -75,
          y: 40,
          transformOrigin: "50% 100%",
          duration: 1.1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: st,
        });
      } else {
        gsap.from(words, {
          opacity: 0,
          scale: 1.4,
          y: 10,
          duration: 1.1,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: st,
        });
      }
    },
    { scope: root }
  );

  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div ref={root} className={`mb-16 flex flex-col gap-5 md:mb-24 ${alignCls}`}>
      <div className="flex items-center gap-4">
        <span className="mc-kicker-line h-px w-10 origin-left bg-gold/60" />
        <span className="mc-kicker text-[10px] uppercase tracking-cine text-gold">
          {kicker}
        </span>
        <span className="mc-kicker-line h-px w-10 origin-left bg-gold/60" />
      </div>
      <h2
        ref={titleRef}
        className="font-serif text-4xl font-light leading-[1.08] text-white md:text-6xl lg:text-7xl"
        style={{ perspective: "700px" }}
      >
        {title}
      </h2>
    </div>
  );
}
