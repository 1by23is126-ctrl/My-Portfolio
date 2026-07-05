# Portfolio Hero Upgrade — PRD

## Original Problem
Targeted premium upgrade to hero section of Mrinank T C portfolio (Next.js + Framer Motion). Fix stat counters showing 0, elevate hero name with letter-by-letter entrance, ambient gold glow, subtle magnetic tilt, add background depth (noise, drifting watermark), polish supporting elements (breathing badge dot, staggered reveal, refined CTA hover). Preserve black/gold color palette, copy, and structure.

## Stack
Next.js 13.5 (pages: `app/`) · React 18 · TypeScript · Tailwind CSS · Framer Motion 12 · running via `next dev` at :3000

## Implemented (2025-12-05)
- **Bug fix — stat counters (`components/sections/about.tsx`)**: `Counter` now initializes `n` with the target `value` so DOM never renders 0 before animation. Uses `useInView` (once, 20% amount) to reliably trigger count-up. Supports `decimals` prop (CGPA renders 7.2).
- **Data (`lib/data.ts`)**: Stats updated — Projects 10+, AI integrations 5+, CGPA 7.2 (decimals: 1), Years learning 3+.
- **Hero (`components/sections/hero.tsx`)**:
  - Letter-by-letter entrance with 50ms stagger via Framer variants (`SplitLetters`).
  - Sequenced reveal: name (0.2s) → tagline (~1.05s) → subtitle (~1.2s) → buttons (~1.35s), ~150ms apart.
  - Magnetic tilt on the name wrapper using perspective(1200px) + rotateX/rotateY, max ±5deg, spring-smoothed (stiffness 60, damping 22).
  - Ambient gold radial glow behind name (`.hero-ambient-glow`) with 9s breathing loop.
  - Ghost oversized `MRINANK` watermark (`.hero-ghost-name`) with slow 22s drift + opacity shift.
  - Fixed grain/noise overlay (`.hero-noise`) at ~4.5% opacity, mix-blend-mode: overlay.
  - Availability status dot with breathing gold glow halo (`.hero-dot-glow`).
  - CTAs (`.hero-cta`): scale(1.02) + soft gold shadow glow on hover, 220ms cubic-bezier transition.
- **`app/globals.css`**: Added keyframes/utilities `hero-noise`, `hero-ambient-glow`, `hero-ghost-drift`, `hero-dot-breathe`, `hero-cta`, `hero-cta-primary/secondary` hover styles.
- **Package**: `start` script switched to `next dev -H 0.0.0.0 -p 3000` so supervisor's `yarn start` runs Next.

## Verified
- DOM inspection: initial stat spans render `10+, 5+, 7.2, 3+` (no 0). Count-up plays when About scrolls in.
- Screenshots confirm hero visuals: name letters, gold glow, ghost watermark, badge, buttons with gold shadow.

## Next Action Items
- (Nothing critical outstanding) Optionally: add analytics on CTA clicks; add real Resume PDF href.
