"use client";

import { useEffect, useRef } from "react";
import { initGsap } from "@/lib/anim";

/**
 * The air in the room: drifting dust motes caught in light, plus two slow
 * light-leak blooms. Fixed behind the content, never interactive.
 */
export default function Atmosphere() {
  const canvas = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = initGsap();
    const cv = canvas.current;
    const ctx = cv.getContext("2d", { alpha: true });

    let w = 0;
    let h = 0;
    let dpr = 1;
    let motes = [];

    const COUNT = window.innerWidth < 768 ? 45 : 110;

    const seed = () => {
      motes = Array.from({ length: COUNT }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: 0.35 + Math.random() * 1.15,
        // Mostly rising, with a lazy sideways drift
        vy: -(0.012 + Math.random() * 0.045),
        vx: (Math.random() - 0.5) * 0.022,
        a: 0.05 + Math.random() * 0.22,
        // Each mote breathes at its own rate
        tw: 0.4 + Math.random() * 1.6,
        ph: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    seed();

    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      for (const m of motes) {
        m.x += m.vx * 0.004;
        m.y += m.vy * 0.004;

        if (m.y < -0.05) {
          m.y = 1.05;
          m.x = Math.random();
        }
        if (m.x < -0.05) m.x = 1.05;
        if (m.x > 1.05) m.x = -0.05;

        const twinkle = 0.55 + 0.45 * Math.sin(t * m.tw + m.ph);
        const px = m.x * w;
        const py = m.y * h;

        // A tight halo keeps these reading as dust, not as bokeh on a dirty lens
        const halo = m.r * 2.6;
        const g = ctx.createRadialGradient(px, py, 0, px, py, halo);
        g.addColorStop(0, `rgba(205,228,248,${m.a * twinkle})`);
        g.addColorStop(0.45, `rgba(205,228,248,${m.a * twinkle * 0.35})`);
        g.addColorStop(1, "rgba(205,228,248,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, halo, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    gsap.ticker.add(draw);
    window.addEventListener("resize", resize);

    return () => {
      gsap.ticker.remove(draw);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[44]" aria-hidden>
      <canvas ref={canvas} className="absolute inset-0 mix-blend-screen" />

      {/* Slow light leaks — the bloom of an off-camera source */}
      <div className="leak leak-a" />
      <div className="leak leak-b" />
    </div>
  );
}
