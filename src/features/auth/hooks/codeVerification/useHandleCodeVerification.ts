import { codeVerification } from '@/api/UserApi';
import { AxiosError } from 'axios';
import { useCallback, type Dispatch, type SetStateAction } from 'react';

type useHandleCodeVerificationProps = {
  code: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

type Result<T, E> = { type: 'success'; data: T } | { type: 'error'; error: E };

type verificationResult = Result<string, string>;

const useHandleCodeVerification = ({
  code,
  setIsLoading,
}: useHandleCodeVerificationProps) => {
  const handleSubmit = useCallback(async (): Promise<verificationResult> => {
    if (code.length !== 6)
      return { type: 'error', error: 'Code must be 6 digits' };
    setIsLoading(true);
    try {
      const response = await codeVerification(code);
      return { type: 'success', data: response.data };
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        return { type: 'error', error: err.response?.data?.message };
      }
      return { type: 'error', error: 'Unknown error' };
    } finally {
      setIsLoading(false);
    }
  }, [code, setIsLoading]);

  return { handleSubmit };
};

export default useHandleCodeVerification;
