import { useCategoriesStore } from '@/stores/useCategoriesStore';
import { useProductsStore } from '@/stores/product/useProductsStore';
import type { FilterState } from '@/types/product';
import { sliceBrand } from '@/utils/SliceBrand';
import { useEffect, useState } from 'react';

interface UseFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const useFilter = ({ filters, setFilters }: UseFilterProps) => {
  const [brands, setBrands] = useState<string[]>([]);

  const categories = useCategoriesStore((state) => state.categories);
  const products = useProductsStore((state) => state.items);

  useEffect(() => {
    setBrands(sliceBrand(products));
  }, [products]);

  const updateFilter = (key: keyof FilterState, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleCategoryFilter = (categoryName: string) => {
    filters.categories = filters.categories.map((category) =>
      category.trim().toLowerCase(),
    );
    const newCategories = filters.categories.includes(categoryName)
      ? filters.categories.filter((c) => c !== categoryName)
      : [...filters.categories, categoryName];
    updateFilter('categories', newCategories);
  };

  const toggleBrandFilter = (brand: string) => {
    window.scrollTo(0, 0);
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    updateFilter('brands', newBrands);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 1000],
      rating: 0,
      inStock: false,
    });
  };

  return {
    categories,
    brands,
    products,
    toggleBrandFilter,
    toggleCategoryFilter,
    clearFilters,
    updateFilter,
  };
};

export default useFilter;
