"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import ParticleField from "./ParticleField";

/**
 * Single source of truth for "has the intro finished, should entrance
 * animations play now". Previously this was a global `window.__mcRevealed`
 * flag + a `window` CustomEvent that Hero/Navbar each listened for
 * separately, with their own separate failsafe timers layered on top of
 * Experience's own failsafe. That meant three independent timers and two
 * independent event listeners all had to line up correctly, and if any one
 * of them was skipped (e.g. an effect ordering issue, a Strict Mode
 * remount, or a listener registered a tick too late) the affected
 * component's content stayed invisible forever with no way to tell why.
 *
 * Now there's exactly one flag (`revealed`), exactly one failsafe timer,
 * and consumers just read the context — no listener bookkeeping.
 */
const RevealContext = createContext(false);
export const useRevealed = () => useContext(RevealContext);

export default function Experience({
  children,
}: {
  children: React.ReactNode;
}) {
  const [revealed, setRevealed] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    lenis.stop(); // locked while the preloader plays

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // hard failsafe — if the preloader's onComplete is ever missed (a
    // stalled tween, a thrown error, anything), the site reveals anyway.
    // This is the ONLY timer in the whole reveal chain.
    const failsafe = window.setTimeout(() => setRevealed(true), 5000);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      window.clearTimeout(failsafe);
    };
  }, []);

  // once revealed, unlock scroll and make sure ScrollTrigger positions are
  // measured against the settled (post-preloader) layout
  useEffect(() => {
    if (!revealed) return;
    lenisRef.current?.start();
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [revealed]);

  const handleComplete = () => setRevealed(true);

  return (
    <RevealContext.Provider value={revealed}>
      <CustomCursor />
      <ParticleField />
      {!revealed && <Preloader onComplete={handleComplete} />}
      {children}
    </RevealContext.Provider>
  );
}
