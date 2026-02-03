import { Product } from '@/components/Product';
import { Button } from '@/components/ui/button';
import type { Product as ProductType } from '@/types/product';
import { memo } from 'react';

type ProductsGridType = {
  filteredProducts: ProductType[];
  handleClearFilters: () => void;
};

const ProductsGrid = ({
  filteredProducts,
  handleClearFilters,
}: ProductsGridType) => {
  if (!filteredProducts.length) {
    return (
      <div className="text-center py-16">
        <p className="text-foreground/60 text-lg mb-4">
          No products found matching your criteria
        </p>
        <Button onClick={handleClearFilters} variant="outline">
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
};

export default memo(ProductsGrid);
