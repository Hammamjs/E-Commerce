import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavoriteStore } from '@/stores/useFavoritesStore';
import { useShallow } from 'zustand/shallow';
import useCart from '@/hooks/use-cart';
import useFavorites from '@/hooks/use-favorites';
import ProductTemplates from './ProductTemplates';
import { useMemo } from 'react';
import { useProductsStore } from '@/stores/useProductsStore';

const Favorites = () => {
  const { handleAddOrUpdateCart } = useCart();
  const { handleUpdateFav } = useFavorites();

  const products = useProductsStore(useShallow((state) => state.products));
  const favorite = useFavoriteStore(useShallow((state) => state.favorites));

  const userFavs = useMemo(
    () => products.filter((product) => favorite[product._id]) ?? [],
    [products, favorite],
  );

  if (!userFavs?.length) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <Heart className="h-24 w-24 text-foreground/30 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                No Favorites Yet
              </h1>
              <p className="text-foreground/60">
                Start exploring and add products to your favorites list
              </p>
            </div>
            <Link to="/products">
              <Button size="lg">Discover Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Favorites
            </h1>
            <p className="text-foreground/60">
              {userFavs.length} items you love
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {userFavs.map((product, index) => (
            <ProductTemplates
              key={product._id}
              index={index}
              product={product}
              handleAddOrUpdateCart={() => handleAddOrUpdateCart(product, 1)}
              handleUpdateFav={handleUpdateFav}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add All to Cart
          </Button>
          <Link to="/products">
            <Button variant="outline" size="lg">
              Browse More Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
