import { useState } from 'react';
import { resetPassword } from '@/api/UserApi';
import {
  checkInLoacalstorage,
  getLocalstorage,
  removeFromLocalstorage,
} from '@/utils/LocalStorage';
import { toast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';

const useResetPassowrd = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const checkEmailsExist = (): void => {
    if (!checkInLoacalstorage('user-reset-email')) {
      toast({
        title: 'Something went wrong!',
        description: 'Request new code again',
      });
    }
    return;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    checkEmailsExist();
    if (password !== confirmPassword) {
      return;
    }

    setIsLoading(true);

    try {
      const email = getLocalstorage('user-reset-email') as string;
      console.log(email);
      const data = { email, newPassword: password, confirmPassword };
      await resetPassword(data);
      toast({
        title: 'password reset successfully',
        description: 'Log in now',
      });

      setIsPasswordReset(true);

      // remove email that stored in locastorage
      removeFromLocalstorage('user-reset-email');
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast({
          title: 'Error',
          description: err.response?.data.message,
          type: 'error',
        });
      }
    }
    setIsLoading(false);
    // setIsPasswordReset(true);
  };

  const passwordsMatch = password === confirmPassword;
  const isFormValid = password.length >= 8 && passwordsMatch;
  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isLoading,
    setPassword,
    password,
    setConfirmPassword,
    isPasswordReset,
    handleSubmit,
    passwordsMatch,
    isFormValid,
    confirmPassword,
  };
};

export default useResetPassowrd;
