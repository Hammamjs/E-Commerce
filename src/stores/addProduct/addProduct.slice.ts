import type { StateCreator } from 'zustand';
import { CreateInitialState, type AddProductStore } from './useAddProductState';
import type { UiStoreState } from '../useUiStore';

export const ceateAddProductSlice: StateCreator<
  UiStoreState,
  [],
  [],
  AddProductStore
> = (set) => ({
  form: CreateInitialState(),
  resetForm: () =>
    set((state) => ({
      addProduct: { ...state.addProduct, form: CreateInitialState() },
    })),
  addToArray: (field, value) =>
    set((state) => ({
      addProduct: {
        ...state.addProduct,
        form: {
          ...state.addProduct.form,
          [field]: [...state.addProduct.form[field], value],
        },
      },
    })),
  updateInArray: (field, value, idx) =>
    set((state) => {
      const updated = [...state.addProduct.form[field]];
      updated[idx] = value;

      return {
        addProduct: {
          ...state.addProduct,
          form: {
            ...state.addProduct.form,
            [field]: updated,
          },
        },
      };
    }),
  removeFromArray: (field, idx) =>
    set((state) => ({
      addProduct: {
        ...state.addProduct,
        form: {
          ...state.addProduct.form,
          [field]: state.addProduct.form[field].filter(
            (_, index) => index !== idx,
          ),
        },
      },
    })),
  setUserInput: (field, input) =>
    set((state) => ({
      addProduct: {
        ...state.addProduct,
        form: {
          ...state.addProduct.form,
          [field]: input,
        },
      },
    })),
});
