import { Label } from '@radix-ui/react-label';
import { Checkbox } from '../ui/checkbox';
import type { FilterState } from '@/types/product';

interface StockFilterProps {
  filters: FilterState;
  updateFilter: (filter: keyof FilterState, value: unknown) => void;
}

const StockFilter = ({ filters, updateFilter }: StockFilterProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="inStock"
        checked={filters.inStock}
        onCheckedChange={() => updateFilter('inStock', !filters.inStock)}
      />
      <Label htmlFor="inStock" className="text-sm cursor-pointer">
        In Stock Only
      </Label>
    </div>
  );
};

export default StockFilter;
