import type { Product } from '@/types/product';
import { derivedState } from '@/utils/derivedState';
import { create } from 'zustand';

type Favorites = {
  favoriteById: Record<string, Product>;
  favoritesIds: string[];
  favorites: Product[];
  setFavorites: (products: Product[]) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
};

export const useFavoriteStore = create<Favorites>((set, get) => ({
  favoritesIds: [],
  favorites: [],
  favoriteById: {},
  setFavorites: (products) => {
    const {
      ids: favoritesIds,
      map: favoriteById,
      items: favorites,
    } = derivedState(products);

    return {
      favoriteById,
      favoritesIds,
      favorites,
    };
  },
  addToFavorites: (product) =>
    set((state) => {
      const newFav = [...state.favorites, product];
      const {
        items: favorites,
        map: favoriteById,
        ids: favoritesIds,
      } = derivedState(newFav);
      return {
        favorites,
        favoriteById,
        favoritesIds,
      };
    }),
  isFavorite: (productId) => !!get().favoriteById[productId],
  removeFromFavorites: (productId) =>
    set((state) => {
      const removedFav = state.favorites.filter((f) => f._id != productId);
      const {
        ids: favoritesIds,
        items: favorites,
        map: favoriteById,
      } = derivedState(removedFav);
      return { favorites, favoriteById, favoritesIds };
    }),
  toggleFavorite: (product) =>
    set((state) => {
      const toggleFav = get().favoriteById[product._id];
      let toggleFavs = [...state.favorites];

      if (!toggleFav) toggleFavs.push(product);
      else toggleFavs = toggleFavs.filter((f) => f._id != product._id);

      const {
        map: favoriteById,
        items: favorites,
        ids: favoritesIds,
      } = derivedState(toggleFavs);

      return {
        favoriteById,
        favorites,
        favoritesIds,
      };
    }),
}));
