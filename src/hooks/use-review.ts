import { Reviewscommand } from '@/features/reviews/command/reviews.command';
import { ReviewsQuery } from '@/features/reviews/query/reviews.query';
import useReviewFormState from '@/stores/reviews/useReviewFormState';
import { useReviewStore } from '@/stores/reviews/useReviewsStore';
import { useUserStore } from '@/stores/user/useUserStore';
import type { ProductReviewsProps } from '@/types/product';
import { useEffect } from 'react';

const useReview = ({ productId }: ProductReviewsProps) => {
  const user = useUserStore((state) => state.user);

  const setReviews = useReviewStore((state) => state.setReviews);
  const { form, setComment, setHoveringRate, setRate, resetForm, setForm } =
    useReviewFormState();
  const {
    getReviewsQuery: { data: reviews, refetch, isLoading },
  } = ReviewsQuery(productId);

  useEffect(() => {
    if (reviews?.length) setReviews(reviews);
  }, [reviews, isLoading]);

  const {
    AddReviewCommand: { mutate: AddReviewMutation },
    removeReviewCommand: { mutate: removeReviewMutation },
    updateRevieCommand: { mutate: updateReviewMutation },
  } = Reviewscommand({ refetch });

  const handleSubmitReview = () => {
    if (!form.comment.trim() || form.rate == 0) return;
    if (form.mode == 'edit' && form.reviewId) {
      updateReviewMutation({
        comment: form.comment.trim(),
        rating: form.rate,
        _id: form.reviewId,
      });
    } else {
      AddReviewMutation({
        user: {
          username: user!.username,
          profileImg: user!.profileImg,
          _id: user!._id,
        },
        rating: form.rate,
        comment: form.comment.trim(),
        product: productId,
      });
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

  return {
    form,
    handleOnEdit,
    handleSubmitReview,
    removeReviewMutation,
    reviews,
    user,
    setComment,
    setRate,
    setHoveringRate,
  };
};

export default useReview;
