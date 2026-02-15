import { CreditCard } from 'lucide-react';
import CartItem from './CartItem';
import type { Cart } from '@/types/Cart';

type CartListProps = {
  cart: Cart;
};

const CartList = ({ cart }: CartListProps) => {
  return (
    <div className="space-y-4 mb-6">
      <h4 className="font-semibold text-foreground flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-primary" />
        Items in Your Order
      </h4>
      {cart.items.map((item) => (
        <CartItem item={item} key={item._id} />
      ))}
    </div>
  );
};

export default CartList;
