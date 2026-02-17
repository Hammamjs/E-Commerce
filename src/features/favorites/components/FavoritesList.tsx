import ProductTemplates from '@/components/Favorites/ProductTemplates';
import { useStore } from '@/stores/useStore';

const FavoritesList = () => {
  const favoritesIds = useStore((state) => state.favorites.ids);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {favoritesIds.map((productId) => (
        <ProductTemplates key={productId} productId={productId} />
      ))}
    </div>
  );
};

export default FavoritesList;
