import type { StateCreator } from 'zustand';
import type { storeState } from '../useStore';
import type { Product } from '@/types/product';

export interface ProductsSlice {
  items: Product[];
  ids: string[];
  byId: Record<string, Product>;
  setProducts: (products: Product[]) => void;
  getProduct: (id: string) => Product | undefined;
  removeProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  clearProducts: () => void;
}

export const createProductSlice: StateCreator<
  storeState,
  [],
  [],
  ProductsSlice
> = (set, get) => ({
  byId: {},
  items: [],
  ids: [],
  setProducts: (products) =>
    set((state) => ({
      products: {
        ...state.products,
        items: products,
        ids: products.map((p) => p._id),
        byId: Object.fromEntries(products.map((p) => [p._id, p])),
      },
    })),
  getProduct: (id: string) => get().products.byId[id],
  addProduct: (product) =>
    set((state) => {
      const newProduct = [...state.products.items, product];

      return {
        products: {
          ...state.products,
          items: newProduct,
          byId: Object.fromEntries(newProduct.map((p) => [p._id, p])),
          ids: newProduct.map((p) => p._id),
        },
      };
    }),
  removeProduct: (id) =>
    set((state) => {
      const removeProd = state.products.items.filter((p) => id != p._id);
      return {
        products: {
          ...state.products,
          items: removeProd,
          byId: Object.fromEntries(removeProd.map((p) => [p._id, p])),
          ids: removeProd.map((p) => p._id),
        },
      };
    }),
  clearProducts: () =>
    set((state) => ({
      products: {
        ...state.products,
        items: [],
        ids: [],
        byId: {},
      },
    })),
});
