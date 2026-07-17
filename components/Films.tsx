"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { FILMS } from "@/lib/data";
import CinemaArt from "./CinemaArt";
import SectionHeading from "./SectionHeading";

function Player({ film, onClose }: { film: (typeof FILMS)[number]; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    gsap.fromTo(
      root.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
    gsap.fromTo(
      ".mc-player-stage",
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "expo.out" }
    );
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`${film.title} — cinematic player`}
      className="fixed inset-0 z-[96] flex items-center justify-center bg-jet/98 p-6"
    >
      <div className="mc-player-stage relative aspect-video w-full max-w-6xl overflow-hidden rounded-sm">
        <CinemaArt hue={film.hue} hue2={(film.hue + 180) % 360} seed={9} image={film.image} className="absolute inset-0" />
        {/* faux playback shimmer */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
            backgroundSize: "300% 100%",
            animation: "shimmer 3.5s linear infinite",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-jet/90 to-transparent p-8">
          <p className="text-[9px] uppercase tracking-cine text-gold">{film.tag} — {film.runtime}</p>
          <h3 className="mt-2 font-serif text-3xl font-light text-chalk md:text-5xl">{film.title}</h3>
          <p className="mt-3 text-xs text-chalk/40">
            Replace this placeholder stage with your hosted trailer (Vimeo / self-hosted WebM).
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Close player"
        className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-chalk/15 text-chalk/70 transition-all duration-500 hover:rotate-90 hover:border-gold/60 hover:text-gold"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
    </div>
  );
}

export default function Films() {
  const root = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState<number | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".mc-film", {
        x: 120,
        opacity: 0,
        duration: 1.1,
        stagger: 0.09,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".mc-film-row",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="films" className="relative py-28 md:py-44">
      <div className="px-6 lg:px-10">
        <SectionHeading kicker="Signature Films" title="Now Showing" reveal="scale" align="left" />
      </div>

      <div className="mc-film-row flex gap-6 overflow-x-auto px-6 pb-10 lg:px-10 [scrollbar-width:thin]">
        {FILMS.map((f, i) => (
          <button
            key={f.title}
            onClick={() => setPlaying(i)}
            className="mc-film group relative w-[70vw] flex-shrink-0 overflow-hidden rounded-sm text-left sm:w-[42vw] lg:w-[26vw]"
            aria-label={`Play ${f.title}`}
          >
            <div className="relative aspect-[2/3] overflow-hidden">
              <CinemaArt
                hue={f.hue}
                hue2={(f.hue + 160) % 360}
                seed={i + 11}
                image={f.image}
                className="absolute inset-0 transition-transform duration-[1.4s] ease-lux group-hover:scale-110"
              />
              {/* trailer-autoplay feel on hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-40"
                style={{
                  background:
                    "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.09) 50%, transparent 70%)",
                  backgroundSize: "300% 100%",
                  animation: "shimmer 2.6s linear infinite",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jet/90 via-jet/10 to-transparent" />

              {/* expanding play button */}
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <span className="absolute h-20 w-20 scale-0 rounded-full border border-gold/40 transition-transform duration-700 ease-lux group-hover:scale-100" />
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-chalk/30 backdrop-blur-sm transition-all duration-700 ease-lux group-hover:scale-125 group-hover:border-gold group-hover:bg-gold/15">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                    <path d="M1 1.5v11l10-5.5-10-5.5z" fill="#fff" className="transition-colors group-hover:fill-[#D6B25E]" />
                  </svg>
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[9px] uppercase tracking-cine text-gold/90">
                  {f.tag} — {f.runtime}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-light text-chalk md:text-3xl">
                  {f.title}
                </h3>
              </div>
            </div>
          </button>
        ))}
      </div>

      {playing !== null && (
        <Player film={FILMS[playing]} onClose={() => setPlaying(null)} />
      )}
    </section>
  );
}
