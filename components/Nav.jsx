"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { initGsap } from "@/lib/anim";
import { company, nav, products } from "@/lib/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(true);
  const bar = useRef(null);
  const overlay = useRef(null);
  const tl = useRef(null);

  /* Hide the bar on scroll-down, reveal on scroll-up */
  useEffect(() => {
    const { gsap, ScrollTrigger } = initGsap();
    const st = ScrollTrigger.create({
      start: "top -120",
      end: 99999,
      onUpdate: (self) => {
        if (open) return;
        gsap.to(bar.current, {
          yPercent: self.direction === 1 && self.scroll() > 400 ? -130 : 0,
          duration: 0.5,
          ease: "power3.out",
        });
      },
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => st.kill();
  }, [open]);

  /**
   * The bar floats over both palettes, so it has to pick one. It carries the
   * dark scope while any `.on-dark` section is under it, and the light scope
   * otherwise — checked against the element actually beneath the bar rather
   * than against scroll positions, so it stays correct through the pins.
   */
  useEffect(() => {
    const { ScrollTrigger } = initGsap();
    const probe = () => {
      const y = (bar.current?.offsetHeight ?? 64) + 8;
      const el = document.elementFromPoint(window.innerWidth / 2, y);
      setOverDark(Boolean(el?.closest(".on-dark")));
    };
    probe();
    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: probe });
    window.addEventListener("resize", probe);
    return () => {
      st.kill();
      window.removeEventListener("resize", probe);
    };
  }, []);

  /* Build the overlay timeline once */
  useEffect(() => {
    const { gsap } = initGsap();
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(overlay.current, { pointerEvents: "auto" })
        .fromTo(
          ".ov-bg",
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power4.inOut" }
        )
        .fromTo(
          ".ov-link > span",
          { yPercent: 115, rotate: 4 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 0.85,
            ease: "power4.out",
            stagger: 0.06,
          },
          "-=0.4"
        )
        .fromTo(
          ".ov-meta",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" },
          "-=0.5"
        );
    }, overlay);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      tl.current.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current.reverse();
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      <header
        ref={bar}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
          overDark ? "on-dark" : ""
        } ${scrolled ? "border-bone/10 bg-ink/90" : "border-transparent bg-transparent"}`}
      >
        <div className="mx-auto flex max-w-[1680px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <a href="#top" className="flex items-center gap-3" aria-label={company.name}>
            <Image
              src={overDark ? "/brands/agt-logo.png" : "/brands/agt-logo-ink.png"}
              alt=""
              width={44}
              height={56}
              className="h-9 w-auto md:h-11"
              priority
            />
            <span className="hidden leading-[1.05] sm:block">
              <span className="block font-display text-[15px] tracking-[0.02em] text-bone md:text-[17px]">
                AMBIKA GLOBAL
              </span>
              <span className="block font-mono text-[9px] tracking-[0.3em] text-bone-500">
                TRADERS · EST. 2021
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.slice(1, 5).map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="link-sweep font-mono text-[11px] uppercase tracking-[0.2em] text-bone-600 transition-colors hover:text-bone"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${company.phones[1].replace(/\s/g, "")}`}
              className="btn btn-ghost hidden !px-6 !py-3 md:inline-flex"
            >
              Get a Quote
            </a>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 transition-colors hover:border-steel"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-full bg-bone transition-all duration-500 ${
                    open ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px bg-bone transition-all duration-500 ${
                    open ? "top-1/2 w-full -rotate-45" : "top-full w-3/5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Full-screen overlay menu ---------- */}
      <div
        ref={overlay}
        className="on-dark pointer-events-none fixed inset-0 z-[60]"
        aria-hidden={!open}
      >
        <div className="ov-bg absolute inset-0 bg-ink-800 [clip-path:inset(0_0_100%_0)]">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "url(/img/texture-concrete.webp)",
              backgroundSize: "cover",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-steel/10 via-transparent to-transparent" />

          <div className="relative mx-auto flex h-full max-w-[1680px] flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pt-36">
            <nav className="flex flex-col">
              {nav.map((n, i) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="ov-link group block overflow-hidden py-[0.4vh]"
                >
                  <span className="display flex items-baseline gap-4 text-[9.4vw] leading-[1] text-bone transition-colors duration-300 group-hover:text-steel-400 md:text-[5.3vw]">
                    <em className="font-mono text-[10px] not-italic tracking-[0.25em] text-bone-500 md:text-[11px]">
                      0{i + 1}
                    </em>
                    {n.label}
                  </span>
                </a>
              ))}
            </nav>

            <div className="grid gap-8 border-t border-bone/10 pt-7 md:grid-cols-3">
              <div className="ov-meta">
                <p className="eyebrow mb-3">Stocked today</p>
                <p className="text-sm leading-relaxed text-bone-600">
                  {products.slice(0, 6).map((p) => p.title).join(" · ")} and more
                </p>
              </div>
              <div className="ov-meta">
                <p className="eyebrow mb-3">Yard</p>
                <p className="text-sm leading-relaxed text-bone-600">
                  {company.address.line1}
                  <br />
                  {company.address.line2}
                </p>
              </div>
              <div className="ov-meta">
                <p className="eyebrow mb-3">Talk to us</p>
                <a
                  href={`tel:${company.phones[1].replace(/\s/g, "")}`}
                  className="link-sweep block text-sm text-bone"
                >
                  {company.phones[1]}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="link-sweep mt-1 block text-sm text-bone-600"
                >
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
