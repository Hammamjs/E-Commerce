import type { FilterState } from '@/types/product';
import { Slider } from '../ui/slider';

interface FilterPriceProps {
  filters: FilterState;
  updateFilter: (filter: keyof FilterState, value: unknown) => void;
}

const FilterPrice = ({ filters, updateFilter }: FilterPriceProps) => {
  return (
    <div className="space-y-4">
      <Slider
        value={filters.priceRange}
        onValueChange={(value) => updateFilter('priceRange', value)}
        max={1000}
        step={10}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-foreground/60">
        <span>${filters.priceRange[0]}</span>
        <span>${filters.priceRange[1]}</span>
      </div>
    </div>
  );
};

export default FilterPrice;
