export interface UserInfo {
  username: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
  phone: string;
  address: string;
  bio: string;
  password: string;
  passwordConfirm: string;
  _id: string;
  currentPassword: string;
  profileImg: string;
}

export interface User {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  logout: () => void;
  updateUser: (key: keyof UserInfo, value: unknown) => void;
  validate: () => { success: boolean; errors?: any };
}
