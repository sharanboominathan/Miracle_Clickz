"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = ring.current!;
    const d = dot.current!;

    const rx = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3.out" });
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
      gsap.to([r, d], { opacity: 1, duration: 0.3, overwrite: "auto" });
    };

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(
        "a, button, [data-cursor], input, select, textarea, [role='button']"
      );
      gsap.to(r, {
        scale: t ? 2.1 : 1,
        borderColor: t ? "rgba(214,178,94,0.9)" : "rgba(214,178,94,0.55)",
        backgroundColor: t ? "rgba(214,178,94,0.08)" : "rgba(214,178,94,0)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(d, { scale: t ? 0 : 1, duration: 0.25 });
    };

    const leave = () => gsap.to([r, d], { opacity: 0, duration: 0.3 });

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden md:block" aria-hidden="true">
      <div
        ref={ring}
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full border opacity-0"
        style={{
          borderColor: "rgba(214,178,94,0.55)",
          boxShadow: "0 0 18px rgba(214,178,94,0.25)",
        }}
      />
      <div
        ref={dot}
        className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-gold opacity-0"
        style={{ boxShadow: "0 0 8px rgba(214,178,94,0.8)" }}
      />
    </div>
  );
}
