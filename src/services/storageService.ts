'use client';

const SAVED_ROOMS_KEY = 'nookora_saved_rooms';
const LIKED_ROOMS_KEY = 'nookora_liked_rooms';
const FOLLOWED_CREATORS_KEY = 'nookora_followed_creators';
const UPLOAD_DRAFTS_KEY = 'nookora_upload_drafts';

export const storageService = {
  getSavedRoomIds: (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(SAVED_ROOMS_KEY);
      return data ? JSON.parse(data) : ['room-01']; // default with featured room
    } catch {
      return ['room-01'];
    }
  },

  toggleSaveRoom: (roomId: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = storageService.getSavedRoomIds();
      const index = saved.indexOf(roomId);
      let isSaved = false;
      if (index > -1) {
        saved.splice(index, 1);
        isSaved = false;
      } else {
        saved.push(roomId);
        isSaved = true;
      }
      localStorage.setItem(SAVED_ROOMS_KEY, JSON.stringify(saved));
      window.dispatchEvent(new Event('nookora_storage_change'));
      return isSaved;
    } catch {
      return false;
    }
  },

  isRoomSaved: (roomId: string): boolean => {
    const saved = storageService.getSavedRoomIds();
    return saved.includes(roomId);
  },

  getLikedRoomIds: (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(LIKED_ROOMS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleLikeRoom: (roomId: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const liked = storageService.getLikedRoomIds();
      const index = liked.indexOf(roomId);
      let isLiked = false;
      if (index > -1) {
        liked.splice(index, 1);
        isLiked = false;
      } else {
        liked.push(roomId);
        isLiked = true;
      }
      localStorage.setItem(LIKED_ROOMS_KEY, JSON.stringify(liked));
      window.dispatchEvent(new Event('nookora_storage_change'));
      return isLiked;
    } catch {
      return false;
    }
  },

  getFollowedCreatorIds: (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(FOLLOWED_CREATORS_KEY);
      return data ? JSON.parse(data) : ['tanvi-sharma'];
    } catch {
      return ['tanvi-sharma'];
    }
  },

  toggleFollowCreator: (creatorId: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const followed = storageService.getFollowedCreatorIds();
      const index = followed.indexOf(creatorId);
      let isFollowed = false;
      if (index > -1) {
        followed.splice(index, 1);
        isFollowed = false;
      } else {
        followed.push(creatorId);
        isFollowed = true;
      }
      localStorage.setItem(FOLLOWED_CREATORS_KEY, JSON.stringify(followed));
      window.dispatchEvent(new Event('nookora_storage_change'));
      return isFollowed;
    } catch {
      return false;
    }
  },

  saveDraft: (draft: unknown): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(UPLOAD_DRAFTS_KEY, JSON.stringify(draft));
    } catch (e) {
      console.error(e);
    }
  },

  getDraft: <T>(): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(UPLOAD_DRAFTS_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
};
