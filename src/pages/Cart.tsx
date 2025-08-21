import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCart from '@/hooks/use-cart';
import CartCard from './CartCard';
import useOrders from '@/hooks/use-orders';

const Cart = () => {
  const { cart, handleClearCart } = useCart();
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <CartCard key={item.product._id} item={item} />
            ))}

            <div className="flex justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => handleClearCart(cart._id || '')}
                className="text-destructive border-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-card/50 backdrop-blur-sm border-border/20 sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-foreground/80">Subtotal</span>
                    <span className="font-medium">${}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-foreground/80">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-foreground/80">Tax</span>
                    <span className="font-medium">
                      ${((cart.totalPrice || 0) * 0.1).toFixed(2)}
                    </span>
                  </div>

                  <hr className="border-border" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      ${((cart.totalPrice || 0) * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePaymentIfAuthenticated}
                  >
                    {isLoading ? 'Ordering...' : 'Proceed to Checkout'}
                  </Button>
                  <p className="text-xs text-foreground/60 text-center">
                    Secure checkout powered by Stripe
                  </p>
                </div>

                <div className="mt-6 p-4 bg-gradient-accent rounded-lg">
                  <h3 className="font-semibold text-sm mb-2">Free Shipping</h3>
                  <p className="text-xs text-foreground/80">
                    Enjoy free shipping on all orders. No minimum purchase
                    required.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
