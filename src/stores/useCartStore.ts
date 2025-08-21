// import { checkInLoacalstorage, getLocalstorage } from '@/lib/LocalStorage';
import type { Cart, CartEntry } from '@/types/Cart';
import { create } from 'zustand';

interface CartState {
  cart: Cart;
  addToCart: (item: CartEntry) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  setCart: (cart: Cart) => void;
  // totalPrice: () => number;
  clearCart: () => void;
}

// const loadUserCartFromLocalstorage = () => {
//   if (typeof window === 'undefined') return;

//   try {
//     return checkInLoacalstorage('user-cart')
//       ? getLocalstorage('user-cart')
//       : [];
//   } catch {
//     return [];
//   }
// };

const cartItems: Cart = {
  items: [],
  totalItems: 0,
  _id: '',
  createdAt: new Date(),
  totalPrice: 0,
  updatedAt: new Date(),
  user: '',
};

export const useCartStore = create<CartState>((set) => ({
  cart: cartItems,
  setCart: (cart) =>
    set({
      cart: cart ?? cartItems,
    }),

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.items.find(
        (i) => i.product._id === item.product?._id
      );
      if (existing) {
        return {
          cart: {
            ...state.cart,
            items: state.cart.items.map((i) =>
              i.product._id === item.product._id
                ? {
                    ...i,
                    quantity: (i?.quantity || 0) + (item.quantity || 0),
                  }
                : i
            ),
          },
        };
      }
      return {
        cart: {
          ...state.cart,
          items: [...(state.cart.items || []), item],
        },
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.filter((item) => item.product._id !== id),
      },
    })),

  updateQuantity: (id, qty) =>
    set((state) => {
      const product = state.cart.items.find((item) => item._id === id);
      const updatedQty = (product?.quantity || 0) + qty;
      return {
        cart: {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.product._id === id ? { ...item, quantity: updatedQty } : item
          ),
        },
      };
    }),

  clearCart: () =>
    set((state) => ({
      cart: { ...state.cart, items: [] },
    })),
}));
