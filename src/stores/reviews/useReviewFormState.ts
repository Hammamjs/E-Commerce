import { create } from 'zustand';

type ModeType = 'edit' | 'create';
type ReviewFormState = {
  rate: number;
  comment: string;
  hoverRating: number;
  mode: ModeType;
  reviewId: string | null;
};

const initialState: ReviewFormState = {
  comment: '',
  hoverRating: 0,
  mode: 'create',
  rate: 0,
  reviewId: null,
};

type ReviewFormStore = {
  form: ReviewFormState;
  setForm: (form: ReviewFormState) => void;
  resetForm: () => void;
  setComment: (comment: string) => void;
  setRate: (rate: number) => void;
  setHoveringRate: (hoverRating: number) => void;
};

const useReviewFormState = create<ReviewFormStore>((set) => ({
  form: initialState,
  setForm: (form) => set({ form }),
  resetForm: () => set({ form: initialState }),
  setComment: (comment) =>
    set((state) => ({ form: { ...state.form, comment } })),
  setRate: (rate) => set((state) => ({ form: { ...state.form, rate } })),
  setHoveringRate: (hoverRating) =>
    set((state) => ({ form: { ...state.form, hoverRating } })),
}));

export default useReviewFormState;
