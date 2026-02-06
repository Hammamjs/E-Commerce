import { useFavoriteStore } from '@/stores/useFavoritesStore';
import type { Product } from '@/types/product';
import { useShallow } from 'zustand/shallow';
import { toast } from './use-toast';
import { useCallback } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { favoritesCommands } from '@/features/favorites/command/favorite.command';

const useFavorites = (product: Product) => {
  const userId = useUserStore(useShallow((state) => state.user?._id));

  const {
    AddToFavoritesCommand: { mutate: AddToFavoritesMutation },
    RemoveFromFavCommand: { mutate: RemoveFromFavMutation },
  } = favoritesCommands();
  // Favorites store
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const isFav = useFavoriteStore((state) => state.isFavorite(product._id));

  // Function
  const handleUpdateFav = useCallback(() => {
    if (!userId) {
      toast({ title: 'Please log in to update your favorites.' });
      return;
    }

    // toggle fav state
    toggleFavorite(product);

    return isFav
      ? RemoveFromFavMutation(product._id)
      : AddToFavoritesMutation(product._id);
  }, [
    AddToFavoritesMutation,
    RemoveFromFavMutation,
    isFav,
    toggleFavorite,
    userId,
    product._id,
  ]);

  return { handleUpdateFav, isFav };
};

export default useFavorites;
