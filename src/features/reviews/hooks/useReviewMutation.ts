import {
  addReviewMutation,
  removeReviewMutation,
  updateReviewMutation,
} from '@/features/reviews/command/reviews.command';
import type { UserInfo } from '@/types/User';

type UpdateReviewParams = {
  comment: string;
  rating: number;
  _id: string;
};

type User = Pick<UserInfo, '_id' | 'profileImg' | 'username'>;

interface AddReviewParams extends User {
  comment: string;
  product: string;
  rating: number;
}

const useReviewMutation = () => {
  const addReview = addReviewMutation();
  const updateReview = updateReviewMutation();
  const removeReview = removeReviewMutation();

  const update = ({ _id, comment, rating }: UpdateReviewParams) =>
    updateReview.mutate({
      _id,
      comment,
      rating,
    });

  const add = ({
    _id,
    comment,
    product,
    profileImg,
    rating,
    username,
  }: AddReviewParams) =>
    addReview.mutate({
      user: {
        _id,
        username,
        profileImg,
      },
      comment,
      rating,
      product,
    });

  const remove = (reviewId: string) => removeReview.mutate(reviewId);

  return { update, add, remove };
};

export default useReviewMutation;
