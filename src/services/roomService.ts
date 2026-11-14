import { ROOMS } from '@/data/rooms';
import { BudgetTier, FilterState, RoomMakeover } from '@/types';

export const roomService = {
  getAllRooms: (): RoomMakeover[] => {
    return ROOMS;
  },

  getRoomBySlug: (slug: string): RoomMakeover | undefined => {
    return ROOMS.find((room) => room.slug === slug);
  },

  getFeaturedRooms: (): RoomMakeover[] => {
    return ROOMS.filter((room) => room.featured);
  },

  getTrendingRooms: (): RoomMakeover[] => {
    return ROOMS.filter((room) => room.trending);
  },

  getCompactRooms: (): RoomMakeover[] => {
    return ROOMS.filter((room) => room.compactLiving);
  },

  getRoomsByBudgetTier: (tier: BudgetTier): RoomMakeover[] => {
    if (tier === 'all') return ROOMS;
    return ROOMS.filter((room) => room.budgetTier === tier);
  },

  getSimilarRooms: (currentRoomId: string, aesthetic: string, limit = 3): RoomMakeover[] => {
    return ROOMS.filter((r) => r.id !== currentRoomId && r.aesthetic === aesthetic).slice(0, limit);
  },

  filterRooms: (filters: FilterState): RoomMakeover[] => {
    let result = [...ROOMS];

    // Search query filter
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.aesthetic.toLowerCase().includes(q) ||
          r.creator.name.toLowerCase().includes(q)
      );
    }

    // Aesthetic filter
    if (filters.aesthetic && filters.aesthetic !== 'All') {
      result = result.filter((r) => r.aesthetic === filters.aesthetic);
    }

    // Budget tier filter
    if (filters.budgetTier && filters.budgetTier !== 'all') {
      result = result.filter((r) => r.budgetTier === filters.budgetTier);
    }

    // Space type filter
    if (filters.spaceType && filters.spaceType !== 'All') {
      result = result.filter((r) => r.spaceType === filters.spaceType);
    }

    // Max budget slider
    const maxBudget = filters.maxBudget;
    if (maxBudget && maxBudget > 0) {
      result = result.filter((r) => r.totalBudget <= maxBudget);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'budget-asc':
        result.sort((a, b) => a.totalBudget - b.totalBudget);
        break;
      case 'budget-desc':
        result.sort((a, b) => b.totalBudget - a.totalBudget);
        break;
      case 'popular':
        result.sort((a, b) => b.likesCount - a.likesCount);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        // 'featured'
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  },
};
