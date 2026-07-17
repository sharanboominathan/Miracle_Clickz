"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { PortfolioItem } from "@/lib/data";
import CinemaArt from "./CinemaArt";

export default function GalleryViewer({
  items,
  startIndex,
  onClose,
}: {
  items: PortfolioItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const item = items[index];

  const animateTo = useCallback(
    (next: number, dir: 1 | -1) => {
      if (prefersReducedMotion()) {
        setIndex(next);
        return;
      }
      gsap.to(stage.current, {
        opacity: 0,
        x: -40 * dir,
        scale: 0.97,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setIndex(next);
          gsap.fromTo(
            stage.current,
            { opacity: 0, x: 40 * dir, scale: 1.04 },
            { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "expo.out" }
          );
        },
      });
    },
    []
  );

  const prev = useCallback(
    () => animateTo((index - 1 + items.length) % items.length, -1),
    [index, items.length, animateTo]
  );
  const next = useCallback(
    () => animateTo((index + 1) % items.length, 1),
    [index, items.length, animateTo]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  useEffect(() => {
    gsap.fromTo(
      root.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(
      stage.current,
      { scale: 1.08, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, ease: "expo.out" }
    );
    // slow cinematic zoom while viewing
    const zoom = gsap.to(stage.current, {
      scale: 1.045,
      duration: 9,
      ease: "none",
      repeat: -1,
      yoyo: true,
      delay: 1,
    });
    return () => {
      zoom.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — fullscreen gallery`}
      className="fixed inset-0 z-[96] flex items-center justify-center bg-jet"
    >
      {/* progress bar */}
      <div className="absolute left-0 top-0 h-px w-full bg-chalk/10">
        <div
          className="h-full bg-gold transition-all duration-700 ease-lux"
          style={{ width: `${((index + 1) / items.length) * 100}%` }}
        />
      </div>

      {/* stage */}
      <div ref={stage} className="relative h-[72vh] w-[88vw] max-w-6xl will-change-transform">
        <CinemaArt
          hue={item.hue}
          hue2={item.hue2}
          seed={index + 2}
          image={item.image}
          className="h-full w-full rounded-sm"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-jet/80 to-transparent p-8">
          <div>
            <p className="text-[9px] uppercase tracking-cine text-gold">
              {item.category} — {item.location}
            </p>
            <h3 className="mt-2 font-serif text-3xl font-light text-chalk md:text-5xl">
              {item.title}
            </h3>
          </div>
        </div>
      </div>

      {/* counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-serif text-sm tabular-nums text-chalk/50">
        {String(index + 1).padStart(2, "0")}
        <span className="mx-2 text-gold/60">/</span>
        {String(items.length).padStart(2, "0")}
      </div>

      {/* arrows */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="group absolute left-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-chalk/15 backdrop-blur-sm transition-all duration-500 hover:border-gold/60 md:left-10"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
          <path d="M17 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.2" className="text-chalk/70 transition-colors group-hover:text-gold" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="group absolute right-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-chalk/15 backdrop-blur-sm transition-all duration-500 hover:border-gold/60 md:right-10"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
          <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="1.2" className="text-chalk/70 transition-colors group-hover:text-gold" />
        </svg>
      </button>

      {/* close */}
      <button
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-chalk/15 text-chalk/70 backdrop-blur-sm transition-all duration-500 hover:rotate-90 hover:border-gold/60 hover:text-gold"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
    </div>
  );
}
