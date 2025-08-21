import type { FilterState } from '@/types/product';
import { Label } from '@radix-ui/react-label';
import { Star } from 'lucide-react';
import { memo } from 'react';
import { Checkbox } from '../ui/checkbox';

interface RatingFilterProps {
  rating: number;
  filters: FilterState;
  updateFilter: (filter: keyof FilterState, value: unknown) => void;
}

const RatingFilter = ({ rating, filters, updateFilter }: RatingFilterProps) => {
  return (
    <div key={rating} className="flex items-center space-x-2">
      <Checkbox
        id={`rating-${rating}`}
        checked={filters.rating === rating}
        onCheckedChange={() => updateFilter('rating', rating)}
      />
      <Label
        htmlFor={`rating-${rating}`}
        className="text-sm cursor-pointer flex items-center"
      >
        {rating > 0 && (
          <>
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            {rating}+ Stars
          </>
        )}
        {rating === 0 && 'All Ratings'}
      </Label>
    </div>
  );
};

export default memo(RatingFilter);
