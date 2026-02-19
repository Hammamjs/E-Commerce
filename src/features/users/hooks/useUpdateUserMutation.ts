import {
  updatePasswordMutation,
  updateUserMutation,
} from '../command/user.mutations';
import type { UserInfo } from '../types/User';

type UpdatePasswordParams = {
  newPassword: string;
  confirmPassword: string;
  currentPassword: string;
  email: string;
};

const useUpdateUserMutation = () => {
  const updateUser = updateUserMutation();
  const updatePassword = updatePasswordMutation();

  const updateUserInfo = (user: Partial<UserInfo>) => updateUser.mutate(user);
  const updateUserPassword = (updated: UpdatePasswordParams) =>
    updatePassword.mutate(updated);

  return { updateUserInfo, updateUserPassword };
};

export default useUpdateUserMutation;
