import React from 'react';
import Link from 'next/link';
import { Sparkles, Users } from 'lucide-react';
import { creatorService } from '@/services/creatorService';
import { CreatorCard } from '@/components/creator/CreatorCard';

export const metadata = {
  title: 'Meet the Creators & Interior Stylists | NOOKORA',
  description: 'Follow design creators across India transforming compact rental spaces with transparent budgets.',
};

export default function CreatorsPage() {
  const creators = creatorService.getAllCreators();

  return (
    <div className="w-full min-h-screen bg-[#111714] text-[#F2EFE7]">
      {/* Header */}
      <section className="bg-[#141b17] border-b border-[rgba(216,193,154,0.14)] py-12">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12">
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D8C19A] block mb-2">
            The Aesthetic Community
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-[#F2EFE7] font-normal">
            Meet the Aesthetic Makers
          </h1>
          <p className="text-xs md:text-sm text-[#C0BBAF] mt-2 max-w-xl">
            Architects, interior stylists, and resourceful renters sharing real-world transformations with honest cost receipts.
          </p>
        </div>
      </section>

      {/* Grid */}
      <main className="max-w-[1360px] mx-auto px-5 md:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </main>
    </div>
  );
}
