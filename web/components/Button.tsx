import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "inverse";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-6 font-semibold whitespace-nowrap " +
  "transition-[background-color,border-color,transform] duration-(--t-dur-hover) ease-standard " +
  "active:scale-[0.97] active:duration-(--t-dur-press) motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  outline: "border-[1.5px] border-ink text-ink hover:bg-surface",
  inverse: "bg-bg text-ink hover:bg-surface",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={buttonClass(variant, className)} {...props} />;
}
