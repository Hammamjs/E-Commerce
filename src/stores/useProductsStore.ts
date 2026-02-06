import type { Product } from '@/types/product';
import { create } from 'zustand';

interface Products {
  products: Product[];
  productIds: string[];
  productById: Record<string, Product>;
  setProducts: (products: Product[]) => void;
  getProduct: (id: string) => Product | undefined;
  removeProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  clearProducts: () => void;
}

export const useProductsStore = create<Products>((set, get) => ({
  productById: {},
  products: [],
  productIds: [],
  setProducts: (products) =>
    set({
      products,
      productIds: products.map((p) => p._id),
      productById: Object.fromEntries(products.map((p) => [p._id, p])),
    }),
  getProduct: (id: string) => get().productById[id],
  addProduct: (product) =>
    set((state) => {
      const newProduct = [...state.products, product];

      return {
        products: newProduct,
        productById: Object.fromEntries(newProduct.map((p) => [p._id, p])),
        produtIds: newProduct.map((p) => p._id),
      };
    }),
  removeProduct: (id) =>
    set((state) => {
      const removeProd = state.products.filter((p) => id != p._id);
      return {
        products: removeProd,
        productById: Object.fromEntries(removeProd.map((p) => [p._id, p])),
        productIds: removeProd.map((p) => p._id),
      };
    }),
  clearProducts: () =>
    set({
      products: [],
      productIds: [],
      productById: {},
    }),
}));
