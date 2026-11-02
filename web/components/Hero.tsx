import { ButtonLink } from "./Button";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="px-4 pt-32 text-center sm:pt-36">
      <h1
        id="hero-title"
        className="font-display-tight mx-auto text-display leading-display tracking-display text-balance text-ink"
      >
        <span className="enter block" style={{ "--i": 0 } as React.CSSProperties}>
          Real clothes.
        </span>
        <span className="enter block" style={{ "--i": 1 } as React.CSSProperties}>
          Studio <em className="font-[760] italic">backgrounds.</em>
        </span>
      </h1>
      <p
        className="enter mx-auto mt-7 max-w-[54ch] text-lead text-ink-2"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        Upload a batch of photos, pick a paper backdrop, check every result and download listing-ready images. The
        garment stays exactly as you shot it.
      </p>
      <div
        className="enter mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        style={{ "--i": 3 } as React.CSSProperties}
      >
        <ButtonLink href="#waitlist">Join the waitlist</ButtonLink>
        <ButtonLink href="#how-it-works" variant="outline">
          See how it works
        </ButtonLink>
      </div>
    </section>
  );
}
