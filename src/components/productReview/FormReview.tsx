import { Label } from '@radix-ui/react-label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import RenderStar from './RenderStar';
import useReview from '@/hooks/use-review';

const FormReview = ({ productId }: { productId: string }) => {
  const { form, setComment, handleSubmitReview } = useReview({ productId });

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/20">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Write a Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">Rating</Label>
          <div className="flex items-center space-x-1">
            <RenderStar interactive />
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
            value={form.comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
            className="min-h-[100px]"
          />
        </div>

        <Button
          onClick={handleSubmitReview}
          disabled={form.rate === 0 || !form.comment.trim()}
          className="w-full"
        >
          Submit Review
        </Button>
      </CardContent>
    </Card>
  );
};

export default FormReview;
