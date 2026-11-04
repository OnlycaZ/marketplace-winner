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
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>;

// A feature card, with its picture at the bottom.
export function FeatureCard({ title, text, tone, bleed = true, children, className = "", ...rest }: Props) {
  return (
    <article className={`flex flex-col overflow-hidden rounded-lg ${tones[tone]} ${className}`} {...rest}>
      <div className="px-7 pt-8 sm:px-10 sm:pt-10">
        <h3 className="font-display text-h3 leading-heading font-bold tracking-tight [font-stretch:88%]">{title}</h3>
        <p className="mt-2 max-w-[42ch]">{text}</p>
      </div>
      <div className={`mt-auto px-7 pt-8 sm:px-10 ${bleed ? "translate-y-6" : "pb-8 sm:pb-10"}`}>{children}</div>
    </article>
  );
}
