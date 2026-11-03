// "Coming later": a garment label turning into listing text, in soft 3D.
const lines = ["w-[92%]", "w-[84%]", "w-[92%]", "w-[60%]"];

export function LabelToText() {
  return (
    <div className="relative mx-auto flex items-center justify-center gap-5" aria-hidden="true">
      <div className="relative h-[120px] w-[138px] shrink-0 -rotate-6 rounded-md bg-paper-butter p-4 pl-11 shadow-clay">
        <span className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 rounded-pill bg-paper-charcoal shadow-[inset_0_2px_3px_var(--t-color-ink)]" />
        <span className="mt-3 block h-2 w-[90%] rounded-pill bg-ink/70" />
        <span className="mt-3 block h-2 w-[70%] rounded-pill bg-ink/70" />
        <span className="mt-3 block h-2 w-[82%] rounded-pill bg-ink/70" />
      </div>
      <svg viewBox="0 0 24 24" className="size-7 shrink-0 text-bg" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
      <div className="w-[138px] shrink-0 rotate-3 rounded-md bg-bg p-4 shadow-clay">
        <span className="block h-3 w-[70%] rounded-pill bg-ink" />
        {lines.map((w, i) => (
          <span key={i} className={`mt-2.5 block h-2 rounded-pill bg-line ${w}`} />
        ))}
      </div>
    </div>
  );
}
