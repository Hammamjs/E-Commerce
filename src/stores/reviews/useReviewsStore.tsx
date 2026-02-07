import type { Review } from '@/types/product';
import { derivedState } from '@/utils/derivedState';
import { create } from 'zustand';

interface Reviews {
  reviews: Review[];
  reviewsById: Record<string, Review>;
  reviewIds: string[];
  getReview: (id: string) => Review;
  setReviews: (reviews: Review[]) => void;
  addReview: (newReview: Review) => void;
  removeReview: (id: string) => void;
}

export const useReviewStore = create<Reviews>((set, get) => ({
  reviews: [],
  reviewIds: [],
  reviewsById: {},
  addReview: (newReview) =>
    set((state) => {
      const reviews = [...state.reviews, newReview];
      const { ids: reviewIds, map: reviewsById } = derivedState(reviews);
      return {
        reviews,
        reviewIds,
        reviewsById,
      };
    }),

  getReview: (id: string) => get().reviewsById[id],

  removeReview: (id) =>
    set((state) => {
      const reviews = state.reviews.filter((review) => review._id !== id);

      const { ids: reviewIds, map: reviewsById } = derivedState(reviews);
      return {
        reviews,
        reviewIds,
        reviewsById,
      };
    }),
  setReviews: (reviews) =>
    set(() => {
      const { ids: reviewIds, map: reviewsById } = derivedState(reviews);
      return {
        reviews,
        reviewIds,
        reviewsById,
      };
    }),
}));
