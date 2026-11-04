import type { ReactNode } from "react";

// Each card has its own surface, all from the blue and white palette.
const tones = {
  surface: "bg-surface text-ink",
  sky: "bg-primary text-on-primary",
  paper: "bg-paper-paleblue text-ink",
  ink: "bg-ink text-bg",
};

type Props = {
  title: string;
  text: string;
  tone: keyof typeof tones;
  // Pictures run off the card's bottom edge; anything with buttons stays fully inside.
  bleed?: boolean;
  // Wide cards: text on the left, picture on the right, with a larger title.
  split?: boolean;
  // Extra controls under the text.
  aside?: ReactNode;
  children: ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "title">;

// A feature card, with its picture at the bottom (or on the right when split).
export function FeatureCard({ title, text, tone, bleed = true, split = false, aside, children, className = "", ...rest }: Props) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-lg ${split ? "lg:flex-row lg:items-center" : ""} ${tones[tone]} ${className}`}
      {...rest}
    >
      <div className={`px-7 pt-8 sm:px-10 sm:pt-10 ${split ? "lg:w-[44%] lg:shrink-0 lg:py-14 lg:pl-14" : ""}`}>
        <h3
          className={
            split
              ? "font-display-tight text-h2 leading-heading tracking-heading text-balance"
              : "font-display text-h3 leading-heading font-bold tracking-tight [font-stretch:88%]"
          }
        >
          {title}
        </h3>
        <p className={split ? "mt-4 max-w-[38ch] text-lead" : "mt-2 max-w-[42ch]"}>{text}</p>
        {aside}
      </div>
      <div
        className={`mt-auto px-7 pt-8 sm:px-10 ${split ? "pb-8 sm:pb-10 lg:mt-0 lg:min-w-0 lg:flex-1 lg:py-10 lg:pr-10 lg:pl-0" : bleed ? "translate-y-6" : "pb-8 sm:pb-10"}`}
      >
        {children}
      </div>
    </article>
  );
}
