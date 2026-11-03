# Decisions

| Date | Decision | Why | Rejected alternative |
| --- | --- | --- | --- |
| 2026-11-03 | Start from scratch; nothing to archive | The folder only had CLAUDE.md and the prompt, no previous `web/` | Moving an old `web/` to `_archive/web-v1/` (it did not exist) |
| 2026-11-03 | Fonts: Archivo (headings, narrowed width, true italic) + Figtree (text) | The width axis gives tight, tall headlines and a very wide footer name from one family; Figtree is clearly different and friendly at text sizes | Schibsted Grotesk + Atkinson Hyperlegible Next |
| 2026-11-03 | Illustrations: "cut paper" (flat shapes, no outline, short hard shadow, 1.5px detail lines, faint grain) | Studio backdrop paper is the product's own material, so the visual world is literal | "Ink line" (2px outline with off-register fill) |
| 2026-11-03 | Stack: Next.js 16.4.4, React 19.3.0, Tailwind CSS 4, Motion 14.9.0, TypeScript 5 | Current stable versions from create-next-app; Cache Components on by default | Older Next.js 15 setup |
| 2026-11-03 | Tokens live in `web/lib/tokens.ts`, injected as `--t-*` CSS variables and mapped to Tailwind utilities in `globals.css`; Tailwind's default palette is switched off | One file feeds both CSS and Motion; components cannot reach for colours outside the tokens | A CSS-only token file (Motion would have to parse CSS strings) |
| 2026-11-03 | Page-load animation in CSS, not Motion | Starts with the HTML, no wait for JavaScript, runs off the main thread | Motion for the load sequence (first draft of the motion plan) |
| 2026-11-03 | On phones the menu shows only the name and "Join the waitlist" | The three section links don't fit in a pill at 375px; the footer repeats them | A hamburger menu (extra interaction for three links) |
| 2026-11-03 | No small decorative texts: removed the line above the hero title and the dotted trust line under the buttons | The user finds them typical of AI-generated pages | Keeping "For second-hand marketplace sellers" and "Garment untouched · Batch upload · You post the listings" from the first brief |
| 2026-11-03 | Critique fixes: removed copy that promised undecided things ("as many as you like", "we'll write once", a promise about the photo-storage answer); white focus ring inside the dark menu; short "Join" label under 380px | CLAUDE.md forbids promising undecided limits or policies; blue focus on the dark pill was only 2.3:1; the menu wrapped at 320px | Keeping the original copy |
| 2026-11-03 | Error red darkened to `#9B1C15` | The first red was 4.2:1 on the pale blue waitlist card, below AA | Moving the form onto white |
| 2026-11-03 | Phase 4 checks run in the app's built-in browser, not Playwright | The webapp-testing skill needs Playwright installed (a new dependency); the built-in browser covered screenshots, keyboard, slider, accordion and form | Installing Playwright for Python |
| 2026-11-03 | Impeccable's bundled detector was not run | Its launcher downloads an executable on first run; the owner asked for no install scripts | Running the detector |
| 2026-11-03 | Sentence case for headings and buttons, despite the Vercel guideline preferring Title Case | Matches the plain, conversational tone chosen for the page | Title Case |
| 2026-11-04 | Illustration style moves from cut paper to 3D cartoon images, everywhere on the page | Owner wants a more 3D, playful page; one style keeps it consistent | Keeping SVG cut paper below the hero |
| 2026-11-04 | The promise stays studio paper, not styled scenes | Wood floors and added props would sell a different product than the one the site and CLAUDE.md describe | "Better scenes" from the prototype |
| 2026-11-04 | Hero has no sky or clouds | The blue-sky-and-clouds composition is too close to Rewinder's hero | Using `sky.webp` as is |
| 2026-11-04 | Hero demo uses one jeans cut-out on top of both states | In the prototype the jeans were about 30% brighter in the "after" image, which contradicts the rule that garment pixels never change | Crossfading the two prototype images |
| 2026-11-04 | No Three.js: 3D look comes from images, CSS and Motion | No new dependency, small download, works on phones | A real-time 3D scene |
| 2026-11-03 | Primary blue `#1F44C8` (cobalt ink), white text on it 7.7:1 | Deeper than Rewinder's sky blue, less electric than Droppy's; sits well next to the paper colours | Brighter, saturated blues close to the references |
