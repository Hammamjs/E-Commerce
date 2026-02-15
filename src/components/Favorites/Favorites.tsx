import { useStore } from '@/stores/useStore';
import FavoriteNotFound from './FavoriteNotFound';
import FavoriteHeader from './FavoriteHeader';
import FavoritesList from './FavoritesList';
import QuickAction from './QuickAction';

const Favorites = () => {
  const favoritesIds = useStore((state) => state.favorites.ids);

  if (!favoritesIds?.length) return <FavoriteNotFound />;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <FavoriteHeader />
        <FavoritesList />
        {/* Quick Actions */}
        <QuickAction />
      </div>
    </div>
  );
};

export default Favorites;
