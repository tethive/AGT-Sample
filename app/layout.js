import { Archivo, Sora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/* Display: heavy, near-normal-width grotesk — the weight of a poster rather
   than the squeeze of a condensed face. */
const display = Archivo({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-display",
  display: "swap",
});

/* Body: geometric, slightly editorial, more character than a neutral UI sans */
const sans = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

/* Labels and data: technical, drafting-table */
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://ambikagt.com"),
  title: "Ambika Global Traders — Building Materials, Nagercoil",
  description:
    "Cement, TMT bars, M-sand, bricks, blocks, paints and waterproofing. Authorised dealer supply at retail and wholesale, across Kanyakumari district since 2021.",
  keywords: [
    "building materials Nagercoil",
    "cement dealer Kanyakumari",
    "TMT bars Nagercoil",
    "M-sand supplier",
    "Ambika Global Traders",
  ],
  openGraph: {
    title: "Ambika Global Traders — Building Materials, Nagercoil",
    description:
      "Cement, steel, sand and stone. Retail and wholesale across Kanyakumari district.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#07090C",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
