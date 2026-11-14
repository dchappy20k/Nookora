'use client';

import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, Share2 } from 'lucide-react';
import { CreatorProfile } from '@/types';
import { storageService } from '@/services/storageService';
import { useToast } from '@/components/common/Toast';

export const CreatorProfileActions: React.FC<{ creator: CreatorProfile }> = ({ creator }) => {
  const { showToast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const followed = storageService.getFollowedCreatorIds();
    setIsFollowing(followed.includes(creator.id));
  }, [creator.id]);

  const handleFollowToggle = () => {
    const followed = storageService.toggleFollowCreator(creator.id);
    setIsFollowing(followed);
    showToast(
      followed ? `Now following ${creator.name}` : `Unfollowed ${creator.name}`,
      'info'
    );
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Creator profile link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleFollowToggle}
        className={`px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
          isFollowing
            ? 'bg-[#202A24] text-[#D8C19A] border border-[#D8C19A]/40'
            : 'bg-[#D8C19A] text-[#111714] hover:bg-[#B89565]'
        }`}
      >
        {isFollowing ? (
          <>
            <UserCheck className="w-4 h-4" />
            <span>Following</span>
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            <span>Follow Creator</span>
          </>
        )}
      </button>

      <button
        onClick={handleShare}
        className="p-2.5 rounded bg-[#18211C] border border-[rgba(216,193,154,0.15)] text-[#C0BBAF] hover:text-[#D8C19A] transition-colors"
        title="Share Creator Profile"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
};
