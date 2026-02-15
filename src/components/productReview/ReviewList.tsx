import { Card, CardContent } from '../ui/card';
import { ReviewItem } from './index';
import { useUserStore } from '@/stores/user/useUserStore';

type ReviwesListProps = {
  reviewIds: string[];
};

const ReviewList = ({ reviewIds }: ReviwesListProps) => {
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
        <ReviewItem reviewId={id} userId={userId} />
      ))}
    </div>
  );
};

export default ReviewList;
