# Changelog

All notable changes to **NOOKORA** will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-14

### Added
- **Core Architecture & Brand**:
  - Implemented the Google Stitch *Nocturne Atelier* dark luxury design system.
  - Formulated comprehensive documentation: `PRD.md`, `DESIGN.md`, `ARCHITECTURE.md`, `AGENTS.md`, and `README.md`.
  - Configured Next.js 14 App Router, TypeScript, and Tailwind CSS with custom hairline borders and atmospheric glows.
- **Editorial Homepage (`/`)**:
  - 12 full content sections with fluid responsive layout from 360px to 1920px.
  - Interactive procedural 3D Bedroom Transformation Hero using Three.js and React Three Fiber with 5-stage progression timeline.
  - Interactive Before-and-After spatial comparison slider.
  - Budget-tier breakdown cards (Under ₹2k, Under ₹5k, Under ₹10k, Under ₹20k).
  - Aesthetic mood boards and compact living showcases.
- **Discovery Feed (`/explore`)**:
  - Full-text multi-criteria search and filter engine.
  - Dynamic aesthetic pills and budget ceiling range sliders.
  - Slide-over mobile/desktop refinement drawer.
  - Dynamic sorting by price, popularity, and recency.
- **Makeover Detail Pages (`/rooms/[slug]`)**:
  - High-resolution gallery and split-view before/after comparison.
  - Granular itemized budget ledger with direct links to verified Indian retailers.
  - Zero-damage rental techniques and 2700K ambient lighting protocols.
  - Static site generation for all room slugs.
- **Creator Studio & Upload Wizard (`/upload`)**:
  - 5-step guided transformation submission flow with photo upload previews.
  - Dynamic interactive budget ledger builder.
  - Real-time live card preview pane.
  - Local draft saving via `localStorage`.
- **Product Catalog (`/shop`)**:
  - Drill-free product discovery with price filters and retailer attribution.
- **Creator Directory & Profiles (`/creators`, `/creators/[username]`)**:
  - Aesthetic maker profiles with follower stats, bios, and makeover portfolios.
- **Saved Collections & Profile (`/saved`, `/profile`)**:
  - Client-side saved rooms management and aggregate budget calculator.
  - Member profile preferences and account settings.
- **Deployment**:
  - Prebuilt static export deployed to Vercel.
