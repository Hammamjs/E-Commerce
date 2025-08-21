import {
  addToCartApi,
  deleteCart,
  deleteProductFromCart,
  updateCart,
} from '@/api/CartApi';
import handleError from '@/utils/ErrorHandler';
import { useMutation } from '@tanstack/react-query';
import { toast } from './use-toast';

const useCartMutation = () => {
  const { mutate } = useMutation({
    mutationFn: addToCartApi,
    onError: (err) => handleError(err, 'cart'),
    onSuccess: () => {
      toast({ title: 'Product added to cart successfully!' });
    },
  });

  const { mutate: updateCartMutation } = useMutation({
    mutationFn: updateCart,
    onError: (err) => handleError(err, 'cart'),
    onSuccess: () => {
      toast({ title: 'Cart updated successfully!' });
    },
  });

  const { mutate: deleteFromCartMutation } = useMutation({
    mutationFn: deleteProductFromCart,
    onError: (err) => handleError(err, 'cart'),
    onSuccess: () => {
      toast({ title: 'Product removed from cart successfully!' });
    },
  });

  const { mutate: deleteCartMutation } = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      toast({ title: 'Cart cleared successfully!' });
    },
    onError: (err) => handleError(err, 'cart'),
  });

  return {
    mutate,
    updateCartMutation,
    deleteFromCartMutation,
    deleteCartMutation,
  };
};

export default useCartMutation;
