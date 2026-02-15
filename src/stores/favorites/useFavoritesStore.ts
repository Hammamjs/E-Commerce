import type { Product } from '@/types/product';
import { derivedState } from '@/utils/derivedState';
import { create } from 'zustand';

type Favorites = {
  byId: Record<string, Product>;
  ids: string[];
  items: Product[];
  setFavorites: (products: Product[]) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
};

export const useFavoriteStore = create<Favorites>((set, get) => ({
  ids: [],
  items: [],
  byId: {},
  setFavorites: (products) => {
    const { ids, map: byId, items } = derivedState(products);

    return set({
      byId,
      ids,
      items,
    });
  },
  addToFavorites: (product) =>
    set((state) => {
      const newFav = [...state.items, product];
      const { items, map: byId, ids } = derivedState(newFav);
      return {
        items,
        byId,
        ids,
      };
    }),

  isFavorite: (productId) => !!get().byId[productId],

  removeFromFavorites: (productId) =>
    set((state) => {
      const removedFav = state.items.filter((f) => f._id != productId);
      const { ids, items, map: byId } = derivedState(removedFav);
      return { ids, byId, items };
    }),
  toggleFavorite: (product) =>
    set((state) => {
      const toggleFav = get().byId[product._id];
      let toggleFavs = [...state.items];

      if (!toggleFav) toggleFavs.push(product);
      else toggleFavs = toggleFavs.filter((f) => f._id != product._id);

      const { map: byId, items, ids } = derivedState(toggleFavs);

      return {
        byId,
        items,
        ids,
      };
    }),
}));
