# NOOKORA — System Architecture (ARCHITECTURE.md)

## 1. Technology Stack
- **Framework**: Next.js (App Router architecture with React Server Components and selective Client Components).
- **Core Library**: React 18 / 19 with TypeScript for end-to-end type safety.
- **Styling**: Tailwind CSS configured with the custom *Nocturne Atelier* design system palette and typographic scales.
- **Iconography**: Lucide React for consistent, lightweight, and accessible SVG icons.
- **Animations & Micro-interactions**: Framer Motion for layout transitions, drawer slide-overs, and smooth interactive elements.
- **3D Graphics**: Three.js & React Three Fiber (@react-three/fiber, @react-three/drei) for the scroll-linked bedroom transformation hero, coupled with a zero-cost CSS/image fallback for low-power mobile or reduced-motion environments.
- **Data & Service Layer**: Modular repository pattern (`src/services/`) with structured mock data models, fully architected for seamless Supabase PostgreSQL + Auth replacement.

---

## 2. Directory & Folder Structure

```
nooku/
├── PRD.md                         # Product requirements & user stories
├── DESIGN.md                      # Design tokens, typography, component specs
├── ARCHITECTURE.md                # System architecture & data flow
├── AGENTS.md                      # Engineering standards & guidelines
├── public/                        # Static assets, fonts, icons, placeholders
│   ├── images/
│   │   ├── rooms/                 # Curated room photography
│   │   ├── products/              # Product tiles
│   │   └── avatars/               # Creator portraits
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx             # Root layout with fonts, header, footer, toast provider
│   │   ├── page.tsx               # Editorial Homepage (12 sections)
│   │   ├── explore/
│   │   │   └── page.tsx           # Room Discovery & Masonry Feed
│   │   ├── rooms/
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Room Makeover Detail Page
│   │   ├── shop/
│   │   │   └── page.tsx           # Product Catalog & Key Pieces
│   │   ├── creators/
│   │   │   ├── page.tsx           # Creator Discovery Directory
│   │   │   └── [username]/
│   │   │       └── page.tsx       # Creator Profile & Portfolio
│   │   ├── upload/
│   │   │   └── page.tsx           # 5-Step Creator Studio Uploader
│   │   ├── saved/
│   │   │   └── page.tsx           # Saved Rooms & Mood Boards
│   │   ├── login/
│   │   │   └── page.tsx           # Sign In
│   │   ├── signup/
│   │   │   └── page.tsx           # Account Registration
│   │   ├── forgot-password/
│   │   │   └── page.tsx           # Password Recovery
│   │   └── profile/
│   │       └── page.tsx           # User Account Settings & Activity
│   ├── components/                # Modular reusable UI components
│   │   ├── 3d/
│   │   │   ├── RoomCanvas.tsx     # Three.js 3D Bedroom Transformation Canvas
│   │   │   └── RoomFallback.tsx   # Visual Fallback for Mobile / Reduced Motion
│   │   ├── common/
│   │   │   ├── Header.tsx         # Sticky Nocturne navigation with search & profile
│   │   │   ├── Footer.tsx         # Editorial architectural footer
│   │   │   ├── Button.tsx         # Primary, secondary, ghost, micro button styles
│   │   │   ├── Toast.tsx          # Toast notification provider and triggers
│   │   │   └── BeforeAfterSlider.tsx # Interactive comparison slider
│   │   ├── room/
│   │   │   ├── RoomCard.tsx       # Standard & spotlight transformation cards
│   │   │   ├── BudgetLedger.tsx   # Itemized line-item cost breakdown
│   │   │   └── ProtocolsList.tsx  # Rental guidelines & lighting instructions
│   │   ├── shop/
│   │   │   └── ProductCard.tsx    # Product tile with price & retailer tags
│   │   ├── creator/
│   │   │   └── CreatorCard.tsx    # Creator portfolio tile with follow action
│   │   └── upload/
│   │       ├── UploadStepper.tsx  # Multi-step progress indicator
│   │       ├── LivePreviewCard.tsx# Real-time makeover preview card
│   │       └── DynamicBudgetForm.tsx # Line-item addition interface
│   ├── data/
│   │   ├── rooms.ts               # Curated room makeover records (from Stitch designs)
│   │   ├── products.ts            # Curated catalog items with INR pricing
│   │   ├── creators.ts            # Aesthetic maker profiles & biographies
│   │   └── categories.ts          # Budget tiers & aesthetic categories
│   ├── services/
│   │   ├── roomService.ts         # Querying, filtering, sorting rooms
│   │   ├── productService.ts      # Product filtering and search
│   │   ├── creatorService.ts      # Creator retrieval and follow actions
│   │   └── storageService.ts      # Saved rooms, likes, and local state management
│   ├── types/
│   │   └── index.ts               # Shared TypeScript interfaces & types
│   └── styles/
│       └── globals.css            # Tailwind directives, custom scrollbars, atmospheric glow
├── tailwind.config.ts             # Tailwind configuration with Nocturne Atelier tokens
├── tsconfig.json                  # Strict TypeScript configuration
└── package.json                   # Dependency definitions
```

---

## 3. Rendering & Hydration Strategy
- **Server Components (Default)**: Static content, metadata, initial lists, and editorial copy render on the server for zero client bundle bloat and instantaneous First Contentful Paint (FCP).
- **Client Components (`'use client'`)**: Interactivity is strictly isolated to interactive sub-trees:
  - `BeforeAfterSlider.tsx`
  - `RoomCanvas.tsx` (dynamically loaded via `next/dynamic` with `ssr: false`)
  - Filter and search bars (`ExploreFilterDrawer.tsx`)
  - Saved/bookmark button toggles
  - Multi-step upload form state in `/upload`

---

## 4. 3D Scene Architecture & Performance
- The 3D Bedroom Transformation Hero represents the gradual realization of a dream space:
  - **Stage 1**: Minimalist architectural floor & perimeter framing.
  - **Stage 2**: Bed frame, mattress, and study desk materialize.
  - **Stage 3**: Warm lighting fixtures (mushroom lamp, paper lantern, fairy light wash).
  - **Stage 4**: Decor, tactile linens, wall art, plants, and books snap into place.
- **Performance Guarantees**:
  - Dynamically imported with `ssr: false` and `Suspense` boundary.
  - Geometry is low-poly procedural with custom ShaderMaterial / MeshStandardMaterial using ambient warm lighting.
  - Mobile detection: Automatically replaces WebGL context with an optimized interactive 2D crossfade slider on touch devices or screens < 768px to ensure 60fps and zero battery drain.
  - Memory cleanup on unmount: all geometries and textures are explicitly disposed of.

---

## 5. Data Flow & Service Layer
- Clean separation between components and data sources via `src/services/`.
- UI components never manipulate raw database calls directly; they invoke asynchronous service functions (e.g. `roomService.getRoomsByFilter(...)`).
- Future Supabase integration requires only swapping the repository implementation inside `src/services/` without modifying any UI components.

---

## 6. Build & Deployment
- Production targets: Vercel, Netlify, or Node.js container.
- Build verification via `next build` ensuring zero TypeScript errors, valid route definitions, and optimized static asset packaging.
