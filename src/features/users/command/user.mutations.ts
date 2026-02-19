import { updateUserDataApi, updateUserPasswordApi } from '@/api/UserApi';
import { useBaseMutation } from '@/shared/lib/react-query/useBaseMutation';
import type { UserInfo } from '../types/User';
import { addToLocalstorage } from '@/shared/utils/LocalStorage';

export const updateUserMutation = () =>
  useBaseMutation<unknown, Partial<UserInfo>>({
    mutationFn: updateUserDataApi,
    successMessage: 'User information updated',
    invalidatedKeys: ['update-user'],
  });

type data = {
  newPassword: string;
  confirmPassword: string;
  currentPassword: string;
  email: string;
};

export const updatePasswordMutation = () =>
  useBaseMutation<unknown, data>({
    invalidatedKeys: ['update-password'],
    mutationFn: updateUserPasswordApi,
    onSuccess: (data) => addToLocalstorage('user', data),
    successMessage: 'Password updated successfully',
  });
