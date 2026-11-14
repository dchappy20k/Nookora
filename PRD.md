# NOOKORA — Product Requirements Document (PRD)

## 1. Product Vision & Emotional Experience
**NOOKORA** ("Make Space Yours") is a premium room-discovery and affordable home makeover platform tailored for real people navigating compact, rented, or budget-constrained living spaces.

- **Emotional Promise**: Transform mundane, temporary, or rental spaces into deeply atmospheric, deeply personal sanctuaries without breaking the bank.
- **Core Proposition**: *"Discover a room. Understand its budget. Find its products. Recreate the look."*
- **Primary Aesthetic Philosophy**: Dark luxury editorial interface with warm, naturally lit interior photography ("Nocturne Atelier" aesthetic).

---

## 2. Target Audience & Market
- **Primary Segments**:
  - College & university students moving into dorms or shared hostels.
  - PG (Paying Guest) residents seeking personality and comfort within strict rental restrictions.
  - Young professionals renting 1BHK/studio apartments in metro hubs (Bengaluru, Mumbai, Delhi-NCR, Pune, Hyderabad).
  - Minimalist budget transformers seeking designer looks under ₹10,000.
- **Initial Geography**: India (INR ₹ pricing, Indian rental constraints like no drilling, peel-and-stick solutions, local vendor links like Amazon India, Urban Company, IKEA India, Westside Home, local markets).
- **Long-term Vision**: Global home-inspiration and social commerce platform for compact, high-character interior living.

---

## 3. User Problems & Solved Pain Points
1. **The Pinterest Mirage**: Users see stunning aspirational bedrooms on Pinterest and Instagram, but have no idea how much they actually cost, which products were used, or if they are rentable/drill-free friendly.
2. **Budget Opacity**: Traditional interior design is opaque and expensive (charging ₹50,000+ for consultation alone). Nookora shows granular line-item costs (e.g. ₹799 bamboo lamp, ₹1,200 cotton bedsheet, ₹350 fairy lights).
3. **Rental Friction**: Renters cannot paint walls with permanent pigments or drill deep holes. Nookora curates non-damaging makeovers (tension rods, Command hooks, peel-and-stick wallpaper, warm ambient lighting).
4. **Scattered Shopping**: Recreating a room requires hours of reverse-image searching on multiple commerce apps. Nookora provides direct "Shop the Look" piece manifests.

---

## 4. Complete User Journey
1. **Inspiration (Landing / Explore)**: User arrives on the editorial homepage, explores rooms curated by budget tier (Under ₹2,000, Under ₹5,000, Under ₹10,000, Under ₹20,000) or aesthetic (Japandi, Korean Minimal, Warm Neutral, Modern Indian).
2. **Deep Dive (Room Detail)**: User inspects high-resolution before-and-after transformations, reviews the spatial layout and dimensions (e.g., 10x11 ft, 110 sq ft), reads creator lighting/decor protocols, and expands the line-item budget ledger.
3. **Action (Shop the Look & Save)**: User clicks individual product links (with verified pricing and retailer names), saves rooms to custom collections (e.g., "Monsoon Bedroom Ideas"), or copies the styling guide.
4. **Community & Creation (Creator Studio / Upload)**: Renters and design creators upload their own room transformations through a 5-step studio wizard, detailing before/after photos, dimensions, budget breakdown, and decor tips.

---

## 5. Information Architecture & Key Routes
- `/` — Editorial Homepage (Cinematic 3D transformation hero, Budget tiers, Aesthetic mood boards, Before-and-After slider, Trending rooms, Shop key pieces, Small-room tips, Creators, How it works, CTA).
- `/explore` — Room Discovery Feed (Masonry grid, search, aesthetic filters, budget filters, space type filters, sort controls, filter drawer, save actions).
- `/rooms/[slug]` — Room Makeover Detail Page (Breadcrumb, hero photography, before/after comparison slider, creator bio, specs, interactive itemized budget ledger with direct purchase links, design protocols, similar transformations).
- `/shop` — Product Discovery Catalog (Curated pieces filtered by category, price range, and aesthetic).
- `/creators` — Creator Directory (Explore top aesthetic makers, follow state, makeover counts, follower stats).
- `/creators/[username]` — Creator Profile Page (Creator header, stats, bio, portfolio of published transformations).
- `/upload` — Creator Studio / Transformation Uploader (5-step interactive wizard with live preview card and dynamic budget itemizer).
- `/saved` — Saved Rooms & Collections (Organized mood boards, liked transformations, quick access).
- `/login` & `/signup` — Authentication & onboarding flows.
- `/forgot-password` — Password recovery flow.
- `/profile` — User account settings, preferences, and saved collections.

---

## 6. Functional & Technical Requirements
- **Responsive Fluid Layout**: Seamless responsiveness across 360px mobile, 768px tablet, 1024px laptop, and 1920px wide desktop.
- **Interactive Before-and-After**: Drag/touch slider to inspect spatial transformation in real time.
- **Dynamic 3D Transformation**: Interactive 3D bedroom scene (empty room -> furniture -> lighting -> complete aesthetic space) using Three.js / React Three Fiber with zero-latency fallback for reduced motion and low-spec mobile.
- **Search & Filtering Engine**: Instant client-side and URL-synchronized filtering by budget, aesthetic tag, space type, and room dimensions.
- **State Management**: Persisted saved items, liked rooms, and user draft state via local storage and extensible service architecture.
- **Currency & Localization**: Indian Rupee (₹) standard formatting throughout all budget breakdown tables.

---

## 7. Performance & Accessibility (a11y)
- **Lighthouse Targets**: >90 in Performance, Accessibility, Best Practices, and SEO.
- **Image Optimization**: WebP/AVIF formats with responsive `srcset` and lazy loading.
- **WCAG AA Compliance**: High contrast ratios (Warm Ivory `#F2EFE7` on Midnight Black `#111714` yields > 12:1 contrast ratio).
- **Reduced Motion**: Graceful fallback to static high-res photography when `prefers-reduced-motion` is enabled.
