"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ease } from "@/lib/tokens";
import { site } from "@/lib/site";
import { buttonClass } from "./Button";
import { MascotIcon } from "./illustrations/MascotIcon";

const links = [
  { id: "how-it-works", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "faq", label: "FAQ" },
];

const easeOut = ease.out as unknown as [number, number, number, number];
const magnet = { stiffness: 220, damping: 15, mass: 0.4 };

export function Nav() {
  const [compact, setCompact] = useState(false);
  const [folded, setFolded] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // At the very top the round line cap would show as a stray dot.
  const ringOpacity = useTransform(scrollYProgress, [0, 0.01], [0, 1]);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Reading down the page the links fold away; scrolling up, hovering or tabbing brings them back.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 24);
      if (y < window.innerHeight * 0.6) setFolded(false);
      else if (y - last > 4) setFolded(true);
      else if (last - y > 4) setFolded(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The section crossing the middle of the screen is the current one.
  useEffect(() => {
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target.id);
          else seen.delete(e.target.id);
        }
        setActive(links.find((l) => seen.has(l.id))?.id ?? null);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  // The main button leans a few pixels toward the cursor.
  const ctaX = useSpring(useMotionValue(0), magnet);
  const ctaY = useSpring(useMotionValue(0), magnet);
  const onCtaMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse" || reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    ctaX.set((e.clientX - r.left - r.width / 2) * 0.16);
    ctaY.set((e.clientY - r.top - r.height / 2) * 0.28);
  };
  const onCtaLeave = () => {
    ctaX.set(0);
    ctaY.set(0);
  };

  const highlighted = hovered ?? active;
  const showLinks = !folded || engaged;

  return (
    <MotionConfig reducedMotion="user">
      <header className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-4 sm:top-4">
        <nav
          ref={navRef}
          aria-label="Main"
          data-compact={compact}
          onPointerEnter={() => setEngaged(true)}
          onPointerLeave={() => setEngaged(false)}
          onFocusCapture={() => setEngaged(true)}
          onBlurCapture={() => setEngaged(false)}
          className="pointer-events-auto relative flex w-full items-center gap-2 rounded-pill bg-ink/75 p-1.5 text-bg shadow-[inset_0_1px_0_color-mix(in_srgb,var(--t-color-bg)_22%,transparent),inset_0_-2px_6px_color-mix(in_srgb,var(--t-color-ink)_40%,transparent),var(--t-shadow-float)] backdrop-blur-md transition-[background-color] duration-(--t-dur-ui) ease-out data-[compact=true]:bg-ink/92 md:w-auto [&_:focus-visible]:outline-bg"
        >
          <a
            href="#top"
            translate="no"
            className="group mr-auto flex min-w-0 items-center gap-2.5 pr-2 font-display text-lg font-extrabold tracking-tight [font-stretch:90%] max-[439px]:text-base max-[439px]:[font-stretch:82%] md:mr-1"
          >
            {/* The mascot on a white chip, ringed by how far down the page you are. */}
            <span className="relative flex size-12 shrink-0 items-center justify-center">
              {/* Disc and ring are one drawing with a gap between them: two touching edges looked jagged. */}
              <svg viewBox="0 0 48 48" className="absolute inset-0 size-full" shapeRendering="geometricPrecision" aria-hidden="true">
                <circle cx="24" cy="24" r="19" fill="var(--t-color-bg)" />
                <circle cx="24" cy="24" r="22.5" fill="none" stroke="var(--t-color-bg)" strokeOpacity="0.18" strokeWidth="2.5" />
                <g transform="rotate(-90 24 24)">
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="22.5"
                    fill="none"
                    stroke="var(--t-color-bg)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ pathLength: scrollYProgress, opacity: ringOpacity }}
                  />
                </g>
              </svg>
              {/* the key restarts the swing each time the current section changes */}
              <span key={active ?? "top"} className="swing-once relative group-hover:animate-[swing_var(--t-dur-swing)_var(--ease-in-out)]">
                <MascotIcon className="block h-auto w-7" />
              </span>
            </span>
            <span className="truncate">{site.name}</span>
          </a>

          {/* Folding uses grid columns, so the pill keeps its natural width and stays interruptible. */}
          <div
            className="hidden transition-[grid-template-columns,opacity] duration-300 ease-out md:grid"
            style={{ gridTemplateColumns: showLinks ? "1fr" : "0fr", opacity: showLinks ? 1 : 0 }}
          >
            <ul className="flex min-w-0 items-center overflow-hidden py-1" onPointerLeave={() => setHovered(null)}>
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={active === l.id ? "true" : undefined}
                    onPointerEnter={() => setHovered(l.id)}
                    onFocus={() => setHovered(l.id)}
                    onBlur={() => setHovered(null)}
                    className={`relative block rounded-pill px-4 py-2 text-small font-semibold whitespace-nowrap transition-colors duration-(--t-dur-hover) ${
                      highlighted === l.id ? "text-ink" : "text-bg/85"
                    }`}
                  >
                    {highlighted === l.id && (
                      <motion.span
                        layoutId="nav-highlight"
                        className="absolute inset-0 rounded-pill bg-bg shadow-clay"
                        transition={{ type: "spring", duration: 0.4, bounce: 0.22 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <motion.a
            href="#waitlist"
            style={{ x: ctaX, y: ctaY }}
            onPointerMove={onCtaMove}
            onPointerLeave={onCtaLeave}
            className={buttonClass("primary", "ml-1 min-h-10 shrink-0 px-5 text-small shadow-clay max-[439px]:px-4")}
          >
            {/* narrow phones: the short label leaves room for the name and the menu button */}
            <span className="max-[439px]:hidden">Join the waitlist</span>
            <span className="min-[440px]:hidden">Join</span>
          </motion.a>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 shrink-0 items-center justify-center rounded-pill text-bg transition-colors duration-(--t-dur-hover) hover:bg-bg/15 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <motion.path initial={false} animate={{ d: open ? "M6 6L18 18" : "M4 8L20 8" }} transition={{ duration: 0.18, ease: easeOut }} />
              <motion.path initial={false} animate={{ d: open ? "M18 6L6 18" : "M4 16L20 16" }} transition={{ duration: 0.18, ease: easeOut }} />
            </svg>
          </button>

          <AnimatePresence>
            {open && (
              <motion.ul
                id="nav-panel"
                initial={{ opacity: 0, scale: 0.96, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -6 }}
                transition={{ duration: 0.18, ease: easeOut }}
                className="absolute inset-x-0 top-full mt-2 origin-top rounded-lg bg-ink/95 p-2 shadow-float backdrop-blur-md md:hidden"
              >
                {links.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.04 + i * 0.04, ease: easeOut }}
                  >
                    <a
                      href={`#${l.id}`}
                      aria-current={active === l.id ? "true" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-md px-4 font-medium text-bg hover:bg-bg/10 aria-[current=true]:bg-bg aria-[current=true]:text-ink"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </MotionConfig>
  );
}
