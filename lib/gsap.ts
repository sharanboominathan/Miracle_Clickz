"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

/** Split an element's text into span-wrapped chars (free SplitText alternative). */
export function splitChars(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";
  el.setAttribute("aria-label", text);
  const spans: HTMLSpanElement[] = [];
  for (const ch of text) {
    const s = document.createElement("span");
    s.textContent = ch === " " ? " " : ch;
    s.style.display = "inline-block";
    s.style.willChange = "transform, opacity";
    s.setAttribute("aria-hidden", "true");
    el.appendChild(s);
    spans.push(s);
  }
  return spans;
}

/** Split into word spans (keeps wrapping natural). */
export function splitWords(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";
  el.setAttribute("aria-label", text);
  const spans: HTMLSpanElement[] = [];
  text.split(/\s+/).forEach((word, i, arr) => {
    const outer = document.createElement("span");
    outer.style.display = "inline-block";
    outer.style.overflow = "hidden";
    outer.style.verticalAlign = "bottom";
    const inner = document.createElement("span");
    inner.textContent = word;
    inner.style.display = "inline-block";
    inner.setAttribute("aria-hidden", "true");
    outer.appendChild(inner);
    el.appendChild(outer);
    if (i < arr.length - 1) el.appendChild(document.createTextNode(" "));
    spans.push(inner);
  });
  return spans;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
