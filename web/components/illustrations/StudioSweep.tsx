// Demo stage: a plain wall with a clothes rail. Two layers share one viewBox, so the hangers
// can sit between them. The stage keeps the same 5:3 ratio on wide screens, so anything
// placed in % lines up with the rail. Colours come only from tokens.

const VIEWBOX = "0 0 1200 720";

type LayerProps = { className?: string };

// The wall: soft light from above, a little shade towards the floor.
export function StageWall({ className }: LayerProps) {
  return (
    <svg viewBox={VIEWBOX} preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="wall-light" cx="50%" cy="0%" r="75%">
          <stop offset="0%" stopColor="var(--t-color-bg)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--t-color-bg)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wall-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.5" stopColor="var(--t-color-ink)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--t-color-ink)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="720" fill="var(--t-paper-paleblue)" />
      <rect width="1200" height="720" fill="url(#wall-shade)" />
      <rect width="1200" height="720" fill="url(#wall-light)" />
    </svg>
  );
}

// The rail, shaded like a soft cylinder. It is thin enough to fit inside the hangers' hooks.
export function StageRail({ className }: LayerProps) {
  return (
    <svg viewBox={VIEWBOX} preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="stage-rail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--t-paper-charcoal)" stopOpacity="0.72" />
          <stop offset="0.4" stopColor="var(--t-paper-charcoal)" />
          <stop offset="1" stopColor="var(--t-color-ink)" />
        </linearGradient>
      </defs>
      <rect x="226" y="52" width="748" height="14" rx="7" fill="url(#stage-rail)" />
    </svg>
  );
}
