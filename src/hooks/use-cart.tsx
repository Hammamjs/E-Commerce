import { addToLocalstorage } from '@/utils/LocalStorage';
import { useCartStore } from '@/stores/useCartStore';
import { useShallow } from 'zustand/shallow';
import type { Product } from '@/types/product';
import { useCallback, useEffect, useMemo } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import userCartCommand from '../features/cart/command/userCommand';
import { toast } from './use-toast';

const useCart = () => {
  const {
    updateCartMutation,
    deleteFromCartMutation,
    deleteCartMutation,
    addToCartMutation,
  } = userCartCommand();

  const userId = useUserStore((state) => state.user?._id);

  const { addToCart, cart, updateQuantity, clearCart, removeFromCart } =
    useCartStore(
      useShallow((state) => ({
        addToCart: state.addToCart,
        cart: state.cart,
        updateQuantity: state.updateQuantity,
        clearCart: state.clearCart,
        removeFromCart: state.removeFromCart,
      })),
    );

  // Track user cart
  useEffect(() => {
    addToLocalstorage('user-cart', cart);
  }, [cart]);

  const itemsMap = useMemo(() => {
    return Object.fromEntries(cart.items.map((i) => [i.product._id, i]));
  }, [cart.items]);

  const handleAddOrUpdateCart = useCallback(
    (product: Product, qty: number = 1) => {
      const existingItem = itemsMap[product._id];
      const updatedQty = (existingItem?.quantity || 0) + qty;

      if (existingItem) {
        updateQuantity(product._id, updatedQty);
        updateCartMutation({ items: product, quantity: updatedQty });
      } else {
        addToCart({ product, quantity: updatedQty });
        addToCartMutation({ cart: { product, quantity: updatedQty } });
      }

      toast({
        title: `Product updated`,
        description: `${product.name} updated successfuly`,
      });
    },
    [
      itemsMap,
      addToCartMutation,
      addToCart,
      updateQuantity,
      updateCartMutation,
      userId,
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
