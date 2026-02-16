import type { Product } from '@/types/product';
import { useAddToCart, useUpdateCart } from '../command/cartCommand';
import useCartStoreActions from './useCartStoreActions';
import { toast } from '@/hooks/use-toast';
import type { CartEntry } from '../types/Cart';

const useCartCommands = () => {
  const { mutate: updateCartMutation } = useUpdateCart();
  const { mutate: addToCartMutation } = useAddToCart();

  const { addToCart, updateQuantity } = useCartStoreActions();

  const handleAddOrUpdate = (
    product: Product,
    updatedQty: number,
    existingItem: CartEntry | undefined,
  ) => {
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
  };

  return { handleAddOrUpdate };
};

export default useCartCommands;
