import {
  addReviewApi,
  removeReviewApi,
  updateReviewApi,
} from '@/features/reviews/api/Reviews';
import type { Review } from '@/types/product';
import { useBaseMutation } from '@/shared/lib/react-query/useBaseMutation';

export const addReviewMutation = () =>
  useBaseMutation<void, Omit<Review, 'createdAt' | '_id'>>({
    mutationFn: addReviewApi,
    invalidatedKeys: ['add-review'],
    successMessage: 'Review added successfully',
  });

export const updateReviewMutation = () =>
  useBaseMutation<void, Pick<Review, 'comment' | 'rating' | '_id'>>({
    mutationFn: updateReviewApi,
    invalidatedKeys: ['update-review'],
    successMessage: 'Review updated',
  });

export const removeReviewMutation = () =>
  useBaseMutation<void, string>({
    mutationFn: removeReviewApi,
    invalidatedKeys: ['remove-review'],
    successMessage: 'Review deleted successfully',
  });
