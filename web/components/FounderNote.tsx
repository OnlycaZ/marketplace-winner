// TODO(owner): replace [POZĂ], [NUME] and [TEXT] before this goes live.
// The photo goes in through next/image, with alt text that names the founder.
export function FounderNote() {
  return (
    <section aria-labelledby="founder-title" className="mx-auto mt-32 max-w-[760px] px-4 sm:mt-40">
      <h2 id="founder-title" className="sr-only">
        A note from the founder
      </h2>
      <figure className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:gap-8 sm:text-left">
        <div
          role="img"
          aria-label="[POZĂ]"
          className="flex size-28 shrink-0 items-center justify-center rounded-pill border-2 border-dashed border-field bg-surface text-small font-semibold text-ink-2"
        >
          [POZĂ]
        </div>
        <div>
          <blockquote className="text-lead">[TEXT]</blockquote>
          <figcaption className="mt-3 font-display text-h3 leading-heading font-bold tracking-tight [font-stretch:88%]">
            [NUME]
          </figcaption>
        </div>
      </figure>
    </section>
  );
}
