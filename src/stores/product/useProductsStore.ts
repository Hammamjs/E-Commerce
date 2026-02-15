import type { Product } from '@/types/product';
import { create } from 'zustand';

interface ProductsAction {
  items: Product[];
  ids: string[];
  byId: Record<string, Product>;
  setProducts: (products: Product[]) => void;
  getProduct: (id: string) => Product | undefined;
  removeProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  clearProducts: () => void;
}

export const useProductsStore = create<ProductsAction>((set, get) => ({
  byId: {},
  items: [],
  ids: [],
  setProducts: (products) =>
    set({
      items: products,
      ids: products.map((p) => p._id),
      byId: Object.fromEntries(products.map((p) => [p._id, p])),
    }),
  getProduct: (id: string) => get().byId[id],
  addProduct: (product) =>
    set((state) => {
      const newProduct = [...state.items, product];

      return {
        items: newProduct,
        byId: Object.fromEntries(newProduct.map((p) => [p._id, p])),
        ids: newProduct.map((p) => p._id),
      };
    }),
  removeProduct: (id) =>
    set((state) => {
      const removeProd = state.items.filter((p) => id != p._id);
      return {
        items: removeProd,
        byId: Object.fromEntries(removeProd.map((p) => [p._id, p])),
        ids: removeProd.map((p) => p._id),
      };
    }),
  clearProducts: () =>
    set({
      items: [],
      ids: [],
      byId: {},
    }),
}));
