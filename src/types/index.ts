export type BudgetTier = 'under-2k' | 'under-5k' | 'under-10k' | 'under-20k' | 'all';

export type AestheticCategory =
  | 'Japandi'
  | 'Korean Minimal'
  | 'Cozy Bedroom'
  | 'Dark Academia'
  | 'Modern Indian'
  | 'Warm Neutral'
  | 'Gaming Setup'
  | 'Boho'
  | 'Small Space Living';

export type SpaceType =
  | 'Bedroom'
  | 'PG Room'
  | 'Hostel Nook'
  | 'Study Alcove'
  | 'Rental Living'
  | 'Studio Apartment';

export interface BudgetItem {
  id: string;
  name: string;
  category: 'Lighting' | 'Bedding' | 'Furniture' | 'Wall Decor' | 'Storage' | 'Rugs' | 'Plants' | 'Desk Accessories' | 'Hardware';
  price: number; // in INR
  retailer: string;
  url: string;
  drillFree: boolean;
  notes?: string;
  image?: string;
}

export interface RoomMakeover {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  aesthetic: AestheticCategory;
  spaceType: SpaceType;
  dimensions: string; // e.g. "10x11 ft"
  areaSqFt: number; // e.g. 110
  location: string; // e.g. "Indiranagar, Bangalore"
  totalBudget: number; // in INR
  budgetTier: BudgetTier;
  beforeImage: string;
  afterImage: string;
  galleryImages?: string[];
  featured?: boolean;
  trending?: boolean;
  compactLiving?: boolean;
  creator: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    location: string;
    makeoversCount: number;
    followersCount: string;
  };
  techniques: string[];
  lightingProtocol: string;
  items: BudgetItem[];
  likesCount: number;
  savesCount: number;
  createdAt: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  retailer: string;
  url: string;
  image: string;
  aesthetic: AestheticCategory;
  drillFree: boolean;
  rating?: number;
  reviewsCount?: number;
}

export interface CreatorProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bannerImage: string;
  bio: string;
  location: string;
  styleTags: AestheticCategory[];
  makeoversCount: number;
  followersCount: string;
  isFollowing?: boolean;
  instagram?: string;
  youtube?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  roomIds: string[];
  coverImage: string;
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  aesthetic: string;
  budgetTier: BudgetTier;
  spaceType: string;
  maxBudget?: number;
  sortBy: 'featured' | 'budget-asc' | 'budget-desc' | 'popular' | 'newest';
}
