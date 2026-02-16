import { useCartStore } from '@/features/cart/store/useCartStore';
import { useShallow } from 'zustand/shallow';
import { useCallback, useMemo } from 'react';
import { useUserStore } from '@/stores/user/useUserStore';
import { toast } from '../../../hooks/use-toast';
import { useProductsStore } from '@/stores/product/useProductsStore';
import useCartSync from './useCartSync';
import {
  useAddToCart,
  useDeleteCart,
  useDeleteFromCart,
  useUpdateCart,
} from '../command/cartCommand';
import useCartCommands from './useCartCommands';

const useCart = () => {
  const { mutate: updateCartMutation } = useUpdateCart();
  const { mutate: addToCartMutation } = useAddToCart();
  const { mutate: deleteFromCartMutation } = useDeleteFromCart();
  const { mutate: deleteCartMutation } = useDeleteCart();

  const { addToCart, cart, clearCart, removeFromCart, updateQuantity } =
    useCartStore();

  // Track user cart
  useCartSync(cart);

  const { handleAddOrUpdate } = useCartCommands();

  const userId = useUserStore((state) => state.user?._id);

  const productById = useProductsStore(useShallow((state) => state.byId));

  const itemsMap = useMemo(() => {
    return Object.fromEntries(cart.items.map((i) => [i.product._id, i]));
  }, [cart.items]);

  const handleAddOrUpdateCart = useCallback(
    (productId: string, qty: number = 1) => {
      const existingItem = itemsMap[productId];
      const updatedQty = (existingItem?.quantity || 0) + qty;

      const product = productById[productId];

      if (!product) return toast({ title: 'Product not found' });

      handleAddOrUpdate(product, updatedQty, existingItem);
    },
    [
      itemsMap,
      addToCartMutation,
      addToCart,
      updateQuantity,
      updateCartMutation,
      userId,
      productById,
    ],
  );

  const handleDeleteProductFromCart = useCallback(
    (productId: string) => {
      deleteFromCartMutation(productId);
      removeFromCart(productId);
    },
    [deleteFromCartMutation, removeFromCart],
  );

  const handleClearCart = useCallback(
    (cartId: string) => {
      deleteCartMutation(cartId);
      clearCart();
    },
    [clearCart, deleteCartMutation],
  );

  return {
    handleDeleteProductFromCart,
    handleClearCart,
    handleAddOrUpdateCart,
    cart,
  };
};

export default useCart;
