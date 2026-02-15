import { Star } from 'lucide-react';

type RatingStatusProps = {
  ratingAverage: number;
  ratingCount: number;
};

const RatingStatus = ({ ratingAverage, ratingCount }: RatingStatusProps) => {
  return (
    <div className="flex items-center">
      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      <span className="ml-1 font-medium">{ratingAverage}</span>
      <span className="ml-1 text-foreground/60">({ratingCount} reviews)</span>
    </div>
  );
};

export default RatingStatus;
