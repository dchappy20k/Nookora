import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Instagram, Youtube, Sparkles, ArrowLeft } from 'lucide-react';
import { creatorService } from '@/services/creatorService';
import { roomService } from '@/services/roomService';
import { RoomCard } from '@/components/room/RoomCard';
import { CreatorProfileActions } from './CreatorProfileActions';

interface PageProps {
  params: {
    username: string;
  };
}

export async function generateStaticParams() {
  const creators = creatorService.getAllCreators();
  return creators.map((c) => ({
    username: c.username,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const creator = creatorService.getCreatorByUsername(params.username);
  if (!creator) return { title: 'Creator Not Found | NOOKORA' };

  return {
    title: `${creator.name} (@${creator.username}) — Aesthetic Maker | NOOKORA`,
    description: creator.bio,
  };
}

export default function CreatorDetailPage({ params }: PageProps) {
  const creator = creatorService.getCreatorByUsername(params.username);

  if (!creator) {
    notFound();
  }

  // Get all rooms by this creator
  const allRooms = roomService.getAllRooms();
  const creatorRooms = allRooms.filter(
    (r) => r.creator.username.toLowerCase() === creator.username.toLowerCase()
  );

  return (
    <div className="w-full min-h-screen bg-[#111714] text-[#F2EFE7]">
      {/* Banner */}
      <div className="relative h-48 md:h-64 w-full bg-[#18211C] overflow-hidden border-b border-[rgba(216,193,154,0.14)]">
        <Image
          src={creator.bannerImage}
          alt={creator.name}
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111714] via-[#111714]/40 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="max-w-[1360px] mx-auto px-5 md:px-12 -mt-16 md:-mt-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[rgba(216,193,154,0.14)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#111714] shadow-2xl bg-[#18211C]">
              <Image
                src={creator.avatar}
                alt={creator.name}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl md:text-4xl text-[#F2EFE7]">
                  {creator.name}
                </h1>
                <span className="text-xs text-[#898C83]">@{creator.username}</span>
              </div>
              <p className="text-xs md:text-sm text-[#C0BBAF] max-w-lg leading-relaxed">
                {creator.bio}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#898C83] pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D8C19A]" />
                  {creator.location}
                </span>
                <span>•</span>
                <span>{creator.followersCount} Followers</span>
                <span>•</span>
                <span>{creator.makeoversCount} Published Makeovers</span>
              </div>
            </div>
          </div>

          <CreatorProfileActions creator={creator} />
        </div>
      </div>

      {/* Published Transformations Portfolio */}
      <main className="max-w-[1360px] mx-auto px-5 md:px-12 py-12 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-[#F2EFE7]">
            Published Room Transformations ({creatorRooms.length})
          </h2>
          <Link
            href="/creators"
            className="text-xs uppercase tracking-wider text-[#D8C19A] hover:text-[#f5ddb4] flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Creators</span>
          </Link>
        </div>

        {creatorRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creatorRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-[#898C83] text-sm">
            No transformations published yet.
          </div>
        )}
      </main>
    </div>
  );
}
