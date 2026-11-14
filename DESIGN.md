# NOOKORA — Design System Specification (DESIGN.md)
## Design Direction: Nocturne Atelier

The Nookora visual identity is rooted in the **Nocturne Atelier** design language extracted directly from the uploaded Google Stitch design system. It embodies the tactile, hushed atmosphere of a private architectural salon after twilight, balancing strict spatial discipline with the warmth of natural interior illumination, aged wood, patinated bronze, and unbleached linens.

---

## 1. Color Palette Tokens

| Token Name | Hex Code | Purpose & Application |
|---|---|---|
| **Canvas Base / Surface** | `#111714` | Midnight Black base canvas with faint olive-forest undertone |
| **Section Ground** | `#18211C` | Deep Forest background for alternating structural sections |
| **Elevated Surface** | `#202A24` | Elevated top bars, modal sheets, sticky headers |
| **Card Surface** | `#252F29` | Focal project cards, reading surfaces, product tiles |
| **Soft Charcoal** | `#2D3630` | Popovers, active press states, drawer backgrounds |
| **Muted Surface** | `#343D36` | Selected chips, hover states, badge backgrounds |
| **Primary Text** | `#F2EFE7` | Warm Ivory text, high-contrast, tactile paper cast |
| **Secondary Text** | `#C0BBAF` | Weathered parchment, specs, narrative body text |
| **Muted Text** | `#898C83` | Raw slate gray, technical metadata, labels |
| **Champagne Gold** | `#D8C19A` | Primary accent, active indicators, CTA buttons |
| **Antique Bronze** | `#B89565` | Secondary accent, dividers, micro-interaction hovers |
| **Muted Sage** | `#929F87` | Botanical and natural status accents |
| **Warm Terracotta** | `#B8755B` | Accent highlights, budget warnings, curated tags |

### Hairlines & Borders
- **Bronze Hairline**: `rgba(216, 193, 154, 0.14)` — Used for highlighted card frames, hero groupings, and editorial borders.
- **Subtle Surface Hairline**: `rgba(255, 255, 255, 0.08)` — Grid dividers, technical rules, baseline demarcations.
- **Ambient Radial Bloom**: `rgba(216, 193, 154, 0.035)` with 48px blur radius, creating warm umber glow.

---

## 2. Typography Hierarchy

| Style Token | Font Family | Size / Line Height | Weight & Tracking | Usage |
|---|---|---|---|---|
| `display-lg` | Playfair Display | 56px / 64px | 600, -0.02em | Hero headline (desktop) |
| `display-lg-mobile` | Playfair Display | 36px / 44px | 600, -0.01em | Hero headline (mobile) |
| `headline-lg` | Playfair Display | 40px / 48px | 400, -0.01em | Major section headers |
| `headline-md` | Playfair Display | 28px / 36px | 500, 0em | Card titles, modal headers |
| `headline-sm` | Playfair Display | 22px / 30px | 500, 0em | Subheaders, drawer titles |
| `body-lg` | Plus Jakarta Sans | 18px / 28px | 400, 0em | Editorial lede, intros |
| `body-md` | Plus Jakarta Sans | 15px / 24px | 400, 0.01em | Main body copy, specs |
| `body-sm` | Plus Jakarta Sans | 13px / 20px | 400, 0.01em | Secondary descriptions |
| `label-md` | Inter | 12px / 16px | 500, 0.08em | Uppercase navigation, CTAs |
| `label-sm` | Inter | 10px / 14px | 600, 0.12em | Tags, budget pills, badges |

---

## 3. Photography & Visual Direction
- **Warm Contrast Rule**: Room photography must never be tinted dark or murky. Images must glow with warm sunlight (5000K daylight or 2700K ambient lamplight), warm wood grains, crisp white linens, and vibrant indoor plants.
- **Signature Visual Impact**: The contrast between dark charcoal/forest interface surfaces and warm, tactile interior photography forms Nookora's luxury signature identity.
- **Aspect Ratios**: Rigidly enforced `4:3`, `16:9`, and `3:4` vertical portrait frames for room transformations.

---

## 4. Components & Micro-Interactions

### 1. Buttons
- **Primary Action**: Solid Champagne Gold (`#D8C19A`) fill with Midnight Black (`#111714`) uppercase text (`label-md`). Hover transitions smoothly to Antique Bronze (`#B89565`).
- **Secondary / Ghost Action**: Transparent fill with `1px` Bronze Hairline (`rgba(216, 193, 154, 0.3)`) and Warm Ivory text. Hover adds subtle `rgba(216, 193, 154, 0.08)` wash.
- **Editorial Micro Button**: Pure typography with an animated right chevron or horizontal line, rendered in Champagne Gold with a delicate underline.

### 2. Cards
- Framed in `#252F29` or `#18211C` with `1px` hairline border `rgba(216, 193, 154, 0.14)`.
- Subtle scale effect on card image (`scale-[1.02]` or `scale-105`) over 500ms ease-out on hover.
- Metadata pinned in high-contrast `Inter` uppercase chips.

### 3. Before-and-After Slider
- Custom interactive split-slider with a central bronze divider bar and circular grip knob.
- Smooth drag/pointer handling with instant responsive recalculation.
- Subtle badge indicators ("BEFORE" in terracotta/muted, "AFTER" in champagne gold).

### 4. Itemized Budget Ledger
- Horizontally striped ledger rows with hairline rules (`rgba(255, 255, 255, 0.06)`).
- Left column: Technical index (`01 / LIGHTING`) in `label-sm` muted slate.
- Center column: Item name, vendor tag (e.g. Amazon India, IKEA), drill-free status.
- Right column: Cost in INR (`₹799`), direct retailer link button.
- Sticky budget summary widget calculating total makeover expenditure.

---

## 5. Spacing & Responsive Grid
- **Container Max-Width**: `1360px` with fluid perimeter margins:
  - Mobile (<768px): `margin-mobile: 1.25rem` (20px)
  - Tablet (768px-1024px): `margin: 2rem` (32px)
  - Desktop (>1024px): `margin: 3.5rem` (56px)
- **Column Grids**:
  - Mobile: 4-column reflow
  - Tablet: 8-column layout
  - Desktop: 12-column architectural grid with asymmetric 7/5 and 8/4 editorial splits.
