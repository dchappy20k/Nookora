import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Compass, CheckCircle2, TrendingUp, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { RoomHero } from '@/components/3d/RoomHero';
import { BeforeAfterSlider } from '@/components/common/BeforeAfterSlider';
import { RoomCard } from '@/components/room/RoomCard';
import { ProductCard } from '@/components/shop/ProductCard';
import { CreatorCard } from '@/components/creator/CreatorCard';
import { roomService } from '@/services/roomService';
import { productService } from '@/services/productService';
import { creatorService } from '@/services/creatorService';
import { BUDGET_TIERS, AESTHETIC_CATEGORIES } from '@/data/categories';

export default function HomePage() {
  const featuredRoom = roomService.getRoomBySlug('the-indiranagar-japandi-nook')!;
  const trendingRooms = roomService.getTrendingRooms();
  const compactRooms = roomService.getCompactRooms();
  const keyProducts = productService.getAllProducts().slice(0, 4);
  const topCreators = creatorService.getAllCreators();

  return (
    <div className="w-full">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full bg-[#18211C] border-b border-[rgba(216,193,154,0.14)] overflow-hidden">
        {/* Ambient atmospheric backdrop glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#D8C19A]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-[1360px] mx-auto px-5 md:px-12 pt-12 md:pt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#202A24] border border-[#D8C19A]/30 text-[#D8C19A] text-xs font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Affordable Interior Architecture Platform</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F2EFE7] font-normal leading-[1.1] tracking-tight">
                Aesthetic Room Makeovers,{' '}
                <span className="italic text-[#D8C19A] font-light">
                  Made Affordable.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#C0BBAF] font-normal leading-relaxed max-w-xl">
                Discover real compact spaces under ₹10,000, inspect exact line-item budgets, and recreate the look in your rented apartment or PG with 100% drill-free pieces.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/explore"
                  className="px-6 py-3.5 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-all shadow-xl shadow-black/40 flex items-center gap-2"
                >
                  <span>Explore 100+ Makeovers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/upload"
                  className="px-6 py-3.5 bg-[#202A24] text-[#F2EFE7] border border-[rgba(216,193,154,0.3)] hover:border-[#D8C19A] text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center gap-2"
                >
                  <span>Share Your Transformation</span>
                </Link>
              </div>

              {/* Renter Trust Points */}
              <div className="pt-6 border-t border-[rgba(216,193,154,0.12)] grid grid-cols-3 gap-4 text-xs text-[#898C83]">
                <div>
                  <span className="font-serif text-xl text-[#F2EFE7] font-semibold block">₹8.5k</span>
                  <span>Avg. Makeover Cost</span>
                </div>
                <div>
                  <span className="font-serif text-xl text-[#D8C19A] font-semibold block">100%</span>
                  <span>Drill-Free Renter Friendly</span>
                </div>
                <div>
                  <span className="font-serif text-xl text-[#F2EFE7] font-semibold block">Direct</span>
                  <span>Indian Retailer Links</span>
                </div>
              </div>
            </div>

            {/* Right 3D Spatial Canvas Hero */}
            <div className="lg:col-span-6 w-full">
              <RoomHero />
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUDGET-BASED ROOM DISCOVERY */}
      <section className="w-full bg-[#111714] py-20 border-b border-[rgba(216,193,154,0.14)]" id="budget-tiers">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#B89565] font-semibold block mb-1">
                Zero Hidden Expenses
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#F2EFE7] font-normal">
                Curated by Exact Budget
              </h2>
            </div>
            <Link
              href="/explore"
              className="mt-4 md:mt-0 text-xs uppercase tracking-wider text-[#D8C19A] hover:text-[#f5ddb4] flex items-center gap-1 font-semibold group"
            >
              <span>View All Budget Categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUDGET_TIERS.map((tier) => (
              <Link
                key={tier.id}
                href={`/explore?budget=${tier.id}`}
                className="group relative bg-[#18211C] border border-[rgba(216,193,154,0.12)] hover:border-[#D8C19A]/50 rounded-xl p-6 ambient-shadow transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#898C83] block mb-2">
                    Tier Ceiling
                  </span>
                  <h3 className="font-serif text-2xl text-[#D8C19A] group-hover:text-[#f5ddb4] transition-colors font-medium">
                    {tier.label}
                  </h3>
                  <p className="text-xs text-[#C0BBAF] mt-2 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[rgba(216,193,154,0.08)] mt-6 flex items-center justify-between text-xs text-[#898C83] group-hover:text-[#D8C19A] transition-colors">
                  <span>Explore Rooms</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ROOM AESTHETIC GALLERY */}
      <section className="w-full max-w-[1360px] mx-auto px-5 md:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#B89565] font-semibold block mb-1">
            Mood & Atmosphere
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#F2EFE7] font-normal">
            Find Your Signature Aesthetic
          </h2>
          <p className="text-xs md:text-sm text-[#C0BBAF] mt-2">
            From peaceful Japanese minimalism to warm Indian block-print accents.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {AESTHETIC_CATEGORIES.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/explore?aesthetic=${encodeURIComponent(cat.id)}`}
              className="group relative h-48 md:h-56 rounded-xl overflow-hidden border border-[rgba(216,193,154,0.12)] hover:border-[#D8C19A]/50 ambient-shadow transition-all"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111714] via-[#111714]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-serif text-lg text-[#F2EFE7] group-hover:text-[#D8C19A] transition-colors block">
                  {cat.label}
                </span>
                <span className="text-[10px] text-[#898C83] uppercase tracking-wider mt-0.5 block">
                  Explore Aesthetic →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. BEFORE-AND-AFTER REALITY CHECK SLIDER */}
      <section className="w-full bg-[#18211C] py-20 border-t border-b border-[rgba(216,193,154,0.14)]" id="before-after">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#B89565] font-semibold block mb-1">
              Real Reality Check
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F2EFE7] font-normal">
              Before & After Transformation
            </h2>
            <p className="text-xs md:text-sm text-[#C0BBAF] mt-2">
              Drag the slider to inspect how an empty rental was transformed into a serene Japandi sanctuary for just ₹8,517.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Interactive Split Slider */}
            <div className="lg:col-span-8">
              <BeforeAfterSlider
                beforeImage={featuredRoom.beforeImage}
                afterImage={featuredRoom.afterImage}
                beforeAlt="110 sq ft empty bedroom before makeover"
                afterAlt="Finished Japandi bedroom makeover"
              />
            </div>

            {/* Transformation Specs */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-xl bg-[#202A24] border border-[rgba(216,193,154,0.18)] ambient-shadow space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-[#D8C19A] font-semibold block">
                  Featured Case Study
                </span>
                <h3 className="font-serif text-2xl text-[#F2EFE7]">
                  {featuredRoom.title}
                </h3>
                <p className="text-xs text-[#C0BBAF] leading-relaxed">
                  {featuredRoom.subtitle}
                </p>

                <div className="pt-2 border-t border-[rgba(216,193,154,0.1)] space-y-2 text-xs">
                  <div className="flex justify-between text-[#898C83]">
                    <span>Floor Area</span>
                    <span className="text-[#F2EFE7] font-medium">{featuredRoom.dimensions} ({featuredRoom.areaSqFt} sq ft)</span>
                  </div>
                  <div className="flex justify-between text-[#898C83]">
                    <span>Total Investment</span>
                    <span className="text-[#D8C19A] font-serif font-bold text-base">₹{featuredRoom.totalBudget.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#898C83]">
                    <span>Rental Damage Guarantee</span>
                    <span className="text-[#929F87] font-medium">100% Drill-Free</span>
                  </div>
                </div>

                <Link
                  href={`/rooms/${featuredRoom.slug}`}
                  className="w-full py-3 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded text-center block hover:bg-[#B89565] transition-colors"
                >
                  Inspect Full Product Ledger
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRENDING ROOM TRANSFORMATIONS */}
      <section className="w-full max-w-[1360px] mx-auto px-5 md:px-12 py-20" id="trending">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#B89565] font-semibold block mb-1">
              Community Favorites
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F2EFE7] font-normal">
              Trending Room Transformations
            </h2>
          </div>
          <Link
            href="/explore"
            className="mt-4 md:mt-0 text-xs uppercase tracking-wider text-[#D8C19A] hover:text-[#f5ddb4] flex items-center gap-1 font-semibold group"
          >
            <span>Explore All 100+ Makeovers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* 6. SHOP THE LOOK (KEY PIECES) */}
      <section className="w-full bg-[#18211C] py-20 border-t border-b border-[rgba(216,193,154,0.14)]" id="shop">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#B89565] font-semibold block mb-1">
                Verified Renter-Friendly Pieces
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#F2EFE7] font-normal">
                Shop Key Makeover Pieces
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 text-xs uppercase tracking-wider text-[#D8C19A] hover:text-[#f5ddb4] flex items-center gap-1 font-semibold group"
            >
              <span>Explore Complete Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. SMALL-ROOM & COMPACT LIVING INSPIRATION */}
      <section className="w-full max-w-[1360px] mx-auto px-5 md:px-12 py-20" id="compact-living">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#B89565] font-semibold block mb-1">
              Micro-Spaces
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F2EFE7] font-normal">
              Compact Living Inspiration
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#C0BBAF] max-w-md mt-2 md:mt-0">
            Engineered specifically for 80-120 sq ft rental rooms, hostel corners, and Paying Guest beds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {compactRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* 8. CREATOR COMMUNITY */}
      <section className="w-full bg-[#18211C] py-20 border-t border-b border-[rgba(216,193,154,0.14)]" id="creators">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#B89565] font-semibold block mb-1">
              Designers & Renters
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#F2EFE7] font-normal">
              Meet the Aesthetic Makers
            </h2>
            <p className="text-xs md:text-sm text-[#C0BBAF] mt-2">
              Follow real creators publishing verified drill-free room makeovers with honest cost receipts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. HOW NOOKORA WORKS */}
      <section className="w-full max-w-[1360px] mx-auto px-5 md:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#B89565] font-semibold block mb-1">
            The Frictionless Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#F2EFE7] font-normal">
            How Nookora Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 rounded-xl bg-[#18211C] border border-[rgba(216,193,154,0.12)] space-y-3 ambient-shadow">
            <span className="font-mono text-2xl text-[#D8C19A] font-semibold block">01</span>
            <h3 className="font-serif text-lg text-[#F2EFE7]">Discover a Nook</h3>
            <p className="text-xs text-[#C0BBAF] leading-relaxed">
              Browse real bedrooms filtered by strict budget ceilings, room dimensions, and aesthetics.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#18211C] border border-[rgba(216,193,154,0.12)] space-y-3 ambient-shadow">
            <span className="font-mono text-2xl text-[#D8C19A] font-semibold block">02</span>
            <h3 className="font-serif text-lg text-[#F2EFE7]">Inspect the Budget</h3>
            <p className="text-xs text-[#C0BBAF] leading-relaxed">
              Every lamp, bedsheet, pegboard, and rug is itemized with verified Indian retail prices.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#18211C] border border-[rgba(216,193,154,0.12)] space-y-3 ambient-shadow">
            <span className="font-mono text-2xl text-[#D8C19A] font-semibold block">03</span>
            <h3 className="font-serif text-lg text-[#F2EFE7]">Shop the Look</h3>
            <p className="text-xs text-[#C0BBAF] leading-relaxed">
              Click direct links to Amazon India, IKEA, FabIndia, and Westside with 100% drill-free items.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#18211C] border border-[rgba(216,193,154,0.12)] space-y-3 ambient-shadow">
            <span className="font-mono text-2xl text-[#D8C19A] font-semibold block">04</span>
            <h3 className="font-serif text-lg text-[#F2EFE7]">Make Space Yours</h3>
            <p className="text-xs text-[#C0BBAF] leading-relaxed">
              Execute with zero landlord friction, keep your security deposit intact, and enjoy your sanctuary.
            </p>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA BANNER */}
      <section className="w-full max-w-[1360px] mx-auto px-5 md:px-12 mb-20">
        <div className="relative bg-[#18211C] rounded-2xl overflow-hidden p-8 md:p-16 border border-[rgba(216,193,154,0.2)] ambient-shadow">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D8C19A] block">
              Creator Studio
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#F2EFE7] font-normal leading-tight">
              Transformed your rented space? Share your story with India.
            </h2>
            <p className="text-xs md:text-sm text-[#C0BBAF] leading-relaxed">
              Join hundreds of aesthetic makers on Nookora. Upload your room photographs, break down your budget, and inspire college students and renters across the country.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/upload"
                className="px-8 py-4 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-all shadow-xl shadow-black/50"
              >
                Launch Creator Studio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
