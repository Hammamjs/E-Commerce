import { useFavoriteStore } from '../store/useFavoritesStore';

const useFavoriteState = (productId: string) => {
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const isFav = useFavoriteStore((state) => state.isFavorite(productId));

  return {
    toggleFavorite,
    isFav,
  };
};

export default useFavoriteState;
