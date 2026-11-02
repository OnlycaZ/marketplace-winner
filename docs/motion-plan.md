# Motion plan (Phase 1c, emil-design-eng)

Rule: every animation has a reason, a duration and a curve. Anything without a clear reason is cut.
Only `transform`, `opacity`, `clip-path` and colour are animated. Hover effects only under
`@media (hover: hover) and (pointer: fine)`. Keyboard actions are never animated.

## Motion tokens

| Token | Value | Use |
| --- | --- | --- |
| `ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | entering, responding to the user |
| `ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | something moving or changing on screen |
| `ease` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | hover and colour changes |
| `dur-press` | 120ms | button press |
| `dur-hover` | 150ms | hover colour |
| `dur-ui` | 220ms | menu, accordion, form messages |
| `dur-paper` | 400ms | backdrop change after a click |
| `dur-enter` | 450ms | page-load text |
| `dur-unroll` | 700ms | paper unrolling in the hero |
| `dur-cycle-fade` | 900ms | automatic backdrop crossfade |
| `cycle-interval` | 4000ms | time each backdrop stays |

## Kept

| # | Animation | Why it exists | How often it's seen | Duration / curve | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| 1 | **Page load (the one orchestrated moment).** Small line, headline lines, subtitle, buttons and trust line rise 12px and fade in with 60ms stagger; then the studio paper unrolls from its roll (clip-path from the top) and the garment fades in with its contact shadow. Total ≈ 1.2s; the headline is readable by ~0.5s. | Introduces the studio: "the backdrop arrives, the garment stays put" | Once per visit | text 450ms `ease-out`, 60ms stagger; paper 700ms `ease-in-out`; garment 300ms `ease-out` | No movement; everything fades in together in 200ms |
| 2 | **Backdrop cycle in the scene.** The paper colour crossfades through the 6 papers; the garment never changes. | It is the product promise shown live: same garment, different backdrop | Runs while the scene is visible | each paper stays 4s, crossfade 900ms `ease-in-out` (colour only) | Doesn't start; the scene shows one paper and waits for a click |
| 3 | **Pause / play button** for #2 | Automatic motion longer than 5s needs a pause (WCAG 2.2.2) | Always visible next to the swatches | icon swap, no animation | Shown as "Play" |
| 4 | **Colour swatches.** Clicking one changes the paper and stops the cycle (the user took control). | Mini-demo: the user chooses the backdrop | Occasional | paper 400ms `ease-in-out`; selected ring 150ms `ease`; press scale 0.97, 120ms | Colour changes instantly |
| 5 | **Menu compacts after scroll** (after 24px: slightly smaller pill, denser background) | Gives more room to content, shows the page moved | Once per scroll direction | 220ms `ease-out` (transform + background opacity) | Instant switch |
| 6 | **Buttons.** Hover darkens the colour; press scales to 0.97. | Feedback: the page heard the click | Often | hover 150ms `ease`; press 120ms `ease-out` | Colour stays, no scale |
| 7 | **"Whole batches at once" card.** The stack of thumbnails fans out on hover or keyboard focus. | Shows "batch" without words | Occasional | spring, ~300ms, bounce 0.15 in; out 200ms `ease-out` | Shown already fanned, static |
| 8 | **FAQ accordion.** Answer opens, chevron rotates. | Avoids a jarring jump in the content below | Occasional | 220ms `ease-out` (height via grid rows, chevron rotate) | Opens instantly |
| 9 | **Form states.** Button text changes (Join → Joining… → result) with a short blur crossfade; the message below appears. | Shows what happened after submit | Once or twice | text 200ms `ease`, blur 2px; message 200ms `ease-out`, 4px rise | Opacity only |
| 10 | **"How it works" machine** (optional): photos go in grey and come out on coloured paper, played once when the section comes into view. | Explains the process step by step | Once | belt 2s linear, photos 300ms `ease-out` | Shows the final state |

## Cut

| Animation | Why it's cut |
| --- | --- |
| Fade-and-slide-up on every section while scrolling | No reason; it's the generic default and delays reading (we saw this on the reference sites: empty screens until things appeared) |
| Word-by-word headline reveal | On a phone the headline wasn't readable 3s after load on Rewinder |
| Animated before/after slider (auto-demo) | The slider follows the finger or mouse 1:1 and moves instantly with the keyboard; an auto-demo would fight the user |
| Ticks animating on the "Approve / Redo" card | Decoration; the static screen explains it |
| Square ↔ portrait morph on the export card | Static side-by-side shows it better |
| Parallax or movement on the giant footer name | Decoration |
| Hover lift on cards | The cards aren't clickable; a lift suggests they are |

## Implementation notes

- **CSS transitions** for buttons, menu, swatches, accordion and form: they are interruptible and run off the main thread.
- The page-load sequence (#1) is plain CSS keyframes (changed from the first draft, which used Motion): it starts with the server-rendered HTML instead of waiting for JavaScript, so the headline is never held back.
- **Motion** for the spring in the stack card (#7) and for reading the reduced-motion setting in components.
- The backdrop cycle pauses on its own when the scene is off screen or the tab is hidden (no hidden motion, no wasted battery).
- Motion tokens live in the same tokens file as colours and are read by both CSS and Motion.
