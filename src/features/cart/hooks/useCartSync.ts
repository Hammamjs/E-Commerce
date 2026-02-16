import { addToLocalstorage } from '@/shared/utils/LocalStorage';
import type { Cart } from '../types/Cart';
import { useEffect } from 'react';

const useCartSync = (cart: Cart) => {
  useEffect(() => {
    addToLocalstorage('user-cart', cart);
  }, [cart]);
};

export default useCartSync;
