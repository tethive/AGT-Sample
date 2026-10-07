"use client";

import { useEffect, useRef, useState } from "react";
import Media from "@/components/Media";
import { initGsap, splitChars } from "@/lib/anim";
import { company, products } from "@/lib/data";

const SERVICES = [
  "Cement",
  "TMT bars & rings",
  "M-sand / P-sand",
  "Bricks & blocks",
  "Paints & waterproofing",
  "Doors, windows & hardware",
  "Full bill of materials",
];

export default function Contact() {
  const root = useRef(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: SERVICES[0],
    message: "",
  });

  useEffect(() => {
    const { gsap } = initGsap();
    const ctx = gsap.context(() => {
      /* Headline detonates character by character */
      const head = root.current.querySelectorAll("[data-chars]");
      head.forEach((h) => {
        const chars = splitChars(h);
        gsap.fromTo(
          chars,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.025,
            scrollTrigger: { trigger: h, start: "top 85%" },
          }
        );
      });

      gsap.fromTo(
        ".ct-field",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".ct-form", start: "top 82%" },
        }
      );

      gsap.fromTo(
        ".ct-media",
        { scale: 1.25 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  /* No backend on a static front end — hand the enquiry to WhatsApp, prefilled. */
  const submit = (e) => {
    e.preventDefault();
    const text = [
      `Enquiry from the website`,
      ``,
      `Name: ${form.name || "—"}`,
      `Phone: ${form.phone || "—"}`,
      `Email: ${form.email || "—"}`,
      `Looking for: ${form.service}`,
      ``,
      form.message || "",
    ].join("\n");
    window.open(
      `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );
  };

  const field =
    "ct-field w-full border-b border-bone/15 bg-transparent px-0 py-4 text-[15px] text-bone placeholder:text-bone-500/60 outline-none transition-colors focus:border-steel";

  return (
    <section id="contact" ref={root} className="relative overflow-hidden bg-ink">
      {/* Backdrop */}
      <div className="absolute inset-0">
        <Media
          src="/img/cta.webp"
          alt=""
          sizes="100vw"
          scrim={false}
          className="ct-media absolute inset-0"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,12,0.92)_0%,rgba(7,9,12,0.78)_45%,rgba(7,9,12,0.97)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_20%,rgba(46,127,184,0.2)_0%,transparent_60%)]" />

        {/* The finale gets the full rig: rays and a flare off frame */}
        <div className="rays" />
        <div className="flare flare-core" style={{ top: "8%", right: "12%" }} />
        <div className="flare flare-streak" style={{ top: "18%", right: "-8%" }} />
      </div>

      <div className="relative mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-36">
        {/* ---------- Headline ---------- */}
        <div className="mb-16 md:mb-24">
          <p className="eyebrow mb-6">Interested in our services?</p>
          <h2 className="display text-bone">
            <span
              data-chars
              className="block overflow-hidden text-[12.4vw] leading-[0.9] md:text-[6.4vw]"
            >
              READY TO
            </span>
            <span
              data-chars
              className="block overflow-hidden text-[12.4vw] leading-[0.9] text-steel-400 md:text-[6.4vw]"
            >
              BUILD?
            </span>
          </h2>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* ---------- Form ---------- */}
          <form onSubmit={submit} className="ct-form lg:col-span-7">
            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              <input
                className={field}
                placeholder="Your name"
                aria-label="Your name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className={field}
                placeholder="Phone number"
                aria-label="Phone number"
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <input
                className={`${field} sm:col-span-2`}
                placeholder="Email (optional)"
                aria-label="Email address, optional"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <div className="ct-field sm:col-span-2">
                <p className="eyebrow mb-4 mt-6">What do you need?</p>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, service: s })}
                      className={`rounded-full border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 ${
                        form.service === s
                          ? "border-steel bg-steel text-white"
                          : "border-bone/20 text-bone-600 hover:border-bone/50 hover:text-bone"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                className={`${field} resize-none sm:col-span-2`}
                rows={3}
                aria-label="Quantity, site location and when you need it"
                placeholder="Quantity, site location, when you need it"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <div className="ct-field mt-10 flex flex-wrap items-center gap-4">
              <button type="submit" className="btn btn-solid">
                Send on WhatsApp
              </button>
              <a href={`tel:${company.phones[1].replace(/\s/g, "")}`} className="btn btn-ghost">
                Or call {company.phones[1]}
              </a>
            </div>

            <p className="ct-field mt-5 font-mono text-[10px] leading-relaxed tracking-[0.1em] text-bone-500">
              SENDS A PREFILLED MESSAGE TO THE YARD — NOTHING IS STORED ON THIS PAGE.
            </p>
          </form>

          {/* ---------- Details ---------- */}
          <div className="lg:col-span-5">
            <div className="space-y-px border-t border-bone/10">
              <div className="border-b border-bone/10 py-6">
                <p className="eyebrow mb-3">Yard address</p>
                <p className="text-[15px] leading-relaxed text-bone">
                  {company.address.line1}
                  <br />
                  {company.address.line2}
                </p>
              </div>

              <div className="border-b border-bone/10 py-6">
                <p className="eyebrow mb-3">Call the counter</p>
                {company.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="link-sweep mr-5 inline-block text-[15px] text-bone"
                  >
                    {p}
                  </a>
                ))}
              </div>

              <div className="border-b border-bone/10 py-6">
                <p className="eyebrow mb-3">Email</p>
                <a href={`mailto:${company.email}`} className="link-sweep text-[15px] text-bone">
                  {company.email}
                </a>
              </div>

              <div className="border-b border-bone/10 py-6">
                <p className="eyebrow mb-3">Open</p>
                <p className="text-[15px] text-bone">{company.hours}</p>
              </div>

              <div className="py-6">
                <p className="eyebrow mb-4">Also stocking</p>
                <p className="text-[13px] leading-relaxed text-bone-500">
                  {products.map((p) => p.title).join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
