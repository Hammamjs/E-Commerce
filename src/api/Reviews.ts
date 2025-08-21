import type { Review } from '@/types/product';
import { createInstance, apiEndPoint } from './BaseUrl';

export const getReviewsForProduct = async (productId: string) => {
  const response = await createInstance.get(
    apiEndPoint + `/products/${productId}/reviews`
  );

  return response.data;
};

export const addReview = async (review: Omit<Review, 'createdAt' | '_id'>) => {
  const response = await createInstance.post(apiEndPoint + `/reviews`, review);

  return response.data;
};

export const updateReview = async (
  review: Pick<Review, 'comment' | 'rating' | '_id'>
) => {
  const response = await createInstance.put(
    apiEndPoint + `/reviews/${review._id}`,
    review
  );

  return response.data;
};

export const removeReview = async (id: string) => {
  const response = await createInstance.delete(apiEndPoint + `/reviews/${id}`);

  return response.data;
};
