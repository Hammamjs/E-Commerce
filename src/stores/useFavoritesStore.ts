import type { Product } from '@/types/product';
import { create } from 'zustand';

type Favorites = {
  favorites: Record<string, boolean>;
  setFavorites: (products: Product[]) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
};

export const useFavoriteStore = create<Favorites>((set, get) => ({
  favorites: {},
  setFavorites: (products) =>
    set({
      favorites: Object.fromEntries(
        products.map((product) => [product._id, true]),
      ),
    }),
  addToFavorites: (product) =>
    set((state) => ({
      favorites: { ...state.favorites, [product._id]: true },
    })),
  isFavorite: (productId) => !!get().favorites[productId],
  removeFromFavorites: (productId) =>
    set((state) => {
      const { [productId]: _removed, ...reset } = state.favorites;
      return { favorites: reset };
    }),
  toggleFavorite: (product) =>
    set((state) => ({
      favorites: {
        ...state.favorites,
        [product._id]: !state.favorites[product._id],
      },
    })),
}));
