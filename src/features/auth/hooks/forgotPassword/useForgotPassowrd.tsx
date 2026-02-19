import { forgotPassword } from '@/api/UserApi';
import { addToLocalstorage } from '@/shared/utils/LocalStorage';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

const useForgotPassowrd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      toast.error('Email is required');
      return;
    }
    setIsLoading(true);
    try {
      const response = await forgotPassword(email);
      setIsEmailSent?.(true);
      toast.success(response.message);
      addToLocalstorage('user-reset-email', email);
    } catch (err) {
      if (err instanceof axios.AxiosError) {
        toast.error(err.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleSubmit,
    email,
    setEmail,
    isLoading,
    setIsLoading,
    isEmailSent,
    setIsEmailSent,
  };
};

export default useForgotPassowrd;
