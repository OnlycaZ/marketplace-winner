// "Ready for any marketplace": the same photo exported square and portrait.
import { Cut, Hanger, ink, paper, white } from "./cut";

function Frame({ w, h, label }: { w: number; h: number; label: string }) {
  return (
    <>
      <Cut fill={white}>
        <rect width={w} height={h} rx={6} />
      </Cut>
      <rect x={9} y={9} width={w - 18} height={h - 18} rx={3} style={{ fill: paper("butter") }} />
      <path
        d={`M9 ${h * 0.68} C${w * 0.35} ${h * 0.76} ${w * 0.65} ${h * 0.76} ${w - 9} ${h * 0.68} V${h - 9} H9 Z`}
        style={{ fill: ink, opacity: 0.07 }}
      />
      <Hanger x={w / 2} y={h * 0.3} s={1.1} />
      <text x={w / 2} y={h + 32} textAnchor="middle" style={{ fill: ink, font: "700 19px var(--font-figtree)" }}>
        {label}
      </text>
    </>
  );
}

export function ExportFormats() {
  return (
    <svg viewBox="0 0 520 300" className="w-full" aria-hidden="true">
      <g transform="translate(70 70)">
        <Frame w={170} h={170} label="Square 1:1" />
      </g>
      <g transform="translate(290 34)">
        <Frame w={164} h={205} label="Portrait 4:5" />
      </g>
    </svg>
  );
}
