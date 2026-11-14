import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, MapPin, Maximize2, Sparkles, Share2, ArrowLeft } from 'lucide-react';
import { roomService } from '@/services/roomService';
import { BeforeAfterSlider } from '@/components/common/BeforeAfterSlider';
import { BudgetLedger } from '@/components/room/BudgetLedger';
import { ProtocolsList } from '@/components/room/ProtocolsList';
import { RoomCard } from '@/components/room/RoomCard';
import { RoomDetailActions } from './RoomDetailActions';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const rooms = roomService.getAllRooms();
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const room = roomService.getRoomBySlug(params.slug);
  if (!room) return { title: 'Room Not Found | NOOKORA' };

  return {
    title: `${room.title} — ₹${room.totalBudget.toLocaleString('en-IN')} Makeover | NOOKORA`,
    description: `${room.subtitle} Explore the complete line-item budget, drill-free techniques, and verified products.`,
  };
}

export default function RoomDetailPage({ params }: PageProps) {
  const room = roomService.getRoomBySlug(params.slug);

  if (!room) {
    notFound();
  }

  const similarRooms = roomService.getSimilarRooms(room.id, room.aesthetic, 3);

  return (
    <div className="w-full min-h-screen bg-[#111714] text-[#F2EFE7]">
      {/* 1. TOP BREADCRUMB & METRICS BAR */}
      <section className="bg-[#141b17] border-b border-[rgba(216,193,154,0.14)] py-6">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#898C83]">
            <Link href="/" className="hover:text-[#F2EFE7] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/explore" className="hover:text-[#F2EFE7] transition-colors">Explore</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/explore?aesthetic=${encodeURIComponent(room.aesthetic)}`} className="hover:text-[#F2EFE7] transition-colors">
              {room.aesthetic}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#D8C19A] truncate max-w-[200px]">{room.title}</span>
          </nav>

          {/* Social & Save Actions */}
          <RoomDetailActions room={room} />
        </div>
      </section>

      {/* 2. HERO HEADLINE & METADATA */}
      <section className="max-w-[1360px] mx-auto px-5 md:px-12 pt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#18211C] border border-[#D8C19A]/30 text-[#D8C19A] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded">
                {room.aesthetic}
              </span>
              <span className="bg-[#18211C] text-[#C0BBAF] text-xs uppercase tracking-wider px-3 py-1 rounded border border-stone-800">
                {room.spaceType}
              </span>
              <span className="text-xs text-[#929F87] font-medium bg-[#18211C] border border-[#929F87]/20 px-3 py-1 rounded">
                100% Drill-Free Verified
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F2EFE7] font-normal leading-tight">
              {room.title}
            </h1>

            <p className="text-base text-[#C0BBAF] leading-relaxed max-w-2xl">
              {room.subtitle}
            </p>

            {/* Spatial & Locational Specs */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-[#898C83] pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D8C19A]" />
                <span className="text-[#F2EFE7]">{room.location}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#D8C19A]" />
                <span className="text-[#F2EFE7]">{room.dimensions}</span>
                <span>({room.areaSqFt} sq ft total)</span>
              </span>
            </div>
          </div>

          {/* Quick Total Budget Widget */}
          <div className="lg:col-span-4 bg-[#18211C] border border-[rgba(216,193,154,0.2)] rounded-xl p-6 ambient-shadow space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#898C83] block">
                Total Makeover Spend
              </span>
              <span className="font-serif text-3xl md:text-4xl text-[#D8C19A] font-bold">
                ₹{room.totalBudget.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="pt-3 border-t border-[rgba(216,193,154,0.1)] space-y-2 text-xs text-[#C0BBAF]">
              <div className="flex justify-between">
                <span>Products Cataloged:</span>
                <span className="font-semibold text-[#F2EFE7]">{room.items.length} items</span>
              </div>
              <div className="flex justify-between">
                <span>Commercial Designer Savings:</span>
                <span className="font-semibold text-[#929F87]">₹40,000+ saved</span>
              </div>
              <div className="flex justify-between">
                <span>Wall Damage:</span>
                <span className="font-semibold text-[#F2EFE7]">Zero Holes / Command Mounted</span>
              </div>
            </div>

            <a
              href="#itemized-breakdown"
              className="w-full py-3 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded text-center block hover:bg-[#B89565] transition-colors"
            >
              Jump to Line-Item Receipts
            </a>
          </div>
        </div>
      </section>

      {/* 3. VISUAL SHOWCASE: BEFORE & AFTER SLIDER & HIGH-RES GALLERY */}
      <section className="max-w-[1360px] mx-auto px-5 md:px-12 py-8 space-y-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#B89565] font-semibold block mb-2">
            Interactive Visual Proof
          </span>
          <h2 className="font-serif text-2xl text-[#F2EFE7] mb-6">
            Spatial Transformation Slider
          </h2>
          <BeforeAfterSlider
            beforeImage={room.beforeImage}
            afterImage={room.afterImage}
            beforeAlt={`Before: ${room.title}`}
            afterAlt={`After: ${room.title}`}
          />
        </div>

        {/* Gallery Thumbnails */}
        {room.galleryImages && room.galleryImages.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {room.galleryImages.map((imgUrl, i) => (
              <div key={i} className="relative aspect-[16/10] rounded-lg overflow-hidden border border-[rgba(216,193,154,0.12)] bg-[#18211C] group">
                <Image
                  src={imgUrl}
                  alt={`${room.title} angle ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. CREATOR PROFILE CARD */}
      <section className="max-w-[1360px] mx-auto px-5 md:px-12 py-8">
        <div className="p-6 md:p-8 rounded-xl bg-[#18211C] border border-[rgba(216,193,154,0.14)] ambient-shadow flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D8C19A] flex-shrink-0">
              <Image
                src={room.creator.avatar}
                alt={room.creator.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#898C83] block">
                Makeover Architect
              </span>
              <Link href={`/creators/${room.creator.username}`}>
                <h3 className="font-serif text-xl text-[#F2EFE7] hover:text-[#D8C19A] transition-colors">
                  {room.creator.name}
                </h3>
              </Link>
              <p className="text-xs text-[#C0BBAF] mt-1 max-w-md">
                {room.creator.bio}
              </p>
            </div>
          </div>

          <Link
            href={`/creators/${room.creator.username}`}
            className="px-5 py-2.5 rounded bg-[#202A24] text-[#D8C19A] border border-[#D8C19A]/30 hover:bg-[#D8C19A] hover:text-[#111714] text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap"
          >
            View All {room.creator.makeoversCount} Transformations
          </Link>
        </div>
      </section>

      {/* 5. ITEMIZED BUDGET BREAKDOWN TABLE */}
      <section className="max-w-[1360px] mx-auto px-5 md:px-12 py-10 scroll-mt-24" id="itemized-breakdown">
        <BudgetLedger items={room.items} totalBudget={room.totalBudget} />
      </section>

      {/* 6. ZERO-DAMAGE TECHNIQUES & LIGHTING PROTOCOLS */}
      <section className="max-w-[1360px] mx-auto px-5 md:px-12 py-10">
        <ProtocolsList techniques={room.techniques} lightingProtocol={room.lightingProtocol} />
      </section>

      {/* 7. SIMILAR TRANSFORMATIONS CAROUSEL */}
      {similarRooms.length > 0 && (
        <section className="max-w-[1360px] mx-auto px-5 md:px-12 py-16 border-t border-[rgba(216,193,154,0.12)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#B89565] font-semibold block mb-1">
                More in this Mood
              </span>
              <h2 className="font-serif text-3xl text-[#F2EFE7]">
                Similar {room.aesthetic} Spaces
              </h2>
            </div>
            <Link
              href={`/explore?aesthetic=${encodeURIComponent(room.aesthetic)}`}
              className="text-xs uppercase tracking-wider text-[#D8C19A] hover:text-[#f5ddb4] font-semibold"
            >
              See All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarRooms.map((simRoom) => (
              <RoomCard key={simRoom.id} room={simRoom} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
