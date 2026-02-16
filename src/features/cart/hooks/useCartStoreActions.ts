import { useShallow } from 'zustand/shallow';
import { useCartStore } from '../store/useCartStore';

const useCartStoreActions = () => {
  return useCartStore(
    useShallow((state) => ({
      addToCart: state.addToCart,
      cart: state.cart,
      updateQuantity: state.updateQuantity,
      clearCart: state.clearCart,
      removeFromCart: state.removeFromCart,
    })),
  );
};

export default useCartStoreActions;
