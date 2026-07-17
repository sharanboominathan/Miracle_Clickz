"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import ThemeToggle from "./ThemeToggle";
import { useRevealed } from "./Experience";

const LINKS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Story", href: "#story" },
  { label: "Services", href: "#services" },
  { label: "Films", href: "#films" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#book" },
];

export default function Navbar() {
  const root = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const revealed = useRevealed();

  useGSAP(
    () => {
      gsap.set(root.current, { opacity: 0 });
    },
    { scope: root }
  );

  // reveal driven by the single shared RevealContext (see Experience.tsx)
  useEffect(() => {
    if (!revealed) return;
    gsap.fromTo(
      root.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.2 }
    );
  }, [revealed]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={root}
      className={`mc-header fixed inset-x-0 top-0 z-[80] transition-all duration-700 ease-lux ${
        scrolled ? "glass py-3" : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-serif text-xl tracking-[0.18em] text-white transition-colors duration-500 group-hover:text-gold">
            MIRACLE
          </span>
          <span className="text-[9px] uppercase tracking-cine text-gold">
            Clickz
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[11px] uppercase tracking-wide2 text-white/60 transition-colors duration-400 hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 ease-lux group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#book"
              className="rounded-full border border-gold/50 px-6 py-2.5 text-[10px] uppercase tracking-wide2 text-gold transition-all duration-500 hover:bg-gold hover:text-jet"
            >
              Book Now
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* mobile: theme + menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`h-px w-6 bg-white transition-all duration-500 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-white transition-all duration-500 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`glass overflow-hidden transition-all duration-700 ease-lux lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-8 py-6">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 font-serif text-2xl font-light text-white/80 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
