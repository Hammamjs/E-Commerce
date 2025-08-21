import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Product } from '@/components/Product';
import useProduct from '@/hooks/use-product';
import FilterSidebar from '@/components/FilterSidebar';
import useFilter from '@/hooks/use-filter';

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

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your product search
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
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
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Filters</h2>
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
            </Card>
          </div>

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
                <div className="flex flex-wrap gap-2">
                  {filters.categories.map((categoryId) => {
                    const category = categories.find(
                      (c) => c._id === categoryId
                    );
                    return category ? (
                      <Badge key={categoryId} variant="secondary">
                        {category.name}
                        <X
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() => toggleCategoryFilter(categoryId)}
                        />
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Product key={index} index={index} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-foreground/60 text-lg mb-4">
                  No products found matching your criteria
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
