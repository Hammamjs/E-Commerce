import { LogUserIn } from '@/api/UserApi';
import { useUserStore } from '@/features/users/store/useUserStore';
import { toast } from 'sonner';
import axios from 'axios';

import { addToLocalstorage } from '@/shared/utils/LocalStorage';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserStore((state) => state.setUser);

  const { mutate } = useMutation({
    mutationFn: LogUserIn,
    onSuccess: (data) => {
      setUser(data.user);
      addToLocalstorage('user', data.user);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 10);
    },
    onError: (error) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const message = error?.response?.data?.message ?? error?.response?.data;
        toast.error(message);
      }
    },
  });

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const handleSubmit = async () => {
    setIsLoading(true);

    // Api call
    mutate({ email, password });

    setIsLoading(false);
  };

  return {
    showPassword,
    setShowPassword,
    email,
    setEmail,
    isLoading,
    password,
    setPassword,
    handleSubmit,
  };
};

export default useLogin;
