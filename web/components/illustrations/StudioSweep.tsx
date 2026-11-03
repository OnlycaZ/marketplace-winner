// Hero studio: a paper backdrop hanging from a roll and curving into the floor.
// Two layers share one viewBox so the paper can unroll on its own. The stage keeps
// the same 5:3 ratio on wide screens, so anything placed in % lines up with the roll.
// Colours come only from tokens.

const VIEWBOX = "0 0 1200 720";
const PAPER = "M250 70 H950 V420 C950 560 1010 620 1200 650 V720 H0 V650 C190 620 250 560 250 420 Z";

type LayerProps = { className?: string };

// The paper itself. Its colour comes from the --paper custom property on a parent.
export function SweepPaper({ className }: LayerProps) {
  return (
    <svg viewBox={VIEWBOX} preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <defs>
        <clipPath id="sweep-paper">
          <path d={PAPER} />
        </clipPath>
        {/* soft light from above */}
        <radialGradient id="sweep-light" cx="50%" cy="0%" r="75%">
          <stop offset="0%" stopColor="var(--t-color-bg)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--t-color-bg)" stopOpacity="0" />
        </radialGradient>
        {/* the curve where wall meets floor catches a little shade */}
        <linearGradient id="sweep-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.5" stopColor="var(--t-color-ink)" stopOpacity="0" />
          <stop offset="0.8" stopColor="var(--t-color-ink)" stopOpacity="0.09" />
          <stop offset="1" stopColor="var(--t-color-ink)" stopOpacity="0.03" />
        </linearGradient>
        <filter id="sweep-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0" />
        </filter>
      </defs>
      <path
        d={PAPER}
        style={{
          fill: "var(--paper)",
          transition: "fill var(--paper-dur, var(--t-dur-paper)) var(--t-ease-in-out)",
        }}
      />
      <g clipPath="url(#sweep-paper)">
        <rect width="1200" height="720" fill="url(#sweep-shade)" />
        <rect width="1200" height="720" fill="url(#sweep-light)" />
        <rect width="1200" height="720" filter="url(#sweep-grain)" opacity="0.1" style={{ mixBlendMode: "multiply" }} />
      </g>
    </svg>
  );
}

// The roll, shaded like a soft cylinder to match the 3D objects hanging from it.
export function SweepRoll({ className }: LayerProps) {
  return (
    <svg viewBox={VIEWBOX} preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sweep-roll" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--t-paper-charcoal)" stopOpacity="0.72" />
          <stop offset="0.4" stopColor="var(--t-paper-charcoal)" />
          <stop offset="1" stopColor="var(--t-color-ink)" />
        </linearGradient>
      </defs>
      <rect x="226" y="50" width="748" height="30" rx="15" transform="translate(0 7)" style={{ fill: "var(--t-color-ink)", opacity: 0.12 }} />
      <rect x="226" y="44" width="748" height="30" rx="15" fill="url(#sweep-roll)" />
    </svg>
  );
}
