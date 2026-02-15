import { create } from 'zustand';
import {
  createFavoritesSlice,
  type FavoritesSlice,
} from './favorites/favorites.slice';
import { createCartSlice, type CartSlice } from './cart/cart.slice';
import { createReviewSlice, type ReviewsSlice } from './reviews/review.slice';
import {
  createProductSlice,
  type ProductsSlice,
} from './product/products.slice';

export type storeState = {
  favorites: FavoritesSlice;
  cart: CartSlice;
  reviews: ReviewsSlice;
  products: ProductsSlice;
};

export const useStore = create<storeState>((...a) => ({
  favorites: createFavoritesSlice(...a),
  cart: createCartSlice(...a),
  reviews: createReviewSlice(...a),
  products: createProductSlice(...a),
}));
