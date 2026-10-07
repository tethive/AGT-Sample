"use client";

import { useEffect, useRef } from "react";
import Media from "@/components/Media";
import { initGsap } from "@/lib/anim";
import { whyPanels } from "@/lib/data";
import Icon from "@/lib/icons";

/**
 * Sticky stacked panels: each one pins, then the next slides over it while the
 * one beneath scales back and dims — the layered transition from the reference clips.
 */
export default function WhyUs() {
  const root = useRef(null);

  useEffect(() => {
    const { gsap } = initGsap();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray(".why-panel");

        panels.forEach((panel, i) => {
          if (i < panels.length - 1) {
            gsap.to(panel.querySelector(".why-inner"), {
              scale: 0.94,
              opacity: 0.62,
              filter: "brightness(0.72)",
              ease: "none",
              scrollTrigger: {
                trigger: panels[i + 1],
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            });
          }

          /* Content rises as the panel takes the screen */
          gsap.fromTo(
            panel.querySelectorAll(".why-rise"),
            { yPercent: 40, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.07,
              scrollTrigger: { trigger: panel, start: "top 65%" },
            }
          );

          gsap.fromTo(
            panel.querySelector(".why-media"),
            { scale: 1.25 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
            }
          );

          const strokes = panel.querySelectorAll(".why-icon [pathLength]");
          gsap.to(strokes, {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: "power2.inOut",
            stagger: 0.1,
            scrollTrigger: { trigger: panel, start: "top 60%", once: true },
          });
        });

        return () => {};
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={root} className="relative bg-ink">
      {/* Intro */}
      <div className="mx-auto max-w-[1680px] px-5 pb-16 pt-24 md:px-10 md:pb-24 md:pt-36">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">How it benefits you</p>
            <h2 className="display text-[9.4vw] leading-[0.92] text-bone md:text-[3.9vw]">
              Three reasons
              <br />
              <span className="text-steel-400">contractors stay.</span>
            </h2>
          </div>
          <p className="max-w-[44ch] self-end text-[15px] leading-relaxed text-bone-600 lg:col-span-5">
            A building material supplier is only worth the trust placed in it. These are the three
            promises we are measured against on every single load that leaves the yard.
          </p>
        </div>
      </div>

      {/* Stacked panels */}
      {whyPanels.map((p) => (
        <div key={p.n} className="why-panel sticky top-0 h-screen w-full">
          <div className="why-inner relative h-full w-full origin-center overflow-hidden">
            <Media
              src={p.img}
              alt={p.title}
              sizes="100vw"
              scrim={false}
              className="why-media absolute inset-0"
            />

            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(246,244,240,0.93)_0%,rgba(246,244,240,0.58)_44%,rgba(246,244,240,0.1)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_0%_60%,rgba(31,111,168,0.10)_0%,transparent_65%)]" />

            {/* Volumetric beams raking across the frame */}
            <div className="rays" />
            <div className="flare flare-streak" style={{ top: "34%", left: "-10%" }} />

            <div className="relative mx-auto flex h-full max-w-[1680px] items-center px-5 md:px-10">
              <div className="max-w-[46ch]">
                <span className="why-rise why-icon icon-draw mb-5 block text-steel-300">
                  <Icon name={p.icon} size={46} />
                </span>

                <p className="why-rise display text-[min(14vw,10.5vh)] leading-[0.85] text-bone/10 md:text-[min(6.6vw,11.5vh)]">
                  {p.n}
                </p>
                <h3 className="why-rise display -mt-[0.22em] text-[min(9.6vw,7.6vh)] leading-[0.92] text-bone md:text-[min(4vw,7vh)]">
                  {p.title}
                </h3>
                <p className="why-rise mt-5 text-[15px] leading-relaxed text-bone-600 md:mt-7 md:text-[17px]">
                  {p.desc}
                </p>

                <ul className="why-rise mt-6 space-y-px border-t border-bone/10 md:mt-8">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-center gap-4 border-b border-bone/10 py-3.5"
                    >
                      <span className="h-1.5 w-1.5 rotate-45 bg-steel" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
