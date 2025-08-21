import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Edit, Star, Trash, User } from 'lucide-react';
import type { ProductReviewsProps } from '@/types/product';
import useReview from '@/hooks/use-review';

const ProductReviews = ({ onAddReview, productId }: ProductReviewsProps) => {
  const {
    handleOnEdit,
    handleSubmitReview,
    hoveredRating,
    newComment,
    removeReviewMutation,
    setHoveredRating,
    setNewComment,
    newRating,
    setNewRating,
    reviews,
    user,
  } = useReview({ onAddReview, productId });

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFilled = interactive
        ? starValue <= (hoveredRating || newRating)
        : starValue <= rating;

      return (
        <Star
          key={index}
          className={`h-5 w-5 cursor-pointer transition-colors ${
            isFilled
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-muted-foreground'
          }`}
          onClick={interactive ? () => setNewRating(starValue) : undefined}
          onMouseEnter={
            interactive ? () => setHoveredRating(starValue) : undefined
          }
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
        />
      );
    });
  };

  return (
    <div className="space-y-8">
      {/* Add Review Form */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Write a Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Rating</Label>
            <div className="flex items-center space-x-1">
              {renderStars(newRating, true)}
            </div>
          </div>

          <div>
            <Label
              htmlFor="review-comment"
              className="text-sm font-medium mb-2 block"
            >
              Your Review
            </Label>
            <Textarea
              id="review-comment"
              placeholder="Share your thoughts about this product..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleSubmitReview}
            disabled={newRating === 0 || !newComment.trim()}
            className="w-full"
          >
            Submit Review
          </Button>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">
          Customer Reviews ({reviews?.length})
        </h3>

        {reviews?.length === 0 ? (
          <Card className="bg-card/50 backdrop-blur-sm border-border/20">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No reviews yet. Be the first to review this product!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reviews?.map((review) => (
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
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="text-sm text-muted-foreground text-end">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                          {review.user._id === user?._id && (
                            <div className="my-3 flex gap-2">
                              <Button
                                onClick={() => removeReviewMutation(review._id)}
                                className="bg-red-500 block p-2 w-8 h-8 hover:bg-red-600 transition-colors"
                              >
                                <Trash />
                              </Button>
                              <Button
                                onClick={() => handleOnEdit(review._id)}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
