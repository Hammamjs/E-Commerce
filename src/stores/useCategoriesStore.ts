import type { Categories } from '@/types/Categories';
import { create } from 'zustand';

interface CategoriesStore {
  categories: Categories[];
  setCategories: (categories: Categories[]) => void;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  setCategories: (categories) =>
    set({
      categories,
    }),
}));
