import type { Cart } from '@/features/cart/types/Cart';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = { cart: Cart };

const CartHeader = ({ cart }: Props) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Shopping Cart
        </h1>
        <p className="text-foreground/60">
          {cart.items.length} items in your cart
        </p>
      </div>
      <Link
        to="/products"
        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartHeader;
