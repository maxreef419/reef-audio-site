# REEF — Instrument Sans / Editorial concept

**Branch:** `design/instrument-sans-editorial-20261022`
**Status:** FOR REVIEW ONLY. No live website deployment.

Based on the desktop + mobile art-direction reference shared 22 October 2026.

## Design decisions
- **Instrument Sans** for all typography (via the existing Google Fonts CSS).
- Full-bleed red hero, bottom-left "Boutique music & sound studio" and compact studio descriptor.
- Black art-directed sections, restrained pill controls and visible white REEF wordmark.
- Home work selection: **Haval H3** full-width feature on desktop; **California Realtors**, **Adrenaline Gold**, **Haval H3** in order on mobile.
- About: architectural photograph and editorial copy. Capabilities are text-led, without gray UI cards.
- Six-logo Selected Clients grid, oversized REEF closing wordmark.
- Work archive and private reel subpages reuse the typography and black design language; existing Vimeo embeds, sound-logo playback and lightbox logic remain.

## Local review
Run `npm ci && npm run dev` from this branch, then check 1440px desktop, 390px phone, 375px phone and tablet. Mobile and desktop share source markup.

CSS is isolated in `reef-v2.css` behind the `reef-v2` body class; removal is straightforward.
All work remains on this branch until approval. **Never merge it to `main` or change GitHub Pages branch automatically.**
