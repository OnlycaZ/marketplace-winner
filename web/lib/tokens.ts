// Design tokens: the single source for colour, type, spacing, radii, shadows and motion.
// CSS gets them as custom properties (see tokensCss, injected in app/layout.tsx and
// mapped to Tailwind utilities in app/globals.css). Motion imports them directly.

export const color = {
  bg: "#ffffff",
  surface: "#f3f6fb",
  ink: "#0e1a2e",
  ink2: "#46526b",
  line: "#d8dfea",
  field: "#7d89a1",
  primary: "#1f44c8",
  primaryHover: "#1734a0",
  // darker than a typical red so it passes AA on the pale blue paper too (5.3:1)
  error: "#9b1c15",
  onPrimary: "#ffffff",
} as const;

// Studio papers. `text` says which text colour passes WCAG AA on that paper.
export const papers = [
  { id: "terracotta", label: "Terracotta", hex: "#b9563f", text: "light" },
  { id: "sage", label: "Sage", hex: "#a9b89b", text: "dark" },
  { id: "butter", label: "Butter", hex: "#f1db98", text: "dark" },
  { id: "paleblue", label: "Pale blue", hex: "#bcd2e8", text: "dark" },
  { id: "powder", label: "Powder pink", hex: "#ebc6c2", text: "dark" },
  { id: "charcoal", label: "Charcoal", hex: "#34363b", text: "light" },
] as const;

export type PaperId = (typeof papers)[number]["id"];

export const text = {
  display: "clamp(3.25rem, 2.1rem + 4.9vw, 7.5rem)",
  h2: "clamp(2.25rem, 1.7rem + 2.4vw, 4rem)",
  h3: "clamp(1.375rem, 1.25rem + 0.5vw, 1.75rem)",
  lead: "clamp(1.125rem, 1.05rem + 0.3vw, 1.3125rem)",
  body: "1.0625rem",
  small: "0.875rem",
} as const;

export const leading = { display: "0.92", heading: "1.05", body: "1.55" } as const;
export const tracking = { display: "-0.04em", heading: "-0.03em", tight: "-0.02em" } as const;
// Archivo width axis: narrowed for headlines, widened for the footer name.
export const fontWidth = { display: "82%", wide: "125%" } as const;

// Spacing base. Tailwind's numeric scale is built on it (p-4 = 16px).
// Allowed steps: 1 2 3 4 6 8 12 16 24 32 40.
export const spacing = "4px";

export const radius = { sm: "8px", md: "16px", lg: "28px", pill: "999px" } as const;

export const shadow = {
  card: "0 1px 2px rgb(14 26 46 / 0.05), 0 10px 30px -12px rgb(14 26 46 / 0.16)",
  float: "0 12px 36px -8px rgb(14 26 46 / 0.35)",
  press: "0 1px 2px rgb(14 26 46 / 0.2)",
  // soft 3D objects: lit from above, shaded underneath, lifted off the surface
  clay: "inset 0 2px 3px rgb(255 255 255 / 0.55), inset 0 -4px 8px rgb(14 26 46 / 0.1), 0 14px 24px -10px rgb(14 26 46 / 0.35)",
} as const;

// Motion. Durations in ms, curves as cubic-bezier control points.
export const duration = {
  press: 120,
  hover: 150,
  ui: 220,
  paper: 400,
  enter: 450,
  unroll: 700,
  cycleFade: 900,
  demoLoop: 8000,
  float: 6000,
  swing: 700,
  stagger: 60,
} as const;

export const ease = {
  out: [0.23, 1, 0.32, 1],
  inOut: [0.77, 0, 0.175, 1],
  standard: [0.25, 0.1, 0.25, 1],
} as const;

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const bezier = (p: readonly number[]) => `cubic-bezier(${p.join(", ")})`;

// Custom properties use the `--t-` prefix; globals.css maps them to Tailwind names.
export function tokensCss(): string {
  const vars: Record<string, string> = {};
  for (const [k, v] of Object.entries(color)) vars[`color-${kebab(k)}`] = v;
  for (const p of papers) vars[`paper-${p.id}`] = p.hex;
  for (const [k, v] of Object.entries(text)) vars[`text-${k}`] = v;
  for (const [k, v] of Object.entries(leading)) vars[`leading-${k}`] = v;
  for (const [k, v] of Object.entries(tracking)) vars[`tracking-${k}`] = v;
  for (const [k, v] of Object.entries(fontWidth)) vars[`width-${k}`] = v;
  for (const [k, v] of Object.entries(radius)) vars[`radius-${k}`] = v;
  for (const [k, v] of Object.entries(shadow)) vars[`shadow-${k}`] = v;
  for (const [k, v] of Object.entries(duration)) vars[`dur-${kebab(k)}`] = `${v}ms`;
  for (const [k, v] of Object.entries(ease)) vars[`ease-${kebab(k)}`] = bezier(v);
  vars.spacing = spacing;
  return `:root{${Object.entries(vars).map(([k, v]) => `--t-${k}:${v}`).join(";")}}`;
}
