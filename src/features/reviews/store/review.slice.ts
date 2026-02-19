import type { StateCreator } from 'zustand';
import { derivedState } from '@/shared/utils/derivedState';
import type { storeState } from '../../../stores/useStore';
import type { Review } from '@/types/product';

export interface ReviewsSlice {
  items: Review[];
  byId: Record<string, Review>;
  ids: string[];
  getReview: (id: string) => Review;
  setReviews: (reviews: Review[]) => void;
  addReview: (newReview: Review) => void;
  removeReview: (id: string) => void;
}

export const createReviewSlice: StateCreator<
  storeState,
  [],
  [],
  ReviewsSlice
> = (set, get) => ({
  items: [],
  ids: [],
  byId: {},
  addReview: (newReview) =>
    set((state) => {
      const reviews = [...state.reviews.items, newReview];
      const { ids, map: byId, items } = derivedState(reviews);
      return {
        reviews: {
          ...state.reviews,
          items,
          ids,
          byId,
        },
      };
    }),

  getReview: (id: string) => get().reviews.byId[id],

  removeReview: (id) =>
    set((state) => {
      const reviews = state.reviews.items.filter((review) => review._id !== id);

      const { ids, map: byId, items } = derivedState(reviews);
      return {
        reviews: {
          ...state.reviews,
          ids,
          byId,
          items,
        },
      };
    }),
  setReviews: (reviews) =>
    set((state) => {
      const { ids, map: byId, items } = derivedState(reviews);
      return {
        reviews: {
          ...state.reviews,
          items,
          ids,
          byId,
        },
      };
    }),
});
