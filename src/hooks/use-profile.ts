import { useFavoriteStore } from '@/stores/useFavoritesStore';
import { useCartStore } from '@/stores/useCartStore';
import { useUserStore } from '@/stores/useUserStore';
import { useMutation } from '@tanstack/react-query';
import {
  updateUserData,
  updateUserImage,
  updateUserPassword,
} from '@/api/UserApi';
import type { UserInfo } from '@/types/User';
import { addToLocalstorage } from '@/utils/LocalStorage';
import { useState, type ChangeEvent } from 'react';
import { toast } from '@/hooks/use-toast';
import { useShallow } from 'zustand/shallow';
import axios from 'axios';
import { staticEndpoint } from '@/api/BaseUrl';

const useProfile = () => {
  const { user, updateUser, validate } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      updateUser: state.updateUser,
      validate: state.validate,
    }))
  );
  const cart = useCartStore((state) => state.cart);
  const favorites = useFavoriteStore((state) => state.favorites);
  const [changePass, setChangePass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: updateUserMutation } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: updateUserData,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const setUser = useUserStore((state) => state.setUser);

  const { mutate: updateUserPassowrdMutation } = useMutation({
    mutationKey: ['update-user-password'],
    mutationFn: updateUserPassword,
    onSuccess: (data) => {
      console.log(data);
      toast({ title: user?.username, description: data?.message });
      addToLocalstorage('user', data.document);
    },
    onError: (err) => {
      if (err instanceof axios.AxiosError) {
        console.log(err);
        toast({ title: err?.response?.data?.message });
      }
    },
  });

  const handleOnImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target?.files?.[0] as File;
    const formData = new FormData();
    formData.append('profileImg', image);
    try {
      const response = await updateUserImage(user!._id, formData);
      setUser(response.document);
      toast({
        title: 'Image changed successfuly',
        description: 'User image updated',
        type: 'success',
      });
      addToLocalstorage('user', response.document);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateUser = (user: Partial<UserInfo>) => {
    updateUserMutation({ ...user });
    addToLocalstorage('user', user);
  };
  const handleUpdateUserPassword = () => {
    console.log(user?.password);
    const result = validate();
    if (result.errors) {
      toast({ title: result.errors?.[0]?.message });
      console.log(result.errors);
    } else {
      const data = {
        newPassword: user!.password,
        confirmPassword: user!.passwordConfirm,
        currentPassword: user!.currentPassword,
        email: user!.email,
      };
      updateUserPassowrdMutation(data);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500 text-white';
      case 'Processing':
        return 'bg-yellow-500 text-white';
      case 'Shipped':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return {
    cart,
    favorites,
    changePass,
    setChangePass,
    showPassword,
    setShowPassword,
    handleOnImageChange,
    handleUpdateUser,
    handleUpdateUserPassword,
    getStatusColor,
    updateUser,
    user,
    staticEndpoint,
  };
};

export default useProfile;
