import CartCard from './CartCard';
import type { Cart } from '@/features/cart/types/Cart';

type Props = {
  cart: Cart;
  handleAddOrUpdateCart: (productId: string, qty?: number) => void;
  handleDeleteProductFromCart: (productId: string) => void;
};

const CartCardList = ({
  cart,
  handleAddOrUpdateCart,
  handleDeleteProductFromCart,
}: Props) => {
  return cart.items.map((item) => (
    <CartCard
      key={item.product?._id}
      item={item}
      handleAddOrUpdateCart={handleAddOrUpdateCart}
      handleDeleteProductFromCart={handleDeleteProductFromCart}
    />
  ));
};

export default CartCardList;
