import {
  addToFavoritesApi,
  removeFromFavApi,
} from '@/features/favorites/api/FavoritesApi';
import { useBaseMutation } from '@/shared/lib/react-query/useBaseMutation';

export const removeFromFavMutation = () =>
  useBaseMutation<void, string>({
    mutationFn: removeFromFavApi,
    invalidatedKeys: ['remove-favorite'],
    successMessage: 'Favorite product removed',
  });

export const addToFavoritesMutation = () =>
  useBaseMutation<void, string>({
    mutationFn: addToFavoritesApi,
    invalidatedKeys: ['add-favorite'],
    successMessage: 'Product added to favorite list successfully',
  });
