'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, Sparkles, ArrowRight, Trash2, ShoppingBag } from 'lucide-react';
import { RoomCard } from '@/components/room/RoomCard';
import { roomService } from '@/services/roomService';
import { storageService } from '@/services/storageService';
import { RoomMakeover } from '@/types';

export default function SavedPage() {
  const [savedRooms, setSavedRooms] = useState<RoomMakeover[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateRooms = () => {
      const savedIds = storageService.getSavedRoomIds();
      const allRooms = roomService.getAllRooms();
      setSavedRooms(allRooms.filter((r) => savedIds.includes(r.id)));
      setLoading(false);
    };

    updateRooms();
    window.addEventListener('nookora_storage_change', updateRooms);
    return () => window.removeEventListener('nookora_storage_change', updateRooms);
  }, []);

  const totalSavedBudget = savedRooms.reduce((acc, r) => acc + r.totalBudget, 0);

  return (
    <div className="w-full min-h-screen bg-[#111714] text-[#F2EFE7]">
      {/* Header */}
      <section className="bg-[#141b17] border-b border-[rgba(216,193,154,0.14)] py-12">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-[#D8C19A] mb-1">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Personal Collection</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-[#F2EFE7]">
              Saved Room Inspirations
            </h1>
            <p className="text-xs md:text-sm text-[#C0BBAF] mt-2">
              All your bookmarked room makeovers, line-item budgets, and styling guides in one place.
            </p>
          </div>

          {savedRooms.length > 0 && (
            <div className="p-4 rounded-lg bg-[#18211C] border border-[rgba(216,193,154,0.2)] text-xs text-right self-start md:self-auto">
              <span className="text-[#898C83] uppercase tracking-wider block">
                Combined Collection Budget
              </span>
              <span className="font-serif text-2xl text-[#D8C19A] font-bold">
                ₹{totalSavedBudget.toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-[1360px] mx-auto px-5 md:px-12 py-12">
        {loading ? (
          <div className="py-20 text-center text-xs text-[#898C83]">
            Loading saved spaces...
          </div>
        ) : savedRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#18211C] border border-[rgba(216,193,154,0.2)] flex items-center justify-center mx-auto text-[#D8C19A]">
              <Bookmark className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-[#F2EFE7]">
              No saved makeovers yet
            </h2>
            <p className="text-xs text-[#C0BBAF] leading-relaxed">
              Explore the discovery feed and tap the bookmark icon on any room transformation to save it to your board.
            </p>
            <div className="pt-2">
              <Link
                href="/explore"
                className="px-6 py-3 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-colors inline-flex items-center gap-2"
              >
                <span>Discover Rooms</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
