'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Bookmark, Heart, Users, PlusCircle, Settings, LogOut, Sparkles } from 'lucide-react';
import { storageService } from '@/services/storageService';
import { useToast } from '@/components/common/Toast';

export default function ProfilePage() {
  const { showToast } = useToast();
  const [savedCount, setSavedCount] = useState(0);
  const [likedCount, setLikedCount] = useState(0);
  const [followedCount, setFollowedCount] = useState(0);

  useEffect(() => {
    setSavedCount(storageService.getSavedRoomIds().length);
    setLikedCount(storageService.getLikedRoomIds().length);
    setFollowedCount(storageService.getFollowedCreatorIds().length);
  }, []);

  const handleSignOut = () => {
    showToast('Signed out of NOOKORA', 'info');
  };

  return (
    <div className="w-full min-h-screen bg-[#111714] text-[#F2EFE7] py-12">
      <div className="max-w-[1360px] mx-auto px-5 md:px-12 space-y-8">
        {/* Profile Header */}
        <div className="p-8 rounded-2xl bg-[#18211C] border border-[rgba(216,193,154,0.18)] ambient-shadow flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full bg-[#202A24] border-2 border-[#D8C19A] flex items-center justify-center text-[#D8C19A] text-2xl font-serif">
              T
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D8C19A]">
                NOOKORA Member
              </span>
              <h1 className="font-serif text-3xl text-[#F2EFE7]">
                Tanvi S.
              </h1>
              <span className="text-xs text-[#898C83]">tanvi.user@example.com</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/upload"
              className="px-5 py-2.5 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-colors flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Creator Studio</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="p-2.5 rounded bg-[#202A24] text-[#898C83] hover:text-red-400 border border-stone-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/saved"
            className="p-6 rounded-xl bg-[#18211C] border border-[rgba(216,193,154,0.12)] hover:border-[#D8C19A]/40 transition-all ambient-shadow group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#898C83]">Saved Rooms</span>
              <Bookmark className="w-4 h-4 text-[#D8C19A]" />
            </div>
            <span className="font-serif text-3xl text-[#F2EFE7] group-hover:text-[#D8C19A] transition-colors">
              {savedCount}
            </span>
            <span className="text-xs text-[#898C83] block mt-1">Personal mood boards</span>
          </Link>

          <div className="p-6 rounded-xl bg-[#18211C] border border-[rgba(216,193,154,0.12)] ambient-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#898C83]">Favorited Spaces</span>
              <Heart className="w-4 h-4 text-red-400" />
            </div>
            <span className="font-serif text-3xl text-[#F2EFE7]">{likedCount}</span>
            <span className="text-xs text-[#898C83] block mt-1">Liked transformations</span>
          </div>

          <Link
            href="/creators"
            className="p-6 rounded-xl bg-[#18211C] border border-[rgba(216,193,154,0.12)] hover:border-[#D8C19A]/40 transition-all ambient-shadow group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#898C83]">Creators Followed</span>
              <Users className="w-4 h-4 text-[#929F87]" />
            </div>
            <span className="font-serif text-3xl text-[#F2EFE7] group-hover:text-[#D8C19A] transition-colors">
              {followedCount}
            </span>
            <span className="text-xs text-[#898C83] block mt-1">Stylists & architects</span>
          </Link>
        </div>

        {/* Member Aesthetic Profile */}
        <div className="p-8 rounded-xl bg-[#18211C] border border-[rgba(216,193,154,0.14)] space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#D8C19A]">
            <Sparkles className="w-4 h-4" />
            <span>Rental Living Preferences</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#C0BBAF]">
            <div>
              <span className="text-[#898C83] block mb-1">Target Makeover Ceiling</span>
              <p className="font-serif text-xl text-[#F2EFE7]">Under ₹10,000</p>
            </div>
            <div>
              <span className="text-[#898C83] block mb-1">Favorite Aesthetic</span>
              <p className="font-serif text-xl text-[#F2EFE7]">Japandi & Warm Neutral</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
