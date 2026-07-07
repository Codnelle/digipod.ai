'use client';
import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect users who ask for reduced motion — skip smoothing entirely.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.1,            // higher = snappier, lower = floatier (0.08–0.12 is a nice range)
      duration: 1.1,        // used for programmatic scrollTo
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Drive Lenis with the browser's own frame loop.
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Make in-page anchor links (#features, #pricing, #reviews) scroll smoothly.
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -90 }); // -90 clears the fixed navbar
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', onAnchorClick);
      lenis.destroy();
    };
  }, []);

  // No transformed container — just render children so `fixed`/`sticky` keep working.
  return <>{children}</>;
}