import { useStore } from '@/stores/useStore';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FavoriteHeader = () => {
  const favoritesIds = useStore((state) => state.favorites.ids);
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Favorites
          </h1>
          <p className="text-foreground/60">
            {favoritesIds.length} items you love
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
    </>
  );
};

export default FavoriteHeader;
