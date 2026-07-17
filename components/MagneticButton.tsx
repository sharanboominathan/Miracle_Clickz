"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  /** chalk: literal white text/border for always-dark surfaces (hero) */
  chalk?: boolean;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

export default function MagneticButton({
  children,
  variant = "ghost",
  chalk = false,
  href,
  onClick,
  type = "button",
  className = "",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion()) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * 0.3, y: y * 0.35, duration: 0.6, ease: "power3.out" });
  };
  const onLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-4 text-[11px] uppercase tracking-wide2 transition-colors duration-500 " +
    (variant === "solid"
      ? "bg-gold text-jet hover:bg-gold-soft"
      : chalk
        ? "border border-chalk/20 text-chalk hover:border-gold/70 hover:text-gold"
        : "border border-white/20 text-white hover:border-gold/70 hover:text-gold");

  const inner = (
    <>
      <span
        className={`pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent ${
          variant === "solid" || chalk ? "via-chalk/10" : "via-white/10"
        } to-transparent transition-transform duration-700 ease-lux group-hover:translate-x-full`}
      />
      <span className="relative">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`${base} ${className}`}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${className}`}
    >
      {inner}
    </button>
  );
}
