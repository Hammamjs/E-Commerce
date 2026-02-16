import { useBaseMutation } from '@/shared/lib/react-query/useBaseMutation';
import type { CartEntry } from '../types/Cart';
import {
  addToCartApi,
  deleteCart,
  deleteProductFromCart,
  updateCart,
} from '../api/CartApi';
import type { Product } from '@/types/product';

type CartResponse = { cart: CartEntry };

type CartUpdateParams = {
  items: Product;
  quantity: number;
};

const invalidateCart = ['cart'];

export const useAddToCart = () =>
  useBaseMutation<CartResponse, { cart: CartEntry }>({
    mutationFn: addToCartApi,
    invalidatedKeys: invalidateCart,
    successMessage: 'Product successfully added!',
  });

export const useUpdateCart = () =>
  useBaseMutation<CartResponse, CartUpdateParams>({
    mutationFn: updateCart,
    invalidatedKeys: invalidateCart,
    successMessage: 'Cart updated successfully',
  });

export const useDeleteFromCart = () =>
  useBaseMutation<CartResponse, string>({
    mutationFn: deleteProductFromCart,
    invalidatedKeys: invalidateCart,
    successMessage: 'Product removed from cart',
  });

export const useDeleteCart = () =>
  useBaseMutation<CartResponse, string>({
    mutationFn: deleteCart,
    invalidatedKeys: invalidateCart,
    successMessage: 'Cart removed',
  });
