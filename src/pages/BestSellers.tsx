import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useMemo } from 'react';
import { useProductsStore } from '@/stores/useProductsStore';
import { Product } from '@/components/Product';

const BestSellers = () => {
  const products = useProductsStore((state) => state.products);

  // Filter products by high rating (4.5+) and high review count, or "Best Seller" tag
  const bestSellerProducts = useMemo(
    () =>
      products
        .filter(
          (product) =>
            product.tag === 'Best Seller' ||
            (product.ratings.average >= 4.5 && (product?.sales || 0) >= 40), // 60 is few but for development purposes
        )
        .sort((a, b) => b.ratings.count - a.ratings.count),
    [],
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-primary py-16">
          <div className="container mx-auto px-4 text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Best Sellers
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Discover our most popular products loved by thousands of customers
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {bestSellerProducts.length} Best Selling Products
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bestSellerProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>

            {bestSellerProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No best sellers found.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BestSellers;
