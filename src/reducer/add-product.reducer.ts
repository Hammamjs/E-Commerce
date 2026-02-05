type State = {
  features: string[];
  images: string[];
  colors: string[];
  size: string[];
  typedSize: string;
  selectedColor: string;
};

const ACTION_TYPE = {
  ADD_FEATURE: 'ADD_FEATURE',
  UPDATE_FEATURE: 'UPDATE_FEATURE',
  REMOVE_FEATURE: 'REMOVE_FEATURE',
  ADD_IMAGE: 'ADD_IMAGE',
  UPDATE_IMAGE: 'UPDATE_IMAGE',
  REMOVE_IMAGE: 'REMOVE_IMAGE',
  ADD_COLOR: 'ADD_COLOR',
  ADD_SIZE: 'ADD_SIZE',
  REMOVE_SIZE: 'REMOVE_SIZE',
  SET_TYPED_SIZE: 'SET_TYPED_SIZE',
  REMOVE_COLOR: 'REMOVE_COLOR',
  SET_COLOR: 'SET_COLOR',
} as const;

export type ActionType = (typeof ACTION_TYPE)[keyof typeof ACTION_TYPE];

type Action =
  | { type: typeof ACTION_TYPE.ADD_FEATURE }
  | {
      type: typeof ACTION_TYPE.UPDATE_FEATURE;
      payload: { value: string; index: number };
    }
  | { type: typeof ACTION_TYPE.REMOVE_FEATURE; payload: number }
  | { type: typeof ACTION_TYPE.ADD_SIZE; payload: string }
  | { type: typeof ACTION_TYPE.REMOVE_SIZE; payload: string }
  | { type: typeof ACTION_TYPE.SET_TYPED_SIZE; payload: string }
  | { type: typeof ACTION_TYPE.ADD_IMAGE }
  | {
      type: typeof ACTION_TYPE.UPDATE_IMAGE;
      payload: { value: string; index: number };
    }
  | { type: typeof ACTION_TYPE.REMOVE_IMAGE; payload: number }
  | { type: typeof ACTION_TYPE.ADD_COLOR; payload: string }
  | { type: typeof ACTION_TYPE.SET_COLOR; payload: string }
  | { type: typeof ACTION_TYPE.REMOVE_COLOR; payload: number };

export const AddProductReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION_TYPE.ADD_FEATURE:
      return {
        ...state,
        features: [...state.features, ''],
      };

    case ACTION_TYPE.UPDATE_FEATURE: {
      const { index, value } = action.payload;

      const features = [...state.features];
      features[index] = value;

      return {
        ...state,
        features,
      };
    }

    case ACTION_TYPE.REMOVE_FEATURE:
      return {
        ...state,
        features: state.features.filter(
          (_feat, index) => index != action.payload,
        ),
      };

    case ACTION_TYPE.ADD_IMAGE:
      return { ...state, images: [...state.images, ''] };

    case ACTION_TYPE.UPDATE_IMAGE: {
      const { index, value } = action.payload;

      const images = [...state.images];

      images[index] = value;

      return { ...state, images };
    }

    case ACTION_TYPE.REMOVE_IMAGE:
      return {
        ...state,
        images: state.images.filter((_, index) => index != action.payload),
      };

    case ACTION_TYPE.SET_TYPED_SIZE:
      return { ...state, typedSize: action.payload };

    case ACTION_TYPE.ADD_SIZE:
      return {
        ...state,
        size: [...state.size, action.payload],
        typedSize: '',
      };

    case ACTION_TYPE.REMOVE_SIZE:
      return {
        ...state,
        size: state.size.filter((s) => s != action.payload),
        typedSize: '',
      };

    case ACTION_TYPE.SET_COLOR:
      return { ...state, selectedColor: action.payload };

    case ACTION_TYPE.ADD_COLOR:
      return {
        ...state,
        colors: [...state.colors, action.payload],
        selectedColor: '#000',
      };

    case ACTION_TYPE.REMOVE_COLOR:
      return {
        ...state,
        colors: state.colors.filter((_, c) => c != action.payload),
      };

    default:
      throw new Error('unhandled action error');
  }
};

export const AddProductInitialState: State = {
  colors: [''],
  features: [''],
  images: [''],
  selectedColor: '#000000',
  size: [''],
  typedSize: '',
};
