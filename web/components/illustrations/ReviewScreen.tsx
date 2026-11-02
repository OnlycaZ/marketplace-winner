// "You approve every photo": a review screen with Approve and Redo under each print.
import { Cut, ink, line, paper, Print, white } from "./cut";

const items = [
  { backdrop: paper("paleblue"), approved: true },
  { backdrop: paper("terracotta"), approved: false },
];

const label = { font: "600 17px var(--font-figtree)" };

export function ReviewScreen() {
  return (
    <svg viewBox="0 0 460 300" className="w-full" aria-hidden="true">
      <Cut fill={white}>
        <rect x={20} y={16} width={420} height={330} rx={18} />
      </Cut>
      <circle cx={46} cy={40} r={5} style={{ fill: ink, opacity: 0.18 }} />
      <circle cx={64} cy={40} r={5} style={{ fill: ink, opacity: 0.18 }} />
      <circle cx={82} cy={40} r={5} style={{ fill: ink, opacity: 0.18 }} />
      {items.map((it, i) => (
        <g key={i} transform={`translate(${46 + i * 196} 62)`}>
          <Print w={172} h={176} backdrop={it.backdrop} />
          <g transform="translate(0 190)">
            <rect width={82} height={36} rx={18} style={it.approved ? { fill: "var(--t-color-primary)" } : line} />
            <text x={41} y={24} textAnchor="middle" style={{ ...label, fill: it.approved ? white : ink }}>
              Approve
            </text>
            <rect x={90} width={82} height={36} rx={18} style={!it.approved ? { fill: ink } : line} />
            <text x={131} y={24} textAnchor="middle" style={{ ...label, fill: !it.approved ? white : ink }}>
              Redo
            </text>
          </g>
        </g>
      ))}
    </svg>
  );
}
