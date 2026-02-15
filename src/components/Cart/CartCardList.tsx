import CartCard from '@/components/Cart/CartCard';
import type { Cart } from '@/types/Cart';

type Props = {
  cart: Cart;
  handleAddOrUpdateCart: (qty?: number) => void;
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
