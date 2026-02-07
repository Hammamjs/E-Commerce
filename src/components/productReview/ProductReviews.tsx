import type { ProductReviewsProps } from '@/types/product';
import useReview from '@/hooks/use-review';

import FormReview from './FormReview';
import { ReviewList } from '.';
import { useReviewStore } from '@/stores/reviews/useReviewsStore';
import { useShallow } from 'zustand/shallow';

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { reviews } = useReview({ productId });

  const { reviewsIds } = useReviewStore(
    useShallow((state) => ({ reviewsIds: state.reviewIds })),
  );

  return (
    <div className="space-y-8">
      {/* Add Review Form */}
      <FormReview productId={productId} />
      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">
          Customer Reviews ({reviews?.length})
        </h3>
        <ReviewList reviewIds={reviewsIds} />
      </div>
    </div>
  );
};

export default ProductReviews;
