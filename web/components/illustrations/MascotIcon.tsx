// The mascot redrawn as a vector for small sizes: at 30px a photo-like image goes soft,
// a drawing stays sharp on every screen. Same shape as public/assets/3d/mascot.webp.
export function MascotIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 56" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mascot-icon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="color-mix(in srgb, var(--t-color-primary) 78%, var(--t-color-bg))" />
          <stop offset="1" stopColor="var(--t-color-primary)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#mascot-icon)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24.5 11.5a7.5 7.5 0 1 1 12.5 5.6c-3 2.6-5 4.4-5 8.4" />
        <path d="M32 25.5 7 44.5c-2.4 2-1.4 6 2.4 6h45.2c3.8 0 4.800-4 2.400-6Z" />
      </g>
      <path d="M32 25.500 13.500 39.500h37Z" fill="url(#mascot-icon)" stroke="url(#mascot-icon)" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="26" cy="33.500" r="4" fill="var(--t-color-bg)" />
      <circle cx="38" cy="33.500" r="4" fill="var(--t-color-bg)" />
      <circle cx="26.500" cy="33.500" r="2.300" fill="var(--t-color-ink)" />
      <circle cx="38.500" cy="33.500" r="2.300" fill="var(--t-color-ink)" />
    </svg>
  );
}
