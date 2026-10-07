"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Atmosphere from "@/components/Atmosphere";
import CinemaHUD from "@/components/CinemaHUD";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import Dealers from "@/components/Dealers";
import Products from "@/components/Products";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Areas from "@/components/Areas";
import Milestones from "@/components/Milestones";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cut from "@/components/Cut";
import { company } from "@/lib/data";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll>
      <Preloader onDone={() => setReady(true)} />
      <Atmosphere />
      <CinemaHUD />
      <Cursor />
      <Nav />

      <main>
        <Hero ready={ready} />
        <Ticker />

        <Cut n="01" label="Origin" note="Erachakulam · Nagercoil" />
        <About />

        <Cut n="02" label="Provenance" note="Manufacturer-backed supply" />
        <Dealers />

        <Cut n="03" label="Catalogue" note="Retail & wholesale" />
        <Products />

        <Cut n="04" label="Assurance" note="Price · Quality · Provenance" />
        <WhyUs />

        <Cut n="05" label="Method" note="Enquiry to site" />
        <Process />

        <Cut n="06" label="Territory" note="Kanyakumari district" />
        <Areas />

        <Cut n="07" label="Record" note="Meets & dealerships" />
        <Milestones />

        <Cut n="08" label="Contact" note="We reply the same day" />
        <Contact />
      </main>

      <Footer />

      {/* Persistent WhatsApp handle on mobile */}
      <a
        href={company.social.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-steel shadow-[0_8px_30px_rgba(46,127,184,0.45)] transition-transform duration-300 hover:scale-110 md:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.36c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.81 2.41a8.16 8.16 0 0 1 2.41 5.82c0 4.54-3.69 8.21-8.23 8.21z" />
        </svg>
      </a>
    </SmoothScroll>
  );
}
