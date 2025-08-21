import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  XCircle,
  CreditCard,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Phone,
  Mail,
} from 'lucide-react';
import useCart from '@/hooks/use-cart';

const PaymentFailed = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  const nav = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    // Trigger failure animation
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Failure Animation Container */}
        <div className="text-center mb-8 relative">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <XCircle className="w-12 h-12 text-white" />
            </div>
            {showAnimation && (
              <div className="absolute -top-4 -right-4">
                <AlertTriangle className="w-8 h-8 text-orange-400 animate-bounce" />
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-2 animate-fade-in">
            Payment Failed 😞
          </h1>
          <p className="text-xl text-muted-foreground">
            Don't worry, your order is saved. Let's try again!
          </p>
        </div>

        {/* Failure Details Card */}
        <Card className="mb-6 overflow-hidden shadow-xl border-0 bg-gradient-to-r from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Order Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <CreditCard className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Order #{cart._id}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Payment processing failed
                  </p>
                </div>
              </div>
              <Badge className="bg-red-500/10 text-red-600 border-red-500/20 px-3 py-1">
                Failed
              </Badge>
            </div>

            {/* Failure Reason */}
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg mb-6 border border-red-200/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-900 dark:text-red-100">
                  What happened?
                </span>
              </div>
              <p className="text-red-800 dark:text-red-200">
                Something went wrong
              </p>
              <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                This is usually a temporary issue that can be resolved by trying
                again.
              </p>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Items in Your Order
              </h4>
              {cart.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 px-4 bg-muted/30 rounded-lg"
                >
                  <div className="flex-1">
                    <span className="font-medium text-foreground">
                      {item.product.name}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      × {item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    ${item.total?.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-lg text-center mb-6">
              <div className="text-white">
                <p className="text-sm opacity-90 mb-1">Total Amount</p>
                <p className="text-3xl font-bold">
                  ${cart.totalPrice?.toFixed(2)}
                </p>
                <p className="text-sm opacity-75 mt-1">Still pending payment</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Button
                onClick={() => nav('/cart')}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <RefreshCw className="w-4 h-4" />
                Retry Payment
              </Button>

              <Button variant="outline" asChild>
                <Link to="/cart" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Cart
                </Link>
              </Button>
            </div>

            {/* Alternative Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Support
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Help
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              💡 Need Help?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help you complete your purchase.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" size="sm">
                Live Chat
              </Button>
              <Button variant="outline" size="sm">
                FAQ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentFailed;
