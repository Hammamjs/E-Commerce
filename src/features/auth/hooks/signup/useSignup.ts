import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUser } from '@/api/UserApi';
import { useUserStore } from '@/features/users/store/useUserStore';
import { SignupValidation } from '@/schema/SignupSchema';
import { toast } from 'sonner';

import axios from 'axios';
const useSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const setUser = useUserStore((state) => state.setUser);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = SignupValidation.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      setIsLoading(false);
      return;
    }
    try {
      const res = await createUser(formData);
      setUser(res.user);
      toast.success(res.message);
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof axios.AxiosError) {
        const message: string =
          err.response!.data?.errors?.[0]?.msg ?? err.response?.data?.message;
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    showConfirmPassword,
    setShowConfirmPassword,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit,
    handleInputChange,
    formData,
  };
};

export default useSignup;
