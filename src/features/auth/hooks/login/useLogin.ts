import { useUserStore } from '@/features/users/store/useUserStore';
import { addToLocalstorage } from '@/shared/utils/LocalStorage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { UserInfo } from '@/features/users/types/User';
import useLoginMutation from '../../command/login/useLoginMutation';
const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserStore((state) => state.setUser);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const onSuccess = (data: { user: UserInfo }) => {
    setUser(data?.user);
    addToLocalstorage('user', data?.user);
    navigate(from, { replace: true });
  };

  const loginIn = useLoginMutation({ onSuccess });

  const handleSubmit = () => {
    // Api call
    loginIn.mutate({ email, password });
  };

  return {
    showPassword,
    setShowPassword,
    email,
    setEmail,
    isPending: loginIn.isPending,
    password,
    setPassword,
    handleSubmit,
  };
};

export default useLogin;
