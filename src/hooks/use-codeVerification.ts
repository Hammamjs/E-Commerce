import { codeVerification, forgotPassword } from '@/api/UserApi';
import { getLocalstorage } from '@/utils/LocalStorage';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

const useCodeVerification = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const otpRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    setIsLoading(true);
    try {
      const response = await codeVerification(code);
      toast({
        title: 'Code verified successfully!',
        description: response.message,
      });
      if (response) {
        // Navigate to reset password page
        navigate('/reset-password');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast({
          title: 'Something went wrong!',
          description: err.response?.data.message,
          type: 'error',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleResendCode = useCallback(async () => {
    const email = (getLocalstorage('user-reset-email') as string) ?? '';
    console.log(email);
    if (!email) {
      toast({
        title: 'Something went wrong!',
        description: 'Request new code again',
      });
      return;
    }
    try {
      await forgotPassword(email);
      toast({
        title: 'Code sent!',
        description: 'A new verification code has been sent to your email.',
        type: 'success',
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        const message =
          err.response!.data?.errors?.[0].msg || err.response?.data?.message;
        console.log(message);
        toast({ title: 'Error!', description: message, type: 'error' });
      }
    }

    // Reset the sent state after 3 seconds
    setTimeout(() => setIsCodeSent(false), 3000);
  }, []);

  useEffect(() => {
    otpRef.current?.focus();
  }, []);

  return {
    code,
    setCode,
    isLoading,
    isCodeSent,
    handleSubmit,
    handleResendCode,
    otpRef,
  };
};

export default useCodeVerification;
