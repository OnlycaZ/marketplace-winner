"use client";

// A garment label that straightens inside crop marks when it comes into view: the photo is
// cropped and levelled, nothing else. The markup is the finished state.
import { useEffect, useRef } from "react";
import { bezier, duration, ease } from "@/lib/tokens";
import { prefersReducedMotion, useInView } from "@/lib/use-in-view";

const corners = [
  "top-0 left-0 border-t-[3px] border-l-[3px] rounded-tl-sm",
  "top-0 right-0 border-t-[3px] border-r-[3px] rounded-tr-sm",
  "bottom-0 left-0 border-b-[3px] border-l-[3px] rounded-bl-sm",
  "bottom-0 right-0 border-b-[3px] border-r-[3px] rounded-br-sm",
];

export function CroppedLabel() {
  const [ref, inView] = useInView<HTMLDivElement>(0.5);
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const run = label.current?.animate(
      [
        { transform: "rotate(-11deg) scale(1.08)", easing: bezier(ease.inOut) },
        { transform: "rotate(-11deg) scale(1.08)", offset: 0.3, easing: bezier(ease.out) },
        { transform: "none" },
      ],
      { duration: duration.straighten, delay: 200, fill: "both" },
    );
    return () => run?.cancel();
  }, [inView]);

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[200px] p-6">
      {corners.map((c) => (
        <span key={c} className={`absolute size-7 border-primary ${c}`} />
      ))}
      <div ref={label} className="relative flex h-full flex-col justify-center gap-2.5 rounded-md bg-paper-paleblue py-4 pr-5 pl-12 shadow-clay">
        <span className="absolute top-1/2 left-4 size-4 -translate-y-1/2 rounded-pill bg-paper-charcoal shadow-[inset_0_2px_3px_var(--t-color-ink)]" />
        <span className="h-2.5 w-full rounded-pill bg-ink" />
        <span className="h-2 w-[72%] rounded-pill bg-ink/50" />
        <span className="h-2 w-[86%] rounded-pill bg-ink/50" />
      </div>
    </div>
  );
}
