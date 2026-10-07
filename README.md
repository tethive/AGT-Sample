# Ambika Global Traders — Home Page (Sample)

A single-page, animation-led concept for [ambikagt.com](https://ambikagt.com), built as a pitch
piece. Art direction: **Industrial Noir** — near-black canvas, oversized condensed display type,
cinematic graded imagery, and a steel-blue accent pulled from the existing AGT logo.

## Run it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

For a client demo, run the production build instead — animations and image loading are noticeably
smoother than in dev:

```bash
npm run build && npm start
```

## Stack

| Piece | Why |
| --- | --- |
| Next.js 14 (App Router) | Room to add About / Products / Events / Careers / Contact pages later |
| Tailwind CSS | Design tokens live in `tailwind.config.js` |
| GSAP + ScrollTrigger | Pinning, scrubbed timelines, horizontal scroll, counters |
| Lenis | Smooth scroll, synced to ScrollTrigger |
| next/font | Archivo Black (display), Sora (body), IBM Plex Mono (labels) |

## Page structure

| # | Section | Animation |
| --- | --- | --- |
| 00 | Preloader | Counter to 100, material names cycling, five panels wipe up |
| 01 | Hero | **Pinned** — three frames crossfade behind headlines that rack into focus; shutter opens on load, camera drifts with the pointer and floats handheld |
| 02 | Ticker | Film strip with sprocket perforations; marquee speeds up with scroll velocity |
| 03 | Who we are | Word-by-word text illumination on scrub, parallax image, counters |
| 04 | Authorized dealers | Two counter-running logo marquees, grayscale until hover |
| 05 | Products | **Pinned horizontal scroll** — 12 cards, each with a self-drawing icon, scanline sweep and framing brackets on hover |
| 06 | Why AGT | Three sticky panels that stack, scale back and dim as the next covers them, raked by volumetric beams |
| 07 | Process | Scroll-drawn rail with four steps and drawn-on icons |
| 08 | Coverage | Pulsing location grid over a drifting ghost wordmark |
| 09 | Milestones | Real events from the current site; frames wipe open, images parallax |
| 10 | Contact | Character-by-character headline, enquiry form, full contact block |
| 11 | Footer | Oversized wordmark, quick links, embedded map |

Chapter cuts (`components/Cut.jsx`) sit between sections as numbered slates, so the long scroll
reads as a sequence of takes rather than one continuous page.

## The cinematic layer

Three pieces carry the atmosphere, all fixed and non-interactive:

- **`Atmosphere.jsx`** — a canvas of drifting dust motes (110 on desktop, 45 on mobile, capped at
  1.5× DPR) plus two slow light-leak blooms in `screen` blend.
- **`CinemaHUD.jsx`** — film-gate registration marks, a scrub rail, a running timecode that treats
  the page as a 2:30 reel, and a live section label. Tablet and up only.
- **`globals.css`** — god rays, anamorphic lens flare, letterbox shutter, light sweeps across
  display type, scanlines, corner brackets, grain and vignette.

Icons are hand-drawn inline SVG in [`lib/icons.jsx`](lib/icons.jsx). Every path carries
`pathLength="1"`, so one `strokeDashoffset` tween draws any of them on regardless of real length.

All of it is suppressed under `prefers-reduced-motion`.

## Content

All copy, product data, brand claims, contact details and event history come from the live
ambikagt.com. Everything editable sits in [`lib/data.js`](lib/data.js) — change text there, not in
components.

Two things to confirm with the client:

- **Coverage list** (`areas` in `lib/data.js`) — the site states "across Kanyakumari district" but
  does not name towns. The twenty listed are district towns chosen for the layout; they should be
  replaced with the real delivery list.
- **Four brand logos** are carried over from the current site but were unlabelled there, so they
  appear in the dealer wall without names.

## Imagery

`public/img/` holds licence-free stock (Unsplash), pre-processed into WebP at the exact sizes the
layout needs (3.8 MB for the whole page, down from 13 MB of source JPEG). `public/brands/` holds
the dealer logos and the AGT mark from the current site.

Every content image renders through [`components/Media.jsx`](components/Media.jsx), which owns the
whole image look in one place:

- **Steel duotone** — the photograph is reduced to luminance, then shadows are lifted to deep
  ink-blue and highlights pulled to cool bone with two blend layers. Stock from a dozen unrelated
  shoots reads as one roll of film, and unlike a plain brightness cut it stays legible instead of
  crushing to black.
- **Blur-up** — each image ships a 24px inline WebP preview (generated into
  [`lib/blur.js`](lib/blur.js)), so a frame is never empty while it loads.
- **Optional hairline frame** with corner ticks, and a choice of scrim gradient.

`images.unoptimized` is on in `next.config.mjs`. The assets are already pre-sized, so Next's
on-demand optimiser had nothing to add — and on a cold cache it was queueing ~50 resize jobs on
first paint, which is why images used to arrive late. They now serve straight from `/public`.

To regenerate after swapping images:

```bash
npm i -D ffmpeg-static   # one-off, not needed to run the site
npm run images
```

[`scripts/images.mjs`](scripts/images.mjs) encodes anything in `assets-src/` into pre-sized WebP and
rebuilds `lib/blur.js`. With no `assets-src/` it just rebuilds the blur map, which is what you want
after hand-swapping a file in `public/img/`.

## Form behaviour

There is no backend. The enquiry form opens WhatsApp with a prefilled message to the yard number,
which is a genuine working path for this business. Wiring it to email or a CRM is a later step.

## Notes

- Respects `prefers-reduced-motion`: smooth scroll, pinning and scrubbed timelines are all skipped.
- Custom cursor is disabled on touch devices; a WhatsApp button appears there instead.
