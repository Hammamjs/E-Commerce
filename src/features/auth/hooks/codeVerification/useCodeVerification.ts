import { forgotPassword } from '@/api/UserApi';
import { getLocalstorage } from '@/shared/utils';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import useHandleCodeVerification from './useHandleCodeVerification';

const useCodeVerification = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const otpRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { handleSubmit } = useHandleCodeVerification({ code, setIsLoading });

  const onSubmit = async () => {
    const result = await handleSubmit();

    if (result.type === 'success') {
      // Navigate to reset password page
      navigate('/reset-password');
      toast({
        title: 'Code verified successfully!',
        description: result.data,
      });
    } else {
      toast({
        title: 'Something went wrong!',
        description: result.error,
        type: 'error',
      });
    }
  };

  const handleResendCode = useCallback(async () => {
    const email = (getLocalstorage('user-reset-email') as string) ?? '';
    if (!email) {
      toast({
        title: 'Something went wrong!',
        description: 'Request new code again',
      });
      return;
    }
    try {
      setIsCodeSent(true);
      await forgotPassword(email);
      toast({
        title: 'Code sent!',
        description: 'A new verification code has been sent to your email.',
        type: 'success',
      });
      setTimeout(() => setIsCodeSent(false), 3000);
    } catch (err) {
      if (err instanceof AxiosError) {
        const message =
          err.response!.data?.errors?.[0].msg || err.response?.data?.message;
        toast({ title: 'Error!', description: message, type: 'error' });
      }
    }

    // Reset the sent state after 3 seconds
    setTimeout(() => setIsCodeSent(false), 3000);
  }, [toast]);

  useEffect(() => {
    otpRef.current?.focus();
  }, []);

  return {
    code,
    setCode,
    isLoading,
    isCodeSent,
    onSubmit,
    handleResendCode,
    otpRef,
  };
};

export default useCodeVerification;
