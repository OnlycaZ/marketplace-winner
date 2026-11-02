// The three "How it works" steps, in the cut-paper style.
import { Cut, ink, line, neutral, paper, Print, white } from "./cut";

const svgProps = { viewBox: "0 0 360 240", className: "w-full", "aria-hidden": true } as const;

// 1. Upload: original photos drop into the upload tray.
export function StepUpload() {
  return (
    <svg {...svgProps}>
      <g transform="translate(92 30) rotate(-10 45 60)">
        <Print w={90} h={116} backdrop={neutral} />
      </g>
      <g transform="translate(178 22) rotate(8 45 60)">
        <Print w={90} h={116} backdrop={neutral} />
      </g>
      <g transform="translate(135 44)">
        <Print w={90} h={116} backdrop={neutral} />
      </g>
      <Cut fill={paper("paleblue")}>
        <path d="M60 150 H300 L284 214 Q282 222 274 222 H86 Q78 222 76 214 Z" />
      </Cut>
      <path d="M152 186 H208" style={line} />
    </svg>
  );
}

// 2. Pick a backdrop: paper rolls on a rail, one pulled down.
export function StepBackdrop() {
  const rolls = [
    { id: "terracotta", len: 92 },
    { id: "sage", len: 92 },
    { id: "butter", len: 168 },
    { id: "powder", len: 92 },
    { id: "charcoal", len: 92 },
  ];
  return (
    <svg {...svgProps}>
      <Cut fill={paper("charcoal")}>
        <rect x={34} y={30} width={292} height={12} rx={6} />
      </Cut>
      {rolls.map((r, i) => {
        const x = 52 + i * 54;
        return (
          <g key={r.id}>
            <Cut fill={paper(r.id)}>
              <rect x={x} y={42} width={40} height={r.len} rx={3} />
            </Cut>
            <Cut fill={paper(r.id)}>
              <rect x={x - 3} y={36} width={46} height={18} rx={9} />
            </Cut>
          </g>
        );
      })}
    </svg>
  );
}

// 3. Check & download: an approved print and the download tray.
export function StepCheck() {
  return (
    <svg {...svgProps}>
      <g transform="translate(116 18)">
        <Print w={128} h={160} backdrop={paper("butter")} />
      </g>
      <Cut fill="var(--t-color-primary)">
        <circle cx={244} cy={40} r={24} />
      </Cut>
      <path d="M233 40 l8 8 l14 -16" style={{ ...line, stroke: white, strokeWidth: 3 }} />
      <path d="M180 190 v28 m-12 -12 l12 12 l12 -12" style={line} />
      <path d="M136 210 v14 h88 v-14" style={{ ...line, stroke: ink }} />
    </svg>
  );
}
