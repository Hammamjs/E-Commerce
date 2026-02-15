import type { Product } from '@/types/product';
import RelatedProduct from './RelatedProduct';
import { useMemo } from 'react';
import { useProductsStore } from '@/stores/product/useProductsStore';

type RelatedProductListProps = {
  productIds: string[];
};

const RelatedProductList = ({ productIds }: RelatedProductListProps) => {
  const product = useProductsStore((state) => state.getProduct);

  const products = useMemo(() => {
    return productIds.map((id) => product(id) as Product);
  }, [productIds]);

  const relatedProducts = products.slice(0, 4);

  return (
    relatedProducts.length > 0 && (
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-12">
          Related Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <RelatedProduct
              key={relatedProduct._id}
              id={relatedProduct._id}
              image={relatedProduct.image}
              name={relatedProduct.name}
              discountPrice={
                relatedProduct.discountPrice || relatedProduct.price
              }
              ratings={relatedProduct.ratings}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default RelatedProductList;
