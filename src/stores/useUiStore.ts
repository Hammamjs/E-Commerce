import { create } from 'zustand';
import type { AddProductStore } from './addProduct/useAddProductState';
import { ceateAddProductSlice } from './addProduct/addProduct.slice';

export interface UiStoreState {
  addProduct: AddProductStore;
}

export const useUiStore = create<UiStoreState>((...a) => ({
  addProduct: ceateAddProductSlice(...a),
}));
