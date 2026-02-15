import type { StateCreator } from 'zustand';
import type { Product } from '@/types/product';
import { derivedState } from '@/utils/derivedState';
import type { storeState } from '../useStore';

export type FavoritesSlice = {
  byId: Record<string, Product>;
  ids: string[];
  items: Product[];
  setFavorites: (products: Product[]) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
};

export const createFavoritesSlice: StateCreator<
  storeState,
  [],
  [],
  FavoritesSlice
> = (set, get) => ({
  ids: [],
  items: [],
  byId: {},
  setFavorites: (products) => {
    const { ids, map: byId, items } = derivedState(products);

    return set((state) => ({
      favorites: {
        ...state.favorites,
        byId,
        ids,
        items,
      },
    }));
  },
  addToFavorites: (product) =>
    set((state) => {
      const newFav = [...state.favorites.items, product];
      const { items, map: byId, ids } = derivedState(newFav);
      return {
        favorites: {
          ...state.favorites,
          items,
          byId,
          ids,
        },
      };
    }),

  isFavorite: (productId) => !!get().favorites.byId[productId],

  removeFromFavorites: (productId) =>
    set((state) => {
      const removedFav = state.favorites.items.filter(
        (f) => f._id != productId,
      );
      const { ids, items, map: byId } = derivedState(removedFav);
      return { favorites: { ...state.favorites, items, byId, ids } };
    }),
  toggleFavorite: (product) =>
    set((state) => {
      const toggleFav = get().favorites.byId[product._id];
      let toggleFavs = [...state.favorites.items];

      if (!toggleFav) toggleFavs.push(product);
      else toggleFavs = toggleFavs.filter((f) => f._id != product._id);

      const { map: byId, items, ids } = derivedState(toggleFavs);

      return {
        favorites: {
          ...state.favorites,
          ids,
          items,
          byId,
        },
      };
    }),
});
