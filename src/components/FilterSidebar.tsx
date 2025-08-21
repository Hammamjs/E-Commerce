import CategoryFilter from './filters/CategoryFilter';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import BrandFilter from './filters/BrandFilter';
import RatingFilter from './filters/RatingFilter';
import type { Product, FilterState } from '@/types/product';
import type { Categories } from '@/types/Categories';
import { memo } from 'react';
import FilterPrice from './filters/FilterPrice';
import StockFilter from './filters/StockFilter';

interface FilterSidebarProps {
  products: Product[];
  brands: string[];
  filters: FilterState;
  categories: Categories[];
  toggleCategoryFilter: (category: string) => void;
  toggleBrandFilter: (brand: string) => void;
  updateFilter: (filter: keyof FilterState, value: unknown) => void;
  clearFilters: () => void;
}

const FilterSidebar = ({
  products,
  categories,
  brands,
  filters,
  toggleCategoryFilter,
  toggleBrandFilter,
  updateFilter,
  clearFilters,
}: FilterSidebarProps) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <CategoryFilter
            key={category._id}
            id={category._id}
            name={category.name}
            products={products}
            checked={filters.categories.includes(
              category.name.trim().toLowerCase()
            )}
            onCheckedChange={() =>
              toggleCategoryFilter(category.name.trim().toLowerCase())
            }
          />
        ))}
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-4">Brands</h3>
      <div className="space-y-2">
        {brands.map((brand) => (
          <BrandFilter
            key={brand}
            brand={brand}
            toggleBrandFilter={toggleBrandFilter}
            checked={filters.brands.includes(brand)}
          />
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Price Range</h3>
      <FilterPrice filters={filters} updateFilter={updateFilter} />
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Minimum Rating</h3>
      <div className="space-y-2">
        {[0, 3, 4, 4.5].map((rating) => (
          <RatingFilter
            key={rating}
            rating={rating}
            filters={filters}
            updateFilter={updateFilter}
          />
        ))}
      </div>
    </div>

    <StockFilter filters={filters} updateFilter={updateFilter} />

    <Button onClick={clearFilters} variant="outline" className="w-full">
      <X className="h-4 w-4 mr-2" />
      Clear Filters
    </Button>
  </div>
);

export default memo(FilterSidebar);
