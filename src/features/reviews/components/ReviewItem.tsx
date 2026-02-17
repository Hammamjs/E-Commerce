import { Edit, Trash, User } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import RenderStar from './RenderStar';
import type { Review } from '@/types/product';

type ReviewItemProps = {
  userId: string;
  review: Review;
  handleReview: (reviewId: string) => void;
  remove: (reviewId: string) => void;
};

const ReviewItem = ({
  review,
  userId,
  handleReview,
  remove,
}: ReviewItemProps) => {
  return (
    <Card
      key={review._id}
      className="bg-card/50 backdrop-blur-sm border-border/20"
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-5 w-5 text-primary" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  {review.user?.username}
                </h4>
                <div className="flex items-center space-x-1">
                  <RenderStar interactive />
                </div>
              </div>
              <div className="text-center">
                <span className="text-sm text-muted-foreground text-end">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                {review.user._id === userId && (
                  <div className="my-3 flex gap-2">
                    <Button
                      onClick={() => remove(review._id)}
                      className="bg-red-500 block p-2 w-8 h-8 hover:bg-red-600 transition-colors"
                    >
                      <Trash />
                    </Button>
                    <Button
                      onClick={() => handleReview(review._id)}
                      className="bg-green-500 p-2 w-8 h-8 hover:bg-green-600 transition-colors"
                    >
                      <Edit />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed">
              {review.comment}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
