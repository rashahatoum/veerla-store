"use client";
// Client island: clicking the hero logo replays the whole hero intro
// (feather, writing, sheen and the text rise). The animations themselves stay
// in CSS; this only flips <html data-intro> from "seen" back to "play".

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { INTRO_DURATION_MS } from "./intro";

type Props = {
  label: string;
  children: ReactNode;
};

export function LogoReplay({ label, children }: Props) {
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function replay(event: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const state = root.getAttribute("data-intro");
    // Ignore clicks while the intro is already running, and honour reduced motion.
    if (state === "play" || state === "pending") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.setAttribute("data-intro", "seen");
    // Force a style flush so the animations restart from their first frame.
    void event.currentTarget.offsetWidth;
    root.setAttribute("data-intro", "play");

    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      root.setAttribute("data-intro", "seen");
    }, INTRO_DURATION_MS);
  }

  return (
    <button
      type="button"
      onClick={replay}
      aria-label={label}
      className="cursor-pointer rounded-card focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-gold-300"
    >
      {children}
    </button>
  );
}
