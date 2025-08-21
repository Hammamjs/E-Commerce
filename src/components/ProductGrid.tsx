import { memo, useMemo } from 'react';
import { Product } from './Product';
import { useProductsStore } from '@/stores/useProductsStore';
import { useShallow } from 'zustand/shallow';

const ProductGrid = () => {
  const products = useProductsStore(useShallow((state) => state.products));
  const featuredProducts = useMemo(
    () => (products ? products.slice(0, 4) : []),
    [products]
  );
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Handpicked items that represent the perfect blend of innovation,
            quality, and style
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <Product index={index} product={product} key={product._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ProductGrid);
