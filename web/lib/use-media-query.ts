"use client";

import { useSyncExternalStore } from "react";

// Reads a media query without breaking hydration: the first render uses `serverValue`,
// the same as the server's HTML, and the real answer follows right after.
export function useMediaQuery(query: string, serverValue: boolean) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
