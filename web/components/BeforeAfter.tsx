"use client";

// Before/after comparison. Drag with mouse or finger, or use the arrow keys:
// a native range input sits on top, so it works with keyboard and screen readers.
// The handle follows the input 1:1, with no animation (docs/motion-plan.md, "Cut").
import Image from "next/image";
import { useState } from "react";

type Props = { beforeSrc?: string; afterSrc?: string };

// Both sides draw the same garment frame in the same place: only the background differs,
// which is exactly the point of the comparison.
function Placeholder({ className }: { className: string }) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center p-6 ${className}`}>
      <div className="flex h-[72%] w-[64%] items-start justify-center rounded-sm border-2 border-dashed border-ink p-3 text-center text-small leading-tight font-semibold text-ink sm:w-[46%]">
        Garment photo goes here
      </div>
    </div>
  );
}

export function BeforeAfter({ beforeSrc, afterSrc }: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-surface shadow-card select-none">
      {beforeSrc ? (
        <Image src={beforeSrc} alt="Original photo" fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
      ) : (
        <Placeholder className="bg-line" />
      )}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        {afterSrc ? (
          <Image
            src={afterSrc}
            alt="Same photo with a studio paper backdrop"
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          <Placeholder className="bg-paper-paleblue" />
        )}
      </div>

      <span className="pointer-events-none absolute top-3 left-3 rounded-pill bg-ink/80 px-3 py-1 text-small font-semibold text-bg">
        Before
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-pill bg-ink/80 px-3 py-1 text-small font-semibold text-bg">
        After
      </span>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after"
        aria-valuetext={`${pos}% before, ${100 - pos}% after`}
        className="peer absolute inset-0 z-10 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-bg peer-focus-visible:[&>span]:outline-2 peer-focus-visible:[&>span]:outline-offset-2 peer-focus-visible:[&>span]:outline-primary"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill bg-bg text-ink shadow-float">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
