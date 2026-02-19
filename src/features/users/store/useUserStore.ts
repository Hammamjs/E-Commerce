import {
  checkInLoacalstorage,
  getLocalstorage,
} from '@/shared/utils/LocalStorage';
import type { User, UserInfo } from '@/features/users/types/User';
import { create } from 'zustand';
import { UserSchema } from '@/schema/User';

const userInitialState: UserInfo = {
  username: '',
  email: '',
  role: 'GUEST',
  phone: '',
  address: '',
  bio: '',
  currentPassword: '',
  password: '',
  passwordConfirm: '',
  _id: '',
  profileImg: '',
};

const loadUserFromLocalstorage = (): UserInfo => {
  if (typeof window === 'undefined') return userInitialState;
  try {
    const user = checkInLoacalstorage('user')
      ? (getLocalstorage('user') as Partial<UserInfo>)
      : {};
    return { ...userInitialState, ...user };
  } catch {
    return userInitialState;
  }
};

export const useUserStore = create<User>((set, get) => ({
  user: loadUserFromLocalstorage(),
  setUser: (user) =>
    set({
      user,
    }),
  logout: () => set({ user: userInitialState }),
  updateUser: (key, value) =>
    set((state) => ({
      user: { ...state.user!, [key]: value },
    })),
  validate: () => {
    const result = UserSchema.safeParse(get().user);
    if (!result.success) {
      const errors = result.error.issues;
      return {
        success: false,
        errors,
      };
    }
    return { success: true };
  },
}));
