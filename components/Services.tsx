"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SERVICES } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const GLYPHS: Record<string, React.ReactNode> = {
  rings: (
    <>
      <circle cx="9" cy="13" r="6" />
      <circle cx="15" cy="13" r="6" />
      <path d="M12 4l-1.5 2.5h3L12 4z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.5 2.4 2.5 13.6 0 16M12 4c-2.5 2.4-2.5 13.6 0 16" />
    </>
  ),
  heart: <path d="M12 20s-7-4.6-9-9c-1.3-3 1-7 4.5-7C9.5 4 12 6.5 12 6.5S14.5 4 16.5 4C20 4 22.3 8 21 11c-2 4.4-9 9-9 9z" />,
  eye: (
    <>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  drone: (
    <>
      <circle cx="5" cy="5" r="2.6" />
      <circle cx="19" cy="5" r="2.6" />
      <path d="M7 7l3 3h4l3-3M12 10v4M9 19h6M12 14v5" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M7 5v14M17 5v14M3 9.5h4M3 14.5h4M17 9.5h4M17 14.5h4" />
    </>
  ),
  temple: (
    <>
      <path d="M4 20h16M5 20v-8h14v8M12 3l7 6H5l7-6z" />
      <path d="M9 20v-5h6v5" />
    </>
  ),
  signal: (
    <>
      <path d="M6 18a8.5 8.5 0 0 1 12 0M3.5 14.5a12 12 0 0 1 17 0M8.5 21a5 5 0 0 1 7 0" />
      <circle cx="12" cy="21" r="0.8" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17.5H6.5A2.5 2.5 0 0 0 4 22V4.5z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    </>
  ),
  print: (
    <>
      <rect x="6" y="3" width="12" height="5" rx="0.5" />
      <rect x="4" y="8" width="16" height="8" rx="1" />
      <rect x="7" y="13" width="10" height="8" rx="0.5" />
    </>
  ),
};

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".mc-svc", {
        opacity: 0,
        y: 70,
        rotateY: -12,
        duration: 1,
        stagger: { each: 0.08, from: "start" },
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".mc-svc-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: root }
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: px * 10,
      rotateX: -py * 10,
      y: -10,
      duration: 0.5,
      ease: "power3.out",
    });
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section ref={root} id="services" className="relative px-6 py-28 md:py-44 lg:px-10">
      <SectionHeading kicker="What We Craft" title="Services" reveal="rotate" />
      <div className="mc-svc-grid mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            data-cursor
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="mc-svc glass-gold group relative rounded-sm p-7 transition-shadow duration-700 hover:shadow-[0_30px_70px_-25px_rgba(214,178,94,0.3)]"
            style={{ transformStyle: "preserve-3d", perspective: "800px" }}
          >
            {/* hover glow */}
            <div className="pointer-events-none absolute inset-0 rounded-sm opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 0%, rgba(214,178,94,0.12), transparent 70%)",
              }}
            />
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D6B25E"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-6 opacity-80 transition-transform duration-700 ease-lux group-hover:scale-110"
              aria-hidden="true"
            >
              {GLYPHS[s.glyph]}
            </svg>
            <h3 className="font-serif text-xl font-light text-white transition-colors duration-500 group-hover:text-gold">
              {s.title}
            </h3>
            <p className="mt-3 text-[12.5px] leading-relaxed text-white/45">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
