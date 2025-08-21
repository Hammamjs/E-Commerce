import { useProductsStore } from '@/stores/useProductsStore';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { FilterState } from '@/types/product';

const useProduct = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    categories: categoryParam ? [categoryParam] : [],
    brands: [],
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
  });

  const products = useProductsStore((state) => state.products);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // this line of code because the categoryParam return the first word like beauty and Fashion
      // it just return beauty with uppercase
      // this code fix this issue if there is no word that matched
      filters.categories = filters.categories?.map((category) =>
        category.trim().toLowerCase()
      );

      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category.name.toLowerCase().trim());
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const matchesRating = product.ratings.average >= filters.rating;
      const matchesStock = !filters.inStock || product.inStock > 0;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesRating &&
        matchesStock
      );
    });
  }, [filters, products, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredProducts,
    filters,
    setFilters,
  };
};

export default useProduct;
