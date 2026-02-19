import { getReviewsForProduct } from '@/features/reviews/api/Reviews';
import type { Review } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

export const reviewsKeys = {
  all: ['reviews'] as const,
  byProduct: (productId: string) => [...reviewsKeys.all, productId] as const,
};

export const useReviewsQuery = (productId: string) =>
  useQuery<{ data: Review[] }, Error, Review[]>({
    queryKey: reviewsKeys.byProduct(productId),
    queryFn: () => getReviewsForProduct(productId),
    select: (res) => res.data,
    staleTime: 10000 * 60 * 10,
    enabled: !!productId,
  });
