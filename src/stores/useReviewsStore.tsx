import type { Review } from '@/types/product';
import { create } from 'zustand';

interface Reviews {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  addReview: (newReview: Review) => void;
  removeReview: (id: string) => void;
}

export const useReviewStore = create<Reviews>((set) => ({
  reviews: [],
  addReview: (newReview) =>
    set((state) => ({
      reviews: [...state.reviews, newReview],
    })),
  removeReview: (id) =>
    set((state) => ({
      reviews: state.reviews.filter((review) => review._id !== id),
    })),
  setReviews: (reviews) =>
    set({
      reviews,
    }),
}));
