import type { Product } from '@/types/product';
import { useCallback } from 'react';

import useRequireUser from './useRequireUser';
import useFavoriteState from './useFavoriteState';
import useFavoriteMutation from './useFavoriteMutation';

const useFavorites = (product: Product) => {
  const { requireUser } = useRequireUser();
  const { isFav, toggleFavorite } = useFavoriteState(product._id);
  const { add, remove } = useFavoriteMutation();

  // Favorites store

  // Function
  const handleUpdateFav = useCallback(async () => {
    if (!requireUser()) {
      return { error: 'AUTH_REQUIRED' };
    }

    try {
      if (isFav) await remove(product._id);
      else await add(product._id);

      // toggle fav state
      toggleFavorite(product);
    } catch (err) {
      console.error(err);
    }
  }, [add, remove, isFav, toggleFavorite, product._id]);

  return { handleUpdateFav, isFav };
};

export default useFavorites;
