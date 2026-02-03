import { Input } from '@/components/ui/input';
import useProduct from '@/hooks/use-product';
import FilterSidebar from '@/components/FilterSidebar';
import useFilter from '@/hooks/use-filter';
import { useMemo } from 'react';
import FilterSidebarWrapper from '@/components/FilterSidebarWrapper';
import ActiveFilterBadges from '@/components/ActiveFilterBadges';
import ProductsGrid from '@/components/ProductsGrid';

const Products = () => {
  const { filteredProducts, filters, searchTerm, setSearchTerm, setFilters } =
    useProduct();
  const {
    toggleBrandFilter,
    toggleCategoryFilter,
    categories,
    clearFilters,
    brands,
    updateFilter,
    products,
  } = useFilter({ filters, setFilters });

  const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};

    for (const c of categories) {
      map[c._id] = c.name;
    }

    return map;
  }, [categories]);

  const sidebar = (
    <FilterSidebar
      categories={categories}
      brands={brands}
      filters={filters}
      toggleCategoryFilter={toggleCategoryFilter}
      toggleBrandFilter={toggleBrandFilter}
      updateFilter={updateFilter}
      clearFilters={clearFilters}
      products={products}
    />
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebarWrapper sidebar={sidebar} />
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Results Header */}
            <div className="mb-8">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:max-w-md"
              />
              <div className="flex items-center justify-between mt-4">
                <p className="text-foreground/60">
                  Showing {filteredProducts.length} products
                </p>
                <ActiveFilterBadges
                  categoryMap={categoryMap}
                  filters={filters}
                  onRemoveCategory={toggleCategoryFilter}
                />
              </div>
            </div>

            {/* Products Grid */}
            <ProductsGrid
              filteredProducts={filteredProducts}
              handleClearFilters={clearFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
