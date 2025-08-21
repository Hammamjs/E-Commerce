import type { Product } from '@/types/product';
import { create } from 'zustand';

interface Products {
  products: Product[] | [];
  setProducts: (products: Product[]) => void;
  getProduct: (id: string) => Product;
  removeProduct: (id: string) => void;
  addProduct: (product: Product) => void;
  clearProducts: () => void;
}

export const useProductsStore = create<Products>((set, get) => ({
  products: [],
  setProducts: (products) =>
    set({
      products: products,
    }),
  getProduct: (id: string) => get().products.find((prod) => prod._id === id)!,
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((prod) => prod._id !== id),
    })),
  clearProducts: () =>
    set({
      products: [],
    }),
}));
