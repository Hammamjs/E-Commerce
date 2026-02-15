import type { StateCreator } from 'zustand';
import { cartItems, type CartState } from './useCartStore';
import type { storeState } from '../useStore';
import type { Cart, CartEntry } from '@/types/Cart';

export type CartSlice = {
  cart: Cart;
  addToCart: (item: CartEntry) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  setCart: (cart: Cart) => void;
  clearCart: () => void;
};

export const createCartSlice: StateCreator<storeState, [], [], CartSlice> = (
  set,
) => ({
  cart: cartItems,
  setCart: (cart) =>
    set((state) => ({
      cart: {
        ...state.cart,
        cart: cart ?? cartItems,
      },
    })),

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.cart.items.find(
        (i) => i.product._id === item.product?._id,
      );
      if (existing) {
        return {
          cart: {
            ...state.cart,
            items: state.cart.cart.items.map((i) =>
              i.product._id === item.product._id
                ? {
                    ...i,
                    quantity: (i?.quantity || 0) + (item.quantity || 0),
                  }
                : i,
            ),
          },
        };
      }
      return {
        cart: {
          ...state.cart,
          cart: {
            ...state.cart,
            items: [...(state.cart.cart.items || []), item],
          },
        },
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: {
        ...state.cart,
        cart: {
          ...state.cart,
          items: state.cart.cart.items.filter(
            (item) => item.product._id !== id,
          ),
        },
      },
    })),

  updateQuantity: (id, qty) =>
    set((state) => {
      const product = state.cart.cart.items.find((item) => item._id === id);
      const updatedQty = (product?.quantity || 0) + qty;
      return {
        cart: {
          ...state.cart,
          cart: {
            ...state.cart,
            items: state.cart.cart.items.map((item) =>
              item.product._id === id
                ? { ...item, quantity: updatedQty }
                : item,
            ),
          },
        },
      };
    }),

  clearCart: () =>
    set((state) => ({
      cart: {
        ...state.cart,
        cart: { ...state.cart, items: [] },
      },
    })),
});
