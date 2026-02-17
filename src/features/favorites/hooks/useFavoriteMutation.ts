import {
  addToFavoritesMutation,
  removeFromFavMutation,
} from '../command/favorite.command';

const useFavoriteMutation = () => {
  const { mutateAsync: addToFavMutation } = addToFavoritesMutation();
  const { mutateAsync: removeFromfavoriteMutation } = removeFromFavMutation();

  const add = (productId: string) => addToFavMutation(productId);
  const remove = (productId: string) => removeFromfavoriteMutation(productId);

  return { add, remove };
};

export default useFavoriteMutation;
