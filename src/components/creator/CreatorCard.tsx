'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, UserPlus, UserCheck, Sparkles } from 'lucide-react';
import { CreatorProfile } from '@/types';
import { storageService } from '@/services/storageService';
import { useToast } from '@/components/common/Toast';

interface CreatorCardProps {
  creator: CreatorProfile;
  className?: string;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator, className = '' }) => {
  const { showToast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const followed = storageService.getFollowedCreatorIds();
    setIsFollowing(followed.includes(creator.id));
  }, [creator.id]);

  const handleFollowToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const followed = storageService.toggleFollowCreator(creator.id);
    setIsFollowing(followed);
    showToast(
      followed ? `Now following ${creator.name}` : `Unfollowed ${creator.name}`,
      'info'
    );
  };

  return (
    <div
      className={`group bg-[#18211C] border border-[rgba(216,193,154,0.12)] hover:border-[#D8C19A]/40 rounded-xl overflow-hidden ambient-shadow transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Banner with Avatar Overlay */}
        <div className="relative h-28 w-full bg-[#202A24] overflow-hidden">
          <Image
            src={creator.bannerImage}
            alt={`${creator.name} banner`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18211C] via-[#18211C]/30 to-transparent" />
        </div>

        {/* Avatar & Header */}
        <div className="px-6 -mt-10 relative flex items-end justify-between">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D8C19A]/50 bg-[#18211C] shadow-xl">
            <Image
              src={creator.avatar}
              alt={creator.name}
              fill
              className="object-cover"
            />
          </div>

          <button
            onClick={handleFollowToggle}
            className={`px-3 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              isFollowing
                ? 'bg-[#202A24] text-[#D8C19A] border border-[#D8C19A]/40'
                : 'bg-[#D8C19A] text-[#111714] hover:bg-[#B89565]'
            }`}
          >
            {isFollowing ? (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span>Following</span>
              </>
            ) : (
              <>
                <UserPlus className="w-3.5 h-3.5" />
                <span>Follow</span>
              </>
            )}
          </button>
        </div>

        {/* Bio & Details */}
        <div className="p-6 space-y-3">
          <div>
            <Link href={`/creators/${creator.username}`}>
              <h3 className="font-serif text-lg text-[#F2EFE7] group-hover:text-[#D8C19A] transition-colors leading-tight">
                {creator.name}
              </h3>
            </Link>
            <span className="text-xs text-[#898C83] flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-[#D8C19A]" />
              {creator.location}
            </span>
          </div>

          <p className="text-xs text-[#C0BBAF] line-clamp-2 leading-relaxed">
            {creator.bio}
          </p>

          {/* Aesthetic Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {creator.styleTags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] uppercase tracking-wider text-[#C0BBAF] bg-[#202A24] px-2 py-0.5 rounded border border-[rgba(216,193,154,0.1)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="px-6 py-4 bg-[#141b17] border-t border-[rgba(216,193,154,0.08)] flex items-center justify-between text-xs">
        <div>
          <span className="font-semibold text-[#F2EFE7]">{creator.makeoversCount}</span>
          <span className="text-[#898C83] ml-1">Makeovers</span>
        </div>
        <div>
          <span className="font-semibold text-[#D8C19A]">{creator.followersCount}</span>
          <span className="text-[#898C83] ml-1">Followers</span>
        </div>
        <Link
          href={`/creators/${creator.username}`}
          className="text-[#D8C19A] hover:text-[#f5ddb4] flex items-center gap-0.5 text-[11px] uppercase tracking-wider font-semibold"
        >
          <Sparkles className="w-3 h-3" />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};
