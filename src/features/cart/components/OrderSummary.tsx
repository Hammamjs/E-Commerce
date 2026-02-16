import type { Cart } from '@/features/cart/types/Cart';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

type OrderSummaryProps = {
  isLoading: boolean;
  cart: Cart;
  handlePaymentIfAuthenticated: () => void;
};

export default function OrderSummary({
  isLoading,
  cart,
  handlePaymentIfAuthenticated,
}: OrderSummaryProps) {
  return (
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
              Enjoy free shipping on all orders. No minimum purchase required.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
