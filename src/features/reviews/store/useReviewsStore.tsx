import type { Review } from '@/types/product';
import { derivedState } from '@/shared/utils/derivedState';
import { create } from 'zustand';

interface Reviews {
  items: Review[];
  byId: Record<string, Review>;
  ids: string[];
  getReview: (id: string) => Review;
  setReviews: (reviews: Review[]) => void;
  addReview: (newReview: Review) => void;
  removeReview: (id: string) => void;
}

export const useReviewStore = create<Reviews>((set, get) => ({
  items: [],
  ids: [],
  byId: {},
  addReview: (newReview) =>
    set((state) => {
      const reviews = [...state.items, newReview];
      const { ids, map: byId, items } = derivedState(reviews);
      return {
        items,
        ids,
        byId,
      };
    }),

  getReview: (id: string) => get().byId[id],

  removeReview: (id) =>
    set((state) => {
      const reviews = state.items.filter((review) => review._id !== id);

      const { ids, map: byId, items } = derivedState(reviews);
      return {
        ids,
        byId,
        items,
      };
    }),
  setReviews: (reviews) =>
    set(() => {
      const { ids, map: byId, items } = derivedState(reviews);
      return {
        items,
        ids,
        byId,
      };
    }),
}));
