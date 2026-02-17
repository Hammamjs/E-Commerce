import type { Review } from '@/types/product';
import { createInstance, apiEndPoint } from '../../../api/BaseUrl';

export const getReviewsForProduct = async (productId: string) => {
  const response = await createInstance.get(
    apiEndPoint + `/products/${productId}/reviews`,
  );

  return response.data;
};

export const addReviewApi = async (
  review: Omit<Review, 'createdAt' | '_id'>,
) => {
  const response = await createInstance.post(apiEndPoint + `/reviews`, review);

  return response.data;
};

export const updateReviewApi = async (
  review: Pick<Review, 'comment' | 'rating' | '_id'>,
) => {
  const response = await createInstance.put(
    apiEndPoint + `/reviews/${review._id}`,
    review,
  );

  return response.data;
};

export const removeReviewApi = async (id: string) => {
  const response = await createInstance.delete(apiEndPoint + `/reviews/${id}`);

  return response.data;
};
