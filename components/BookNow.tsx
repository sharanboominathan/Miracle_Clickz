"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "./SectionHeading";

const PACKAGES = ["Wedding", "Destination Wedding", "Pre Wedding", "Engagement", "Commercial", "Other"];
const BUDGETS = ["Under ₹1L", "₹1L – ₹3L", "₹3L – ₹5L", "₹5L – ₹10L", "₹10L+"];

export default function BookNow() {
  const root = useRef<HTMLElement>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".mc-book-panel", {
        opacity: 0,
        y: 80,
        scale: 0.97,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
      // animated border sweep
      gsap.to(".mc-book-border", {
        backgroundPosition: "200% 0",
        duration: 6,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: root }
  );

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sent) return;
    const panel = root.current!.querySelector(".mc-book-inner");
    gsap.to(panel, {
      opacity: 0,
      y: -24,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setSent(true);
        gsap.fromTo(
          ".mc-book-done",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" }
        );
      },
    });
  };

  return (
    <section ref={root} id="book" className="relative px-6 py-28 md:py-44">
      <SectionHeading kicker="Begin Your Story" title="Book Your Date" reveal="blur" />

      <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-stretch">
        {/* sample editorial photo (public/images/contact-editorial.jpg) — swap with real client imagery */}
        <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-sm md:order-none md:aspect-auto">
          <Image
            src="/images/contact-editorial.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jet via-jet/10 to-transparent" />
          <div className="pointer-events-none absolute -bottom-3 -right-3 h-full w-full rounded-sm border border-gold/20" />
        </div>

        <div className="mc-book-panel relative order-2 md:order-none">
        {/* animated gold border */}
        <div
          className="mc-book-border absolute -inset-px rounded-sm opacity-60"
          style={{
            background:
              "linear-gradient(90deg, rgba(214,178,94,0.0) 0%, rgba(214,178,94,0.55) 25%, rgba(214,178,94,0.0) 50%, rgba(214,178,94,0.55) 75%, rgba(214,178,94,0.0) 100%)",
            backgroundSize: "200% 100%",
          }}
          aria-hidden="true"
        />
        <div className="glass relative h-full rounded-sm p-8 md:p-12">
          {!sent ? (
            <form className="mc-book-inner flex flex-col gap-6" onSubmit={submit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="field">
                  <input id="bk-name" type="text" placeholder=" " required autoComplete="name" />
                  <label htmlFor="bk-name">Your Names</label>
                </div>
                <div className="field">
                  <input id="bk-email" type="email" placeholder=" " required autoComplete="email" />
                  <label htmlFor="bk-email">Email</label>
                </div>
                <div className="field">
                  <input id="bk-phone" type="tel" placeholder=" " autoComplete="tel" />
                  <label htmlFor="bk-phone">Phone / WhatsApp</label>
                </div>
                <div className="field">
                  <input id="bk-date" type="date" required aria-label="Wedding date" />
                  <label htmlFor="bk-date">Wedding Date</label>
                </div>
              </div>

              <div className="field">
                <select id="bk-package" required defaultValue="">
                  <option value="" disabled hidden />
                  {PACKAGES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <label htmlFor="bk-package">Select Package</label>
              </div>

              <div>
                <p className="mb-3 text-[10px] uppercase tracking-wide2 text-white/40">
                  Investment Range
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`rounded-full border px-5 py-2.5 text-[11px] tracking-wide transition-all duration-500 ease-lux ${
                        budget === b
                          ? "border-gold bg-gold/10 text-gold shadow-[0_0_20px_rgba(214,178,94,0.15)]"
                          : "border-white/12 text-white/50 hover:border-white/35 hover:text-white"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <textarea id="bk-msg" rows={4} placeholder=" " />
                <label htmlFor="bk-msg">Tell us your story</label>
              </div>

              <button
                type="submit"
                className="group relative mt-2 overflow-hidden rounded-full bg-gold py-4 text-[11px] uppercase tracking-cine text-jet transition-colors duration-500 hover:bg-gold-soft"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-chalk/30 to-transparent transition-transform duration-700 ease-lux group-hover:translate-x-full" />
                Reserve My Date
              </button>
              <p className="text-center text-[10px] text-white/30">
                We reply within 24 hours. Your date is held for 7 days after enquiry.
              </p>
            </form>
          ) : (
            <div className="mc-book-done flex flex-col items-center gap-5 py-14 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 shadow-[0_0_30px_rgba(214,178,94,0.3)]">
                <svg width="22" height="17" viewBox="0 0 22 17" fill="none" aria-hidden="true">
                  <path d="M1 9l6.5 6.5L21 1" stroke="#D6B25E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <h3 className="font-serif text-3xl font-light">Your story has begun.</h3>
              <p className="max-w-sm text-sm text-white/50">
                Thank you — we’ve received your enquiry and will write back within 24 hours with availability and a curated proposal.
              </p>
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
