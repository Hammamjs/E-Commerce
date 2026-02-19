import { toast } from '@/hooks/use-toast';
import axios from 'axios';

const handleError = (err: unknown, message: string = 'unknown') => {
  if (err instanceof axios.AxiosError) {
    toast({ title: err?.response?.data?.message || 'An error occurred' });
  } else {
    console.error(
      `${message.charAt(0).toUpperCase() + message.slice(1)} operation failed`
    );
    toast({ title: 'An error occured' });
  }
};

export default handleError;
