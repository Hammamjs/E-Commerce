import type { ProductReviewsProps } from '@/types/product';
import useReview from '@/features/reviews/hooks/useReview';

import FormReview from './FormReview';
import { ReviewList } from '.';

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const {
    reviews,
    normalizedReviews: { allIds, byId },
    handleOnEdit,
    remove,
  } = useReview({ productId });

  return (
    <div className="space-y-8">
      {/* Add Review Form */}
      <FormReview productId={productId} />
      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">
          Customer Reviews ({reviews?.length})
        </h3>
        <ReviewList
          reviewIds={allIds}
          byId={byId}
          handleReview={handleOnEdit}
          remove={remove}
        />
      </div>
    </div>
  );
};

export default ProductReviews;
