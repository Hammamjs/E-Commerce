import { addReview, removeReview, updateReview } from '@/api/Reviews';
import type { Review } from '@/types/product';
import handleError from '@/utils/ErrorHandler';
import {
  useMutation,
  type QueryObserverResult,
  type RefetchOptions,
} from '@tanstack/react-query';

type ReviewCommandType<TOptions, TResult> = {
  refetch: (option?: TOptions) => Promise<TResult>;
};

type ReviewRefetchCommand = ReviewCommandType<
  RefetchOptions,
  QueryObserverResult<Review[], Error>
>;

export const Reviewscommand = ({ refetch }: ReviewRefetchCommand) => {
  const AddReviewCommand = useMutation({
    mutationKey: ['add-review'],
    mutationFn: addReview,
    onSuccess: () => {
      refetch();
    },
    onError: (err) => handleError(err, 'reviews'),
  });

  const updateRevieCommand = useMutation({
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

  const removeReviewCommand = useMutation({
    mutationKey: ['remove-review'],
    mutationFn: removeReview,
    onSuccess: () => refetch(),
    onError: handleError,
  });

  return {
    AddReviewCommand,
    updateRevieCommand,
    removeReviewCommand,
  };
};
