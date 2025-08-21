import type { UserInfo } from '@/types/User';
import { apiEndPoint, createInstance } from './BaseUrl';

export const LogUserIn = async (user: { email: string; password: string }) => {
  const res = await createInstance.post(apiEndPoint + '/auth', user);

  return res.data;
};

export const createUser = async (formdata: {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}) => {
  const res = await createInstance.post(apiEndPoint + '/auth/sign-up', {
    ...formdata,
  });

  return res.data;
};

export const updateUserData = async (user: Partial<UserInfo>) => {
  const response = await createInstance.put(
    apiEndPoint + `/users/${user?._id}`,
    user
  );

  return response.data;
};

export const updateUserPassword = async (data: {
  newPassword: string;
  confirmPassword: string;
  currentPassword: string;
  email: string;
}) => {
  const response = await createInstance.put(
    apiEndPoint + '/auth/change-password',
    data
  );

  return response.data;
};

export const logout = async () => {
  const response = await createInstance.get(apiEndPoint + '/auth/logout');

  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await createInstance.post(
    apiEndPoint + '/auth/forgot-password',
    { email }
  );

  return response.data;
};

export const codeVerification = async (resetCode: string) => {
  const response = await createInstance.post(
    apiEndPoint + '/auth/verify-code',
    {
      resetCode,
    }
  );

  return response.data;
};

export const resetPassword = async (userData: {
  newPassword: string;
  confirmPassword: string;
  email: string;
}) => {
  const response = await createInstance.patch(
    apiEndPoint + '/auth/reset-password',
    userData
  );

  return response;
};

export const updateUserImage = async (userId: string, formData: FormData) => {
  const response = await createInstance.put(
    apiEndPoint + `/users/${userId}`,
    formData
  );

  return response.data;
};
