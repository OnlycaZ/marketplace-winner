// "Coming later": a garment label turning into listing text.
import { Cut, ink, line, paper, white } from "./cut";

export function LabelToText() {
  return (
    <svg viewBox="0 0 360 200" className="w-full" aria-hidden="true">
      <Cut fill={paper("butter")}>
        <path d="M40 60 H150 V150 H40 L20 105 Z" />
      </Cut>
      <circle cx={42} cy={105} r={6} style={{ fill: paper("charcoal") }} />
      <path d="M66 86 H128 M66 104 H116 M66 122 H124" style={line} />
      <path d="M170 105 H196 m-8 -8 l8 8 l-8 8" style={{ ...line, stroke: white }} />
      <Cut fill={white}>
        <rect x={214} y={40} width={126} height={130} rx={10} />
      </Cut>
      <rect x={230} y={58} width={78} height={10} rx={5} style={{ fill: ink }} />
      <path d="M230 90 H322 M230 108 H316 M230 126 H322 M230 144 H290" style={{ ...line, opacity: 0.5 }} />
    </svg>
  );
}
