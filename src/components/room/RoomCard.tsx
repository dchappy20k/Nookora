'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Heart, MapPin, Maximize2, ArrowUpRight } from 'lucide-react';
import { RoomMakeover } from '@/types';
import { storageService } from '@/services/storageService';
import { useToast } from '@/components/common/Toast';

interface RoomCardProps {
  room: RoomMakeover;
  variant?: 'standard' | 'compact' | 'spotlight';
  className?: string;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  variant = 'standard',
  className = '',
}) => {
  const { showToast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(room.likesCount);

  useEffect(() => {
    setIsSaved(storageService.isRoomSaved(room.id));
    const likedRooms = storageService.getLikedRoomIds();
    setIsLiked(likedRooms.includes(room.id));
  }, [room.id]);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = storageService.toggleSaveRoom(room.id);
    setIsSaved(saved);
    showToast(
      saved ? `Saved "${room.title}" to your collection` : `Removed from saved collections`,
      'success'
    );
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const liked = storageService.toggleLikeRoom(room.id);
    setIsLiked(liked);
    setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
  };

  if (variant === 'spotlight') {
    return (
      <div className={`relative bg-[#18211C] border border-[rgba(216,193,154,0.18)] rounded-xl overflow-hidden ambient-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 ${className}`}>
        {/* Visual Showcase */}
        <div className="lg:col-span-7 relative min-h-[340px] md:min-h-[420px] rounded-lg overflow-hidden group">
          <Image
            src={room.afterImage}
            alt={room.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-[#111714]/90 backdrop-blur-md border border-[#D8C19A]/30 text-[#D8C19A] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              SPOTLIGHT
            </span>
            <span className="bg-[#111714]/80 backdrop-blur-md text-[#C0BBAF] text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
              {room.aesthetic}
            </span>
          </div>

          <button
            onClick={handleSaveToggle}
            className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors ${
              isSaved
                ? 'bg-[#D8C19A] text-[#111714]'
                : 'bg-[#111714]/70 text-[#F2EFE7] hover:bg-[#D8C19A] hover:text-[#111714]'
            }`}
            aria-label={isSaved ? 'Unsave room' : 'Save room'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#898C83]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D8C19A]" />
                {room.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5" />
                {room.dimensions} ({room.areaSqFt} sq ft)
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-[#F2EFE7] font-normal leading-snug">
              {room.title}
            </h3>

            <p className="text-sm text-[#C0BBAF] leading-relaxed line-clamp-3">
              {room.subtitle}
            </p>

            {/* Total Budget Pill */}
            <div className="p-4 rounded-lg bg-[#202A24] border border-[rgba(216,193,154,0.14)] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#898C83] block">
                  Total Makeover Budget
                </span>
                <span className="text-xl font-serif text-[#D8C19A] font-semibold">
                  ₹{room.totalBudget.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs text-[#929F87] font-medium px-2 py-1 bg-[#18211C] rounded border border-[#929F87]/20">
                100% Drill-Free
              </span>
            </div>

            {/* Creator Badge */}
            <Link
              href={`/creators/${room.creator.username}`}
              className="flex items-center gap-3 pt-2 group"
            >
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#D8C19A]/40">
                <Image
                  src={room.creator.avatar}
                  alt={room.creator.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#F2EFE7] group-hover:text-[#D8C19A] transition-colors block">
                  {room.creator.name}
                </span>
                <span className="text-[11px] text-[#898C83]">
                  {room.creator.makeoversCount} transformations
                </span>
              </div>
            </Link>
          </div>

          <div className="pt-6 border-t border-[rgba(216,193,154,0.1)] flex items-center justify-between">
            <button
              onClick={handleLikeToggle}
              className={`flex items-center gap-1.5 text-xs transition-colors ${
                isLiked ? 'text-red-400' : 'text-[#898C83] hover:text-[#F2EFE7]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <Link
              href={`/rooms/${room.slug}`}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#D8C19A] hover:text-[#f5ddb4] group"
            >
              <span>Explore Budget & Room</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group bg-[#18211C] rounded-xl overflow-hidden border border-[rgba(216,193,154,0.12)] hover:border-[rgba(216,193,154,0.3)] transition-all duration-300 ambient-shadow flex flex-col ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#202A24]">
        <Image
          src={room.afterImage}
          alt={room.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-[1.02]"
        />

        {/* Aesthetic Chip */}
        <div className="absolute top-3.5 left-3.5">
          <span className="bg-[#111714]/85 backdrop-blur-md text-[#D8C19A] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">
            {room.aesthetic}
          </span>
        </div>

        {/* Bookmark / Save Button */}
        <button
          onClick={handleSaveToggle}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-colors ${
            isSaved
              ? 'bg-[#D8C19A] text-[#111714]'
              : 'bg-[#111714]/70 text-[#F2EFE7] hover:bg-[#D8C19A] hover:text-[#111714]'
          }`}
          aria-label={isSaved ? 'Unsave room' : 'Save room'}
        >
          <Bookmark className="w-3.5 h-3.5 fill-current" />
        </button>

        {/* Budget Pill Overlay */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <div className="bg-[#111714]/90 backdrop-blur-md px-3 py-1 rounded border border-[#D8C19A]/20">
            <span className="text-[9px] uppercase tracking-wider text-[#898C83] mr-1.5 font-sans">
              Total
            </span>
            <span className="text-xs font-serif text-[#D8C19A] font-semibold">
              ₹{room.totalBudget.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="bg-[#111714]/85 backdrop-blur-md text-[10px] text-[#C0BBAF] px-2 py-1 rounded font-sans">
            {room.dimensions}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[11px] text-[#898C83] flex items-center gap-1 mb-1">
            <MapPin className="w-3 h-3 text-[#D8C19A]" />
            {room.location}
          </span>
          <Link href={`/rooms/${room.slug}`}>
            <h4 className="font-serif text-lg text-[#F2EFE7] group-hover:text-[#D8C19A] transition-colors leading-snug">
              {room.title}
            </h4>
          </Link>
          <p className="text-xs text-[#C0BBAF] line-clamp-2 mt-1 leading-relaxed">
            {room.subtitle}
          </p>
        </div>

        {/* Creator & Link Bar */}
        <div className="pt-3 border-t border-[rgba(216,193,154,0.08)] flex items-center justify-between">
          <Link
            href={`/creators/${room.creator.username}`}
            className="flex items-center gap-2 group/creator"
          >
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-stone-700">
              <Image
                src={room.creator.avatar}
                alt={room.creator.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[11px] text-[#C0BBAF] group-hover/creator:text-[#F2EFE7] transition-colors font-medium">
              {room.creator.name}
            </span>
          </Link>

          <Link
            href={`/rooms/${room.slug}`}
            className="text-[11px] uppercase tracking-wider font-semibold text-[#D8C19A] hover:text-[#f5ddb4] flex items-center gap-0.5"
          >
            <span>Breakdown</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
