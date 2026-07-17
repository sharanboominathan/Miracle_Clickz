"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CATEGORIES, PORTFOLIO, PortfolioItem } from "@/lib/data";
import CinemaArt from "./CinemaArt";
import SectionHeading from "./SectionHeading";
import GalleryViewer from "./GalleryViewer";

function FloatingCard({
  item,
  index,
  onOpen,
}: {
  item: PortfolioItem;
  index: number;
  onOpen: () => void;
}) {
  const card = useRef<HTMLButtonElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion()) return;
    const el = card.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(inner.current, {
      rotateY: px * 14,
      rotateX: -py * 12,
      z: 40,
      duration: 0.6,
      ease: "power3.out",
    });
    gsap.to(el.querySelector(".mc-sheen"), {
      opacity: 0.5,
      x: px * 80,
      y: py * 80,
      duration: 0.6,
    });
  };
  const onLeave = () => {
    gsap.to(inner.current, {
      rotateY: 0,
      rotateX: 0,
      z: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to(card.current!.querySelector(".mc-sheen"), {
      opacity: 0,
      duration: 0.6,
    });
  };

  // stagger the float rhythm per card
  const offset = ["md:mt-0", "md:mt-20", "md:mt-10"][index % 3];

  return (
    <button
      ref={card}
      onClick={onOpen}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-speed={0.9 + (index % 3) * 0.12}
      className={`mc-pcard group block w-full text-left ${offset}`}
      style={{ perspective: "1100px" }}
      aria-label={`Open ${item.title} — ${item.category}`}
    >
      <div
        ref={inner}
        className="relative overflow-hidden rounded-sm transition-shadow duration-700 group-hover:shadow-[0_40px_90px_-20px_rgba(214,178,94,0.22)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <CinemaArt
            hue={item.hue}
            hue2={item.hue2}
            seed={index + 2}
            image={item.image}
            className="absolute inset-0 scale-105 transition-transform duration-[1.2s] ease-lux group-hover:scale-115"
          />
          {/* glass reflection */}
          <div
            className="mc-sheen pointer-events-none absolute -inset-1/4 opacity-0"
            style={{
              background:
                "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.14) 50%, transparent 60%)",
            }}
          />
          {/* bottom veil */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-jet/85 to-transparent" />
          {/* meta */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="translate-y-2 text-[9px] uppercase tracking-cine text-gold opacity-70 transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
              {item.category} — {item.location}
            </p>
            <h3 className="mt-2 translate-y-3 font-serif text-2xl font-light text-chalk transition-transform duration-500 ease-lux group-hover:translate-y-0 md:text-3xl">
              {item.title}
            </h3>
          </div>
          {/* view hint */}
          <div className="absolute right-5 top-5 flex h-11 w-11 scale-50 items-center justify-center rounded-full border border-gold/50 opacity-0 backdrop-blur-sm transition-all duration-500 ease-lux group-hover:scale-100 group-hover:opacity-100">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="#D6B25E" strokeWidth="1.2" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Portfolio() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>("All");
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const items =
    filter === "All"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.category === filter);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // cards drift at differing depths while scrolling
      gsap.utils.toArray<HTMLElement>(".mc-pcard").forEach((el) => {
        const speed = parseFloat(el.dataset.speed ?? "1");
        gsap.fromTo(
          el,
          { y: 60 * speed, opacity: 0, rotateX: 8 },
          {
            y: -40 * (speed - 0.8) * 5,
            opacity: 1,
            rotateX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 105%",
              end: "top 30%",
              scrub: 0.6,
            },
          }
        );
      });
    },
    { scope: root, dependencies: [filter] }
  );

  return (
    <section ref={root} id="portfolio" className="relative px-6 py-28 md:py-44 lg:px-10">
      <SectionHeading
        kicker="The Portfolio"
        title="Stories in Light"
        reveal="mask"
      />

      {/* categories */}
      <div className="mx-auto mb-14 flex max-w-4xl flex-wrap justify-center gap-2.5">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-5 py-2 text-[10px] uppercase tracking-wide2 transition-all duration-500 ease-lux ${
              filter === c
                ? "border-gold bg-gold/10 text-gold"
                : "border-white/10 text-white/45 hover:border-white/30 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {items.map((item, i) => (
          <FloatingCard
            key={item.id}
            item={item}
            index={i}
            onOpen={() => setViewerIndex(i)}
          />
        ))}
      </div>

      {viewerIndex !== null && (
        <GalleryViewer
          items={items}
          startIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </section>
  );
}
