import { create } from 'zustand';

export type State = {
  features: string[];
  images: string[];
  colors: string[];
  size: string[];
  typedSize: string;
  selectedColor: string;
};

export type ArrayField = {
  [k in keyof State]: State[k] extends string[] ? k : never;
}[keyof State];

export type TrackInput = keyof Pick<State, 'selectedColor' | 'typedSize'>;

export type AddProductStore = {
  form: State;
  resetForm: () => void;
  addToArray: (field: ArrayField, value: string | string[]) => void;
  updateInArray: (field: ArrayField, value: string, idx: number) => void;
  removeFromArray: (field: ArrayField, idx: number) => void;
  setUserInput: (field: TrackInput, input: string) => void;
};

export const CreateInitialState = (): State => ({
  colors: [''],
  features: [''],
  images: [''],
  selectedColor: '#000000',
  size: [],
  typedSize: '',
});

export const useAddProductState = create<AddProductStore>((set) => ({
  form: CreateInitialState(),
  resetForm: () => set({ form: CreateInitialState() }),
  addToArray: (field, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: [...state.form[field], value],
      },
    })),
  updateInArray: (field, value, idx) =>
    set((state) => {
      const updated = [...state.form[field]];
      updated[idx] = value;

      return {
        form: {
          ...state.form,
          [field]: updated,
        },
      };
    }),
  removeFromArray: (field, idx) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: state.form[field].filter((_, index) => index !== idx),
      },
    })),
  setUserInput: (field, input) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: input,
      },
    })),
}));
