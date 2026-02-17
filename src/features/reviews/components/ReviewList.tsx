import type { Review } from '@/types/product';
import { Card, CardContent } from '../../../components/ui/card';
import { ReviewItem } from './index';
import { useUserStore } from '@/stores/user/useUserStore';

type ReviwesListProps = {
  reviewIds: string[];
  byId: Record<string, Review>;
  handleReview: (reviewId: string) => void;
  remove: (reviewId: string) => void;
};

const ReviewList = ({
  reviewIds,
  byId,
  handleReview,
  remove,
}: ReviwesListProps) => {
  const userId = useUserStore((state) => state.user?._id);

  if (!userId) return;

  if (!reviewIds.length) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">
            No reviews yet. Be the first to review this product!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviewIds.map((id) => (
        <ReviewItem
          userId={userId}
          review={byId[id]}
          handleReview={handleReview}
          remove={remove}
        />
      ))}
    </div>
  );
};

export default ReviewList;
