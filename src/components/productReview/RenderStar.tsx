import useReviewFormState from '@/stores/reviews/useReviewFormState';
import { Star } from 'lucide-react';

const RenderStar = ({ interactive }: { interactive: boolean }) => {
  const { form, setRate, setHoveringRate } = useReviewFormState();
  return Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const isFilled = interactive
      ? starValue <= (form.hoverRating || form.rate)
      : starValue <= form.hoverRating;

    return (
      <Star
        key={index}
        className={`h-5 w-5 cursor-pointer transition-colors ${
          isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
        onClick={interactive ? () => setRate(starValue) : undefined}
        onMouseEnter={
          interactive ? () => setHoveringRate(starValue) : undefined
        }
        onMouseLeave={interactive ? () => setHoveringRate(0) : undefined}
      />
    );
  });
};

export default RenderStar;
