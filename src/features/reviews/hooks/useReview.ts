import { useReviewsQuery } from '@/features/reviews/query/reviews.query';
import useReviewFormState from '@/features/reviews/store/useReviewFormState';
import { useUserStore } from '@/stores/user/useUserStore';
import type { ProductReviewsProps, Review } from '@/types/product';
import useReviewMutation from './useReviewMutation';
import { useMemo } from 'react';

const useReview = ({ productId }: ProductReviewsProps) => {
  const user = useUserStore((state) => state.user);

  const { form, setComment, setHoveringRate, setRate, resetForm, setForm } =
    useReviewFormState();

  const { data: reviews } = useReviewsQuery(productId);

  // Mutation hook
  const { add, remove, update } = useReviewMutation();

  const handleSubmitReview = () => {
    if (!user) return;
    if (!form.comment.trim() || form.rate == 0) return;
    if (form.mode == 'edit' && form.reviewId) {
      const updateValues = {
        comment: form.comment.trim(),
        rating: form.rate,
        _id: form.reviewId,
      };
      update(updateValues);
    } else {
      const updateValues = {
        username: user.username,
        profileImg: user.profileImg,
        _id: user._id,
        rating: form.rate,
        comment: form.comment.trim(),
        product: productId,
      };
      add(updateValues);
    }
    resetForm();
  };

  const handleOnEdit = (reviewId: string) => {
    const review = reviews?.find((r) => r._id === reviewId);

    if (!review) return;

    setForm({
      mode: 'edit',
      reviewId,
      rate: review.rating,
      comment: review.comment,
      hoverRating: 0,
    });
  };

  const normalizedReviews = useMemo(() => {
    const byId: Record<string, Review> = {};
    const allIds: string[] = [];

    reviews?.forEach((review) => {
      byId[review._id] = review;
      allIds.push(review._id);
    });
    return {
      byId,
      allIds,
    };
  }, [reviews]);

  return {
    normalizedReviews,
    form,
    handleOnEdit,
    handleSubmitReview,
    remove,
    reviews,
    user,
    setComment,
    setRate,
    setHoveringRate,
  };
};

export default useReview;
