"use client";

import { useEffect, useRef } from "react";
import { initGsap } from "@/lib/anim";

const REEL = [
  ["#top", "HERO"],
  ["#about", "WHO WE ARE"],
  ["#products", "CATALOGUE"],
  ["#why", "WHY AGT"],
  ["#areas", "COVERAGE"],
  ["#contact", "ENQUIRY"],
];

/* Treat the whole page as a 2:30 reel and print a scrubbing timecode. */
const RUNTIME = 150;
const timecode = (p) => {
  const total = RUNTIME * p;
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  const f = Math.floor((total % 1) * 24);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(m)}:${pad(s)}:${pad(f)}`;
};

export default function CinemaHUD() {
  const root = useRef(null);
  const tc = useRef(null);
  const label = useRef(null);
  const rail = useRef(null);
  const pct = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = initGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hud-el",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, delay: 3, stagger: 0.09, ease: "power2.out" }
      );

      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const p = self.progress;
          if (tc.current) tc.current.textContent = timecode(p);
          if (pct.current) pct.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
          if (rail.current) rail.current.style.transform = `scaleY(${p})`;

          // Name the section currently under the top third of the screen
          const mark = window.scrollY + window.innerHeight * 0.35;
          let current = REEL[0][1];
          for (const [sel, name] of REEL) {
            const el = document.querySelector(sel);
            if (el && el.getBoundingClientRect().top + window.scrollY <= mark) current = name;
          }
          if (label.current && label.current.textContent !== current) {
            label.current.textContent = current;
            gsap.fromTo(
              label.current,
              { opacity: 0, y: 6 },
              { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
            );
          }
        },
      });

      return () => st.kill();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-0 z-[55] hidden md:block"
      aria-hidden
    >
      {/* Registration marks, as on a film gate */}
      <span className="hud-el absolute left-6 top-6 h-5 w-5 border-l border-t border-[rgba(128,150,175,0.5)]" />
      <span className="hud-el absolute right-6 top-6 h-5 w-5 border-r border-t border-[rgba(128,150,175,0.5)]" />
      <span className="hud-el absolute bottom-6 left-6 h-5 w-5 border-b border-l border-[rgba(128,150,175,0.5)]" />
      <span className="hud-el absolute bottom-6 right-6 h-5 w-5 border-b border-r border-[rgba(128,150,175,0.5)]" />

      {/* Left rail: scrub position down the reel */}
      <div className="hud-el absolute left-[26px] top-1/2 h-40 w-px -translate-y-1/2 bg-[rgba(128,150,175,0.3)]">
        <div ref={rail} className="h-full w-full origin-top scale-y-0 bg-steel" />
      </div>

      {/* Bottom-left: timecode + rolling indicator */}
      <div className="hud-el absolute bottom-[26px] left-16 flex items-center gap-3">
        <span className="flex h-1.5 w-1.5 animate-[rec_2s_ease-in-out_infinite] rounded-full bg-steel" />
        <span
          ref={tc}
          className="font-mono text-[10px] tracking-[0.22em] text-[rgba(128,150,175,0.95)]"
        >
          00:00:00
        </span>
      </div>

      {/* Bottom-right: section name + progress */}
      <div className="hud-el absolute bottom-[26px] right-16 flex items-center gap-4">
        <span ref={label} className="font-mono text-[10px] tracking-[0.22em] text-[rgba(128,150,175,0.95)]">
          HERO
        </span>
        <span className="h-3 w-px bg-[rgba(128,150,175,0.45)]" />
        <span ref={pct} className="font-mono text-[10px] tracking-[0.22em] text-steel-300">
          000
        </span>
      </div>
    </div>
  );
}
