import { X } from 'lucide-react';
import { Badge } from '../ui/badge';
import type { FilterState } from '@/types/product';

type ActiveFilterType = {
  filters: FilterState;
  categoryMap: Record<string, string>;
  onRemoveCategory: (id: string) => void;
};

const ActiveFilterBadges = ({
  categoryMap,
  filters,
  onRemoveCategory,
}: ActiveFilterType) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.categories.map((categoryId) => (
        <Badge key={categoryId} variant="secondary">
          {categoryMap[categoryId]}
          <X
            className="h-3 w-3 ml-1 cursor-pointer"
            onClick={() => onRemoveCategory(categoryId)}
          />
        </Badge>
      ))}
    </div>
  );
};

export default ActiveFilterBadges;
