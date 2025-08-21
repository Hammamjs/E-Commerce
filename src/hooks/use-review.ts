import {
  addReview,
  getReviewsForProduct,
  removeReview,
  updateReview,
} from '@/api/Reviews';
import { useUserStore } from '@/stores/useUserStore';
import type { ProductReviewsProps, Review } from '@/types/product';
import handleError from '@/utils/ErrorHandler';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useReview = ({ onAddReview, productId }: ProductReviewsProps) => {
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [reviewId, setReviewId] = useState<string | null>(null);

  const user = useUserStore((state) => state.user);

  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery<{ data: Review[] }, Error, Review[]>({
    queryKey: ['getReviews', productId],
    queryFn: () => getReviewsForProduct(productId),
    select: (response) => response.data,
  });

  const { mutate: AddReviewMutation } = useMutation({
    mutationKey: ['add-review'],
    mutationFn: addReview,
    onSuccess: () => {
      refetch();
    },
    onError: (err) => handleError(err, 'reviews'),
  });

  const { mutate: updateReviewMutation } = useMutation({
    mutationKey: ['update-review'],
    mutationFn: updateReview,
    onSuccess: (data) => {
      refetch();
      console.log('Review Added successfully');
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: removeReviewMutation } = useMutation({
    mutationKey: ['remove-review'],
    mutationFn: removeReview,
    onSuccess: (data) => {
      refetch();
      console.log('Review Added successfully');
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (!isLoading) console.log('Reviews ', reviews);
  }, [reviews]);

  const handleSubmitReview = () => {
    if (newRating > 0 && newComment.trim()) {
      onAddReview(newRating, newComment.trim());
      if (isEdit) {
        updateReviewMutation({
          comment: newComment.trim(),
          rating: newRating,
          _id: reviewId!,
        });
        setIsEdit(false);
      } else {
        AddReviewMutation({
          user: {
            username: user!.username,
            profileImg: user!.profileImg,
            _id: user!._id,
          },
          rating: newRating,
          comment: newComment.trim(),
          product: productId,
        });
      }
      setNewRating(0);
      setNewComment('');
    }
  };

  const handleOnEdit = (reviewId: string) => {
    setIsEdit(true);
    setReviewId(reviewId);
    const review = reviews?.find((review) => review._id === reviewId);
    if (!review) {
      setIsEdit(false);
      return;
    }
    setNewComment(review.comment);
    setNewRating(review.rating);
  };

  return {
    newRating,
    setNewRating,
    newComment,
    setNewComment,
    hoveredRating,
    setHoveredRating,
    handleOnEdit,
    handleSubmitReview,
    removeReviewMutation,
    reviews,
    user,
  };
};

export default useReview;
