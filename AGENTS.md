# NOOKORA — Engineering Standards & Guidelines (AGENTS.md)

## 1. Core Engineering Principles
1. **Design Fidelity First**: Google Stitch designs and the *Nocturne Atelier* design specifications (`DESIGN.md`) are the non-negotiable visual source of truth. Every layout, color token, border hairline, typography hierarchy, and spacing rhythm must faithfully mirror the Stitch design files.
2. **Never Simplify into Generic SaaS**: Preserve the dark luxury editorial mood. Do not substitute custom styled components with generic bootstrap-like buttons or stark white surfaces.
3. **No Dead Clicks or Broken Routes**: Every button, link, and interactive widget must produce visible, meaningful feedback or navigate to a functioning page.
4. **Resilient Fallbacks**: Never assume WebGL or 3D is available or fast on every user's device. Always pair 3D canvases with lightweight, high-fidelity fallbacks.

---

## 2. TypeScript & Code Quality
- **Strict Typing**: No `any` types. All domain models (`Room`, `Product`, `Creator`, `BudgetBreakdown`, `FilterState`) must be explicitly typed in `src/types/index.ts`.
- **Component Signatures**: Explicitly define `interface ComponentProps` for every React component.
- **Null Safety**: Always guard against undefined properties in data lists or search parameters.

---

## 3. Component Architecture & Reusability
- **Atomic Modularization**: Separate layout, presentation, and data fetching.
- **Client Component Discipline**: Add `'use client'` only to leaves of the component tree that directly use React hooks (`useState`, `useEffect`, `useCallback`) or browser events (`onClick`, `onScroll`). Keep container layouts and pages as React Server Components wherever possible.
- **No Direct Mock Inlining**: Never scatter raw JSON mock data inside UI components. Always query from `src/services/` or `src/data/`.

---

## 4. Performance & Asset Optimization
- **Images**: Use Next.js `<Image />` or styled responsive images with explicit aspect ratios to prevent Cumulative Layout Shift (CLS). Include meaningful `alt` descriptions reflecting the warm architectural lighting.
- **3D & Heavy Scripts**: Heavy libraries (`three`, `@react-three/fiber`) must always be dynamically imported using `next/dynamic` with `{ ssr: false }`.
- **Bundle Footprint**: Prefer standard CSS and lightweight utility classes over heavy 3rd-party widget packages.

---

## 5. Responsive Design Standards
- **Breakpoints**:
  - `mobile`: `< 768px` (test at 360px, 390px, 430px)
  - `tablet`: `768px - 1024px`
  - `desktop`: `1024px - 1440px`
  - `wide`: `> 1440px`
- **Mobile Touch**: Minimum touch targets of 44x44px for buttons, drawer toggles, and filters.
- **No Horizontal Scroll**: Ensure `overflow-x-hidden` on main container shells; never allow unintentional horizontal page blowout.

---

## 6. Security & Data Integrity
- **Secrets Management**: Never commit private API keys or database service secrets to the frontend.
- **Input Sanitization**: Validate all inputs on the `/upload` form (file types, text length, non-negative budget numbers).
- **External Links**: All external retailer links (Amazon, IKEA, etc.) must include `target="_blank" rel="noopener noreferrer"`.
- **Authentication**: Simulated or actual authentication flows must safely manage state without exposing sensitive user tokens.

---

## 7. Change Management & Non-Destructive Edits
- Never delete working configurations, assets, or Stitch reference files (`nocturne_atelier/`, `nookora_editorial_homepage/`, etc.).
- When refactoring, preserve existing working endpoints and UI component interfaces.
