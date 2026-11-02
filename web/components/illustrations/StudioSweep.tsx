// Hero studio: a paper backdrop hanging from a roll and curving into the floor,
// with a softbox and a spot lamp. Cut-paper style: flat shapes, no outlines,
// short hard shadows, 2px detail lines. Colours come only from tokens.
// Split into two layers that share one viewBox so the paper can animate on its own.

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

const lift = { fill: "var(--t-color-ink)", opacity: 0.14 };
const line = {
  fill: "none",
  stroke: "var(--t-color-ink)",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Roll, softbox and lamp, drawn on top of the paper.
export function SweepFixtures({ className }: LayerProps) {
  const roll = { x: 226, y: 44, width: 748, height: 30, rx: 15 };
  const softbox = "M58 196 L232 170 L248 360 L74 386 Z";
  return (
    <svg viewBox={VIEWBOX} preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <rect {...roll} transform="translate(4 6)" style={lift} />
      <rect {...roll} style={{ fill: "var(--t-paper-charcoal)" }} />

      <path d="M112 720 L156 430 M200 720 L156 430 M156 430 V720 M156 374 V430" style={line} />
      <path d={softbox} transform="translate(5 7)" style={lift} />
      <path d={softbox} style={{ fill: "var(--t-color-bg)" }} />
      <path d="M86 214 L218 194 L230 340 L98 360 Z" style={{ ...line, strokeDasharray: "2 7", opacity: 0.45 }} />

      <path d="M1082 336 V720 M1040 720 L1082 640 L1124 720" style={line} />
      <circle cx="1082" cy="292" r="50" transform="translate(5 7)" style={lift} />
      <circle cx="1082" cy="292" r="50" style={{ fill: "var(--t-paper-charcoal)" }} />
      <circle cx="1082" cy="292" r="32" style={{ fill: "var(--t-color-bg)", opacity: 0.92 }} />
    </svg>
  );
}
