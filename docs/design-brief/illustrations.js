// Phase 1b illustration samples.
// One geometry per scene, rendered in two treatments so the directions are
// compared on the same subject: "cut" (cut paper) and "ink" (ink line + offset fill).
// All colours come from CSS custom properties defined in tokens.css.

const C = {
  ink: "var(--color-ink)",
  white: "var(--color-bg)",
  line: "var(--color-line)",
  terracotta: "var(--paper-terracotta)",
  sage: "var(--paper-sage)",
  butter: "var(--paper-butter)",
  paleblue: "var(--paper-paleblue)",
  powder: "var(--paper-powder)",
  charcoal: "var(--paper-charcoal)",
};

// A hanger, drawn as a detail stroke. Used instead of a garment drawing:
// illustrations never pretend to show a real product result.
const hanger = (x, y, s = 1) =>
  ({ tag: "path", detail: true, a: { d: `M${x} ${y + 8 * s} a${6 * s} ${6 * s} 0 1 1 ${6 * s} ${6 * s} v${4 * s} l${26 * s} ${16 * s} h${-64 * s} l${26 * s} ${-16 * s}` } });

const scenes = {
  sweep: {
    title: "Studio sweep",
    shapes: [
      { tag: "rect", fill: C.charcoal, a: { x: 50, y: 26, width: 220, height: 14, rx: 7 } },
      { tag: "path", fill: C.butter, a: { d: "M58 40 H262 V148 C262 182 276 198 304 206 H16 C44 198 58 182 58 148 Z" } },
      { tag: "path", fill: C.ink, opacity: 0.07, flat: true, a: { d: "M58 148 C58 182 44 198 16 206 H304 C276 198 262 182 262 148 C224 164 96 164 58 148 Z" } },
      { tag: "ellipse", fill: C.ink, opacity: 0.16, flat: true, a: { cx: 160, cy: 180, rx: 50, ry: 5 } },
      { tag: "rect", detail: true, dashed: true, a: { x: 118, y: 70, width: 84, height: 106, rx: 6 } },
      hanger(154, 92, 0.85),
      // softbox on a stand, left
      { tag: "path", detail: true, a: { d: "M38 214 L54 116 M70 214 L54 116 M54 116 V214" } },
      { tag: "path", fill: C.white, a: { d: "M24 66 L78 58 L82 112 L28 120 Z" } },
      // spot lamp, right
      { tag: "path", detail: true, a: { d: "M284 92 V214 M270 214 L284 180 L298 214" } },
      { tag: "circle", fill: C.terracotta, a: { cx: 284, cy: 74, r: 18 } },
    ],
  },
  stack: {
    title: "A batch of photos",
    shapes: [
      ...[
        { t: "translate(92 54) rotate(-11 60 75)", c: C.sage },
        { t: "translate(102 46) rotate(-3 60 75)", c: C.powder },
        { t: "translate(112 40) rotate(7 60 75)", c: C.paleblue },
      ].map(({ t, c }) => ({
        g: t,
        children: [
          { tag: "rect", fill: C.white, a: { x: 0, y: 0, width: 120, height: 150, rx: 8 } },
          { tag: "rect", fill: c, a: { x: 9, y: 9, width: 102, height: 106, rx: 4 } },
          { tag: "path", fill: C.ink, opacity: 0.07, flat: true, a: { d: "M9 88 C40 96 80 96 111 88 V115 H9 Z" } },
          hanger(54, 30, 0.6),
          { tag: "path", detail: true, a: { d: "M14 131 H62 M14 140 H40" } },
        ],
      })),
    ],
  },
  machine: {
    title: "The backdrop machine",
    shapes: [
      { tag: "rect", fill: C.charcoal, a: { x: 12, y: 172, width: 296, height: 12, rx: 6 } },
      // input photos: original background, neutral
      { tag: "rect", fill: C.white, a: { x: 26, y: 120, width: 40, height: 50, rx: 4 } },
      { tag: "rect", fill: C.line, a: { x: 31, y: 125, width: 30, height: 32, rx: 2 } },
      { tag: "rect", fill: C.white, a: { x: 72, y: 120, width: 40, height: 50, rx: 4 } },
      { tag: "rect", fill: C.line, a: { x: 77, y: 125, width: 30, height: 32, rx: 2 } },
      // machine body with paper rolls on top
      { tag: "circle", fill: C.terracotta, a: { cx: 142, cy: 76, r: 11 } },
      { tag: "circle", fill: C.sage, a: { cx: 168, cy: 76, r: 11 } },
      { tag: "circle", fill: C.butter, a: { cx: 194, cy: 76, r: 11 } },
      { tag: "rect", fill: C.paleblue, a: { x: 122, y: 86, width: 92, height: 86, rx: 10 } },
      { tag: "rect", fill: C.white, a: { x: 138, y: 104, width: 60, height: 26, rx: 13 } },
      { tag: "path", detail: true, a: { d: "M150 117 H186 M122 150 H214" } },
      // output photos: new paper backdrop
      { tag: "rect", fill: C.white, a: { x: 224, y: 120, width: 40, height: 50, rx: 4 } },
      { tag: "rect", fill: C.terracotta, a: { x: 229, y: 125, width: 30, height: 32, rx: 2 } },
      { tag: "rect", fill: C.white, a: { x: 270, y: 120, width: 40, height: 50, rx: 4 } },
      { tag: "rect", fill: C.sage, a: { x: 275, y: 125, width: 30, height: 32, rx: 2 } },
    ],
  },
};

const attrs = (a) => Object.entries(a).map(([k, v]) => `${k}="${v}"`).join(" ");

function render(shape, mode) {
  if (shape.g) {
    return `<g transform="${shape.g}">${shape.children.map((s) => render(s, mode)).join("")}</g>`;
  }
  const { tag, a } = shape;
  const w = mode === "ink" ? 2 : 1.5;
  if (shape.detail) {
    const dash = shape.dashed ? `stroke-dasharray="5 5"` : "";
    return `<${tag} ${attrs(a)} style="fill:none;stroke:${C.ink};stroke-width:${w};stroke-linecap:round;stroke-linejoin:round" ${dash}/>`;
  }
  const op = shape.opacity ?? 1;
  if (shape.flat) {
    return `<${tag} ${attrs(a)} style="fill:${shape.fill};opacity:${op}"/>`;
  }
  if (mode === "cut") {
    // cut paper: no outline, a short hard shadow lifts each piece off the page
    return `<${tag} ${attrs(a)} transform="translate(2.5 3.5)" style="fill:${C.ink};opacity:.14"/>` +
      `<${tag} ${attrs(a)} style="fill:${shape.fill}"/>`;
  }
  // ink: the fill is printed slightly off-register, the line sits on top
  return `<${tag} ${attrs(a)} transform="translate(4 3)" style="fill:${shape.fill}"/>` +
    `<${tag} ${attrs(a)} style="fill:none;stroke:${C.ink};stroke-width:${w};stroke-linejoin:round"/>`;
}

function svg(name, mode) {
  const s = scenes[name];
  const id = `grain-${name}-${mode}`;
  return `<svg viewBox="0 0 320 240" role="img" aria-label="${s.title}, ${mode === "cut" ? "cut paper" : "ink line"} style">
    <defs><filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0"/></filter></defs>
    ${s.shapes.map((sh) => render(sh, mode)).join("")}
    <rect width="320" height="240" filter="url(#${id})" opacity=".09" style="mix-blend-mode:multiply;pointer-events:none"/>
  </svg>`;
}

document.querySelectorAll("[data-illo]").forEach((el) => {
  const [name, mode] = el.dataset.illo.split(":");
  el.innerHTML = svg(name, mode);
});
