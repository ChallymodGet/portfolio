"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const TOOTH_COUNT = 14;

function teethPath(pointUp: boolean) {
  const width = 560;
  const toothW = width / TOOTH_COUNT;
  const tip = pointUp ? 6 : 42;
  const base = pointUp ? 28 : 20;

  let d = pointUp ? `M0,48 L0,${base}` : `M0,0 L0,${base}`;

  for (let i = 0; i < TOOTH_COUNT; i++) {
    const x0 = i * toothW;
    const mid = x0 + toothW / 2;
    const x1 = x0 + toothW;
    d += pointUp
      ? ` L${mid},${tip} L${x1},${base}`
      : ` L${mid},${tip} L${x1},${base}`;
  }

  d += pointUp ? ` L${width},48 Z` : ` L${width},0 Z`;
  return { d, width };
}

const BOTTOM_TEETH = teethPath(true);
const TOP_TEETH = teethPath(false);

export default function ChewScrollEffect() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrowViewport = window.matchMedia("(max-width: 1023px)").matches;

    if (coarsePointer || reducedMotion || narrowViewport) {
      return;
    }

    enabledRef.current = true;

    const bottom = { chew: 0, chomp: 1 };
    const top = { chew: 0, chomp: 1 };
    let lastY = window.scrollY;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const toBottomChew = gsap.quickTo(bottom, "chew", { duration: 0.28, ease: "power2.out" });
    const toTopChew = gsap.quickTo(top, "chew", { duration: 0.28, ease: "power2.out" });
    const toBottomChomp = gsap.quickTo(bottom, "chomp", { duration: 0.12, ease: "power2.out" });
    const toTopChomp = gsap.quickTo(top, "chomp", { duration: 0.12, ease: "power2.out" });

    const tick = () => {
      if (!enabledRef.current) return;

      const y = window.scrollY;
      const delta = y - lastY;

      if (Math.abs(delta) > 0.25) {
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(relax, 140);

        const impulse = Math.min(Math.abs(delta) * 0.012, 0.22);

        if (delta > 0) {
          toBottomChew(Math.min(1, bottom.chew + impulse));
          toTopChew(Math.max(0, top.chew - impulse * 0.85));
          toBottomChomp(1.06);
          gsap.delayedCall(0.1, () => toBottomChomp(1));
        } else {
          toTopChew(Math.min(1, top.chew + impulse));
          toBottomChew(Math.max(0, bottom.chew - impulse * 0.85));
          toTopChomp(1.06);
          gsap.delayedCall(0.1, () => toTopChomp(1));
        }
      }

      lastY = y;

      const bottomEl = bottomRef.current;
      const topEl = topRef.current;

      if (bottomEl) {
        bottomEl.style.transform = `translate3d(0, ${100 - bottom.chew * 100}%, 0) scaleY(${bottom.chomp})`;
        bottomEl.style.opacity = String(0.35 + bottom.chew * 0.65);
      }
      if (topEl) {
        topEl.style.transform = `translate3d(0, ${-100 + top.chew * 100}%, 0) scaleY(${top.chomp})`;
        topEl.style.opacity = String(0.35 + top.chew * 0.65);
      }
    };

    const relax = () => {
      toBottomChew(0);
      toTopChew(0);
      toBottomChomp(1);
      toTopChomp(1);
    };

    gsap.ticker.add(tick);

    return () => {
      enabledRef.current = false;
      gsap.ticker.remove(tick);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return (
    <>
      <div
        ref={bottomRef}
        aria-hidden
        className="chew-scroll chew-scroll-bottom pointer-events-none fixed inset-x-0 bottom-0 z-[9996] origin-bottom"
        style={{ transform: "translate3d(0, 100%, 0)", opacity: 0 }}
      >
        <svg
          viewBox={`0 0 ${BOTTOM_TEETH.width} 48`}
          preserveAspectRatio="none"
          className="chew-scroll-teeth h-12 w-full sm:h-14"
        >
          <path d={BOTTOM_TEETH.d} fill="var(--accent-green)" />
        </svg>
        <div className="h-6 w-full bg-background sm:h-8" />
      </div>

      <div
        ref={topRef}
        aria-hidden
        className="chew-scroll chew-scroll-top pointer-events-none fixed inset-x-0 top-0 z-[9996] origin-top"
        style={{ transform: "translate3d(0, -100%, 0)", opacity: 0 }}
      >
        <div className="h-6 w-full bg-background sm:h-8" />
        <svg
          viewBox={`0 0 ${TOP_TEETH.width} 48`}
          preserveAspectRatio="none"
          className="chew-scroll-teeth h-12 w-full sm:h-14"
        >
          <path d={TOP_TEETH.d} fill="var(--accent-green)" />
        </svg>
      </div>
    </>
  );
}
