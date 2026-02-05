import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Product } from '@/components/Product';
import { useShallow } from 'zustand/shallow';
import { useProductsStore } from '@/stores/useProductsStore';

const NewArrivals = () => {
  const products = useProductsStore(useShallow((state) => state.products));
  // Filter products by "New Arrival" tag or recent additions (last 8 products as new)
  const newArrivalProducts = products.filter(
    (product) => product.tag === 'new',
  );

  // If no products with "New Arrival" tag, show the latest 8 products
  const displayProducts =
    newArrivalProducts.length > 0
      ? newArrivalProducts
      : products.slice(-8).reverse();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-secondary py-16">
          <div className="container mx-auto px-4 text-center text-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              New Arrivals
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto">
              Be the first to discover our latest products and trending items
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {displayProducts.length} New Products
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>

            {displayProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No new arrivals found.
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

export default NewArrivals;
