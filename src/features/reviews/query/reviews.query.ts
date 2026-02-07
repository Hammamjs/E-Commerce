import { getReviewsForProduct } from '@/api/Reviews';
import type { Review } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

export const ReviewsQuery = (productId: string) => {
  const getReviewsQuery = useQuery<{ data: Review[] }, Error, Review[]>({
    queryKey: ['getReviews', productId],
    queryFn: () => getReviewsForProduct(productId),
    select: (response) => response.data,
    staleTime: 10000 * 60,
  });

  return {
    getReviewsQuery,
  };
};
