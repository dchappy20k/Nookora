import { CREATORS } from '@/data/creators';
import { CreatorProfile } from '@/types';

export const creatorService = {
  getAllCreators: (): CreatorProfile[] => {
    return CREATORS;
  },

  getCreatorByUsername: (username: string): CreatorProfile | undefined => {
    return CREATORS.find((c) => c.username.toLowerCase() === username.toLowerCase());
  },
};
