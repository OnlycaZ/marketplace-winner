"use client";

import { useEffect, useRef, useState } from "react";

// True while the element is on screen. Animations start on true and stop on false.
export function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

// The markup is always the finished state, so reduced motion simply skips the animation.
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
