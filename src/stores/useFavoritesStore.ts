import type { Product } from '@/types/product';
import { create } from 'zustand';

type Favorites = {
  favorites: Product[];
  setFavorites: (prodducts: Product[]) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
};

export const useFavoriteStore = create<Favorites>((set, get) => ({
  favorites: [],
  setFavorites: (products) =>
    set({
      favorites: products,
    }),
  addToFavorites: (product) =>
    set((state) => ({
      favorites: state.favorites.find((fav) => fav._id === product._id)
        ? state.favorites
        : [...state.favorites, product],
    })),
  isFavorite: (productId) => {
    if (get().favorites)
      return get().favorites.some((item) => item && item._id === productId);
    return false;
  },
  removeFromFavorites: (productId) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => productId !== fav._id),
    })),
  toggleFavorite: (product) =>
    set((state) => ({
      favorites:
        get().favorites &&
        state.favorites.find((fav) => fav._id === product._id)
          ? state.favorites.filter((fav) => fav._id !== product._id)
          : [...state.favorites, product],
    })),
}));
