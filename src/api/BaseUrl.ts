import {
  checkInLoacalstorage,
  removeFromLocalstorage,
} from '@/utils/LocalStorage';
import axios from 'axios';

export const apiEndPoint =
  import.meta.env.VITE_API_URL || 'http://localhost:3500/api/v1';
export const staticEndpoint =
  import.meta.env.VITE_API_STATIC_URL || 'http://localhost:3500';
export const createInstance = axios.create({
  baseURL: apiEndPoint,
  withCredentials: true,
});

createInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 403
    ) {
      if (checkInLoacalstorage('user')) {
        removeFromLocalstorage('user');
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);
