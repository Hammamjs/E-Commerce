import { addToLocalstorage } from '@/utils/LocalStorage';
import { useCartStore } from '@/stores/useCartStore';
import { useShallow } from 'zustand/shallow';
import type { Product } from '@/types/product';
import { useCallback, useEffect, useMemo } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import useCartMutation from './use-cartMutation';
import { toast } from './use-toast';

const useCart = () => {
  const {
    updateCartMutation,
    deleteFromCartMutation,
    deleteCartMutation,
    mutate,
  } = useCartMutation();

  const userId = useUserStore((state) => state.user?._id);

  const { addToCart, cart, updateQuantity, clearCart, removeFromCart } =
    useCartStore(
      useShallow((state) => ({
        addToCart: state.addToCart,
        cart: state.cart,
        updateQuantity: state.updateQuantity,
        clearCart: state.clearCart,
        removeFromCart: state.removeFromCart,
      }))
    );

  // Track user cart
  useEffect(() => {
    addToLocalstorage('user-cart', cart);
  }, [cart]);

  const handleAddToCart = useCallback(
    async (product: Product, qty: number = 1) => {
      if (!userId) {
        toast({ title: 'Please log in to add items to your cart.' });
        return;
      }
      const existingItems = cart.items.find(
        (item) => item.product._id === product._id
      );
      const updatedQty = (existingItems?.quantity || 0) + qty;

      addToCart({ product, quantity: qty });
      if (userId)
        mutate({
          cart: {
            product,
            quantity: updatedQty,
          },
        });
    },
    [addToCart, cart.items, userId]
  );

  const handleUpdateCart = useCallback(
    async (product: Product, qty: number = 1) => {
      if (!userId) {
        toast({ title: 'Please log in to update your cart.' });
        return;
      }

      const existInCart = cart.items.find(
        (item) => item.product._id === product._id
      );
      const updatedQty = (existInCart?.quantity || 0) + qty;

      updateQuantity(product._id, updatedQty);
      if (userId) {
        updateCartMutation({ items: product, quantity: qty });
      }
    },
    [cart.items, updateCartMutation, updateQuantity, userId]
  );

  const handleDeleteProductFromCart = useCallback(
    (productId: string) => {
      deleteFromCartMutation(productId);
      removeFromCart(productId);
    },
    [deleteFromCartMutation, removeFromCart]
  );

  const handleClearCart = useCallback(
    (cartId: string) => {
      deleteCartMutation(cartId);
      clearCart();
    },
    [clearCart, deleteCartMutation]
  );

  const itemsMap = useMemo(() => {
    const map = new Map<string, (typeof cart.items)[0]>();
    cart.items.forEach((item) => map.set(item.product._id, item));
    return map;
  }, [cart.items]);

  const handleAddOrUpdateCart = useCallback(
    (product: Product, qty: number) => {
      requestIdleCallback(() => {
        const isExistInCart = itemsMap.has(product._id);
        return isExistInCart
          ? handleUpdateCart(product, qty)
          : handleAddToCart(product, qty);
      });
    },
    [handleAddToCart, handleUpdateCart]
  );

  return {
    handleAddToCart,
    handleUpdateCart,
    handleDeleteProductFromCart,
    handleClearCart,
    handleAddOrUpdateCart,
    cart,
  };
};

export default useCart;
