'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, Share2, Heart, Check } from 'lucide-react';
import { RoomMakeover } from '@/types';
import { storageService } from '@/services/storageService';
import { useToast } from '@/components/common/Toast';

export const RoomDetailActions: React.FC<{ room: RoomMakeover }> = ({ room }) => {
  const { showToast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsSaved(storageService.isRoomSaved(room.id));
    const liked = storageService.getLikedRoomIds();
    setIsLiked(liked.includes(room.id));
  }, [room.id]);

  const handleSaveToggle = () => {
    const saved = storageService.toggleSaveRoom(room.id);
    setIsSaved(saved);
    showToast(
      saved ? `Saved "${room.title}" to your collections` : `Removed from your collections`,
      'success'
    );
  };

  const handleLikeToggle = () => {
    const liked = storageService.toggleLikeRoom(room.id);
    setIsLiked(liked);
    showToast(liked ? 'Added to your favorites' : 'Removed from favorites', 'info');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast('Room makeover link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLikeToggle}
        className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all border ${
          isLiked
            ? 'bg-[#202A24] border-red-500/40 text-red-400'
            : 'bg-[#18211C] border-[rgba(216,193,154,0.15)] text-[#C0BBAF] hover:text-[#F2EFE7]'
        }`}
        aria-label="Like this makeover"
      >
        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
        <span>{isLiked ? 'Favorited' : 'Like'}</span>
      </button>

      <button
        onClick={handleSaveToggle}
        className={`px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
          isSaved
            ? 'bg-[#D8C19A] text-[#111714]'
            : 'bg-[#202A24] border border-[rgba(216,193,154,0.3)] text-[#F2EFE7] hover:border-[#D8C19A]'
        }`}
        aria-label="Save to collections"
      >
        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
        <span>{isSaved ? 'Saved in Collections' : 'Save Nook'}</span>
      </button>

      <button
        onClick={handleShare}
        className="p-2 rounded bg-[#18211C] border border-[rgba(216,193,154,0.15)] text-[#C0BBAF] hover:text-[#D8C19A] transition-colors"
        title="Share room makeover"
        aria-label="Share room"
      >
        {copied ? <Check className="w-4 h-4 text-[#929F87]" /> : <Share2 className="w-4 h-4" />}
      </button>
    </div>
  );
};
