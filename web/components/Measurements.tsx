"use client";

// Live measurements card: type a number and the drawing updates on the spot.
// The starting numbers are only an example, there to show what the image looks like.
import { useId, useState } from "react";
import { Segmented } from "./Segmented";

const kinds = [
  { id: "top", label: "Top" },
  { id: "pants", label: "Pants" },
] as const;

type Kind = (typeof kinds)[number]["id"];

const fields = {
  top: [
    { id: "length", label: "Length" },
    { id: "pit", label: "Pit to pit" },
    { id: "sleeve", label: "Sleeve" },
  ],
  pants: [
    { id: "waist", label: "Waist" },
    { id: "inseam", label: "Inseam" },
    { id: "outer", label: "Length" },
  ],
} as const;

const example = { length: "68", pit: "52", sleeve: "61", waist: "41", inseam: "78", outer: "104" };
type Values = typeof example;

const formats = [
  { id: "square", label: "Square 1:1", className: "aspect-square w-full" },
  { id: "portrait", label: "Portrait 4:5", className: "aspect-[4/5] w-[86%]" },
] as const;

function Dim({ x1, y1, x2, y2, value, lx, ly }: { x1: number; y1: number; x2: number; y2: number; value: string; lx: number; ly: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--t-color-primary)" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />
      <circle cx={x1} cy={y1} r="3.5" fill="var(--t-color-primary)" />
      <circle cx={x2} cy={y2} r="3.5" fill="var(--t-color-primary)" />
      <rect x={lx - 33} y={ly - 12} width="66" height="24" rx="12" fill="var(--t-color-primary)" />
      <text x={lx} y={ly + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--t-color-on-primary)">
        {value.trim() ? `${value.slice(0, 5)} cm` : "– cm"}
      </text>
    </g>
  );
}

const shape = { fill: "var(--t-paper-paleblue)", stroke: "var(--t-color-ink)", strokeWidth: 2, strokeLinejoin: "round" } as const;

function Drawing({ kind, v }: { kind: Kind; v: Values }) {
  const summary =
    kind === "top"
      ? `Outline of a top. Length ${v.length} cm, pit to pit ${v.pit} cm, sleeve ${v.sleeve} cm.`
      : `Outline of a pair of pants. Waist ${v.waist} cm, inseam ${v.inseam} cm, length ${v.outer} cm.`;
  return (
    <svg viewBox="0 0 320 320" role="img" aria-label={summary} className="h-full w-full">
      {kind === "top" ? (
        <>
          <path d="M122 50Q160 72 198 50L246 70L292 150L256 172L232 132V288H88V132L64 172L28 150L74 70Z" {...shape} />
          <Dim x1={160} y1={66} x2={160} y2={288} value={v.length} lx={160} ly={236} />
          <Dim x1={88} y1={138} x2={232} y2={138} value={v.pit} lx={160} ly={138} />
          <Dim x1={256} y1={58} x2={305} y2={142} value={v.sleeve} lx={272} ly={36} />
        </>
      ) : (
        <>
          <path d="M104 38H224L242 104L236 298H180L164 144L148 298H92L86 104Z" {...shape} />
          <Dim x1={104} y1={20} x2={224} y2={20} value={v.waist} lx={164} ly={20} />
          <Dim x1={208} y1={144} x2={208} y2={298} value={v.inseam} lx={208} ly={222} />
          <Dim x1={60} y1={38} x2={60} y2={298} value={v.outer} lx={52} ly={168} />
        </>
      )}
    </svg>
  );
}

export function Measurements() {
  const [kind, setKind] = useState<Kind>("top");
  const [values, setValues] = useState<Values>(example);
  const [format, setFormat] = useState<(typeof formats)[number]["id"]>("portrait");
  const id = useId();
  const panel = formats.find((f) => f.id === format)!;

  return (
    <div className="grid items-start gap-7 sm:grid-cols-[minmax(0,200px)_minmax(0,1fr)] sm:gap-8">
      <div>
        <Segmented label="Type of garment" name="garment-kind" options={kinds} value={kind} onChange={setKind} />
        <div className="mt-5 grid gap-3">
          {fields[kind].map((f) => (
            <div key={f.id}>
              <label htmlFor={`${id}-${f.id}`} className="text-small font-semibold">
                {f.label}
              </label>
              <div className="relative mt-1">
                <input
                  id={`${id}-${f.id}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={300}
                  step={0.5}
                  value={values[f.id]}
                  onChange={(e) => setValues((all) => ({ ...all, [f.id]: e.target.value }))}
                  className="min-h-11 w-full rounded-md border-[1.5px] border-field bg-bg pr-10 pl-3 font-medium text-ink tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-small text-ink-2">
                  cm
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mx-auto max-w-[360px]">
          <div className={`mx-auto rounded-md bg-bg p-3 shadow-clay transition-[width] duration-(--t-dur-ui) ease-out ${panel.className}`}>
            <Drawing kind={kind} v={values} />
          </div>
        </div>
        <div role="group" aria-label="Photo format" className="mt-4 flex flex-wrap justify-center gap-2">
          {formats.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={format === f.id}
              onClick={() => setFormat(f.id)}
              className="min-h-11 rounded-pill bg-bg/60 px-4 text-small font-semibold text-ink transition-[background-color,color,transform] duration-(--t-dur-hover) hover:bg-bg active:scale-[0.97] aria-pressed:bg-ink aria-pressed:text-bg motion-reduce:active:scale-100"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
