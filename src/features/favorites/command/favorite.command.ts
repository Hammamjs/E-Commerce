import { addToFavoritesApi, removeFromFav } from '@/api/FavoritesApi';
import { toast } from '@/hooks/use-toast';
import handleError from '@/utils/ErrorHandler';
import { useMutation } from '@tanstack/react-query';

export const favoritesCommands = () => {
  // mutations
  const AddToFavoritesCommand = useMutation({
    mutationKey: ['add-fav'],
    mutationFn: addToFavoritesApi,
    onSuccess: (data) => {
      toast({
        title: data?.message,
      });
    },
    onError: (err) => handleError(err, 'favorites'),
  });

  const RemoveFromFavCommand = useMutation({
    mutationKey: ['rem-fav'],
    mutationFn: removeFromFav,
    onSuccess: (data) => {
      toast({ title: data.message });
    },
    onError: (err) => handleError(err, 'favorites'),
  });

  return {
    AddToFavoritesCommand,
    RemoveFromFavCommand,
  };
};

export type FavoriteCommandType = ReturnType<typeof favoritesCommands>;
