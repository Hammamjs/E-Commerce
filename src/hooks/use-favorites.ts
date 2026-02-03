import { addToFavoritesApi, removeFromFav } from '@/api/FavoritesApi';
import { useFavoriteStore } from '@/stores/useFavoritesStore';
import type { Product } from '@/types/product';
import { useMutation } from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';
import { toast } from './use-toast';
import handleError from '@/utils/ErrorHandler';
import { useCallback } from 'react';
import { useUserStore } from '@/stores/useUserStore';

const useFavorites = () => {
  // mutations
  const { mutate: AddToFavoritesMutation } = useMutation({
    mutationKey: ['add-fav'],
    mutationFn: addToFavoritesApi,
    onSuccess: (data) => {
      toast({
        title: data?.message,
      });
    },
    onError: (err) => handleError(err, 'favorites'),
  });

  const { mutate: RemoveFromFavMutation } = useMutation({
    mutationKey: ['rem-fav'],
    mutationFn: removeFromFav,
    onSuccess: (data) => {
      toast({ title: data.message });
    },
    onError: (err) => handleError(err, 'favorites'),
  });

  const user = useUserStore(useShallow((state) => state.user));

  // Favorites store
  const [toggleFavorite, isFavorite] = useFavoriteStore(
    useShallow((state) => [state.toggleFavorite, state.isFavorite]),
  );
  // Function
  const handleUpdateFav = useCallback(
    (product: Product) => {
      if (!user?._id) {
        toast({ title: 'Please log in to update your favorites.' });
        return;
      }

      // Before toggle fav state
      const currentFavorite = isFavorite(product._id);

      // toggle fav state
      toggleFavorite(product);

      return currentFavorite
        ? RemoveFromFavMutation(product._id)
        : AddToFavoritesMutation(product._id);
    },
    [
      AddToFavoritesMutation,
      RemoveFromFavMutation,
      isFavorite,
      toggleFavorite,
      user?._id,
    ],
  );

  return { handleUpdateFav, isFavorite };
};

export default useFavorites;
