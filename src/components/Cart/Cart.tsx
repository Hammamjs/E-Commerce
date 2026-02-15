import { ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import useOrders from '@/hooks/use-orders';
import useCart from '@/hooks/use-cart';
import CartHeader from './CartHeader';
import CartCardList from './CartCardList';
import ClearCart from './ClearCart';
import OrderSummary from './OrderSummary';

function Cart() {
  const {
    cart,
    handleClearCart,
    handleAddOrUpdateCart,
    handleDeleteProductFromCart,
  } = useCart();
  const { isLoading, handlePaymentIfAuthenticated } = useOrders({
    id: cart._id,
  });

  if (cart.items?.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 text-foreground/30 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Your Cart is Empty
              </h1>
              <p className="text-foreground/60">
                Looks like you haven't added anything to your cart yet
              </p>
            </div>
            <Link to="/products">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <CartHeader cart={cart} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <CartCardList
              cart={cart}
              handleAddOrUpdateCart={handleAddOrUpdateCart}
              handleDeleteProductFromCart={handleDeleteProductFromCart}
            />

            <ClearCart
              handleClearCart={() => handleClearCart(cart._id || '')}
            />
          </div>

          {/* Order Summary */}
          <OrderSummary
            cart={cart}
            handlePaymentIfAuthenticated={handlePaymentIfAuthenticated}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default Cart;
