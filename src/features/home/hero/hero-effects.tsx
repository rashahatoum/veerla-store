"use client";
// Client island (the only JS in the hero). Renders nothing visible; on its
// parent <section> it:
// - pauses the velvet breathing while the hero is off screen,
// - marks the logo intro as played after client-side navigations to home
//   (hard loads are handled by the inline intro script).

import { useEffect, useRef } from "react";
import { INTRO_DURATION_MS, INTRO_STORAGE_KEY } from "./intro";

export function HeroEffects() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = markerRef.current?.parentElement;
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      hero.toggleAttribute("data-offscreen", !entry.isIntersecting);
    });
    observer.observe(hero);

    let introTimer: number | undefined;
    try {
      if (!sessionStorage.getItem(INTRO_STORAGE_KEY)) {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
        introTimer = window.setTimeout(() => {
          document.documentElement.setAttribute("data-intro", "seen");
        }, INTRO_DURATION_MS);
      }
    } catch {
      // Storage unavailable: the intro may replay, which is harmless.
    }

    return () => {
      observer.disconnect();
      window.clearTimeout(introTimer);
    };
  }, []);

  return <span ref={markerRef} hidden />;
}
