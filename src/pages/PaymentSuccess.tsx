import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Package,
  Download,
  ArrowRight,
  Sparkles,
  Gift,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getLocalstorage } from '@/utils/LocalStorage';
import type { OrdersType } from '@/types/Orders';

const PaymentSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [order, setOrder] = useState<OrdersType | null>(null);

  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => {
      setShowConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'],
      });

      // Second burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#EF4444', '#F97316', '#84CC16'],
        });
      }, 300);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedOrder = getLocalstorage('order') as OrdersType;
    console.log(storedOrder);
    if (setOrder) setOrder(storedOrder);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Animation Container */}
        <div className="text-center mb-8 relative">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            {showConfetti && (
              <div className="absolute -top-4 -right-4">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-2 animate-fade-in">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed!
          </p>
        </div>

        {/* Order Summary Card */}
        <Card className="mb-6 overflow-hidden shadow-xl border-0 bg-gradient-to-r from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Order Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Order #{order?._id}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Processing your order
                  </p>
                </div>
              </div>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-3 py-1">
                Confirmed
              </Badge>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" />
                Items Purchased
              </h4>
              {order?.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 px-4 bg-muted/30 rounded-lg"
                >
                  <div className="flex-1">
                    <span className="font-medium text-foreground">
                      {item.product.name}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      × {order.quantity}
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    ${(order?.totalPrice || 0).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="bg-gradient-primary p-4 rounded-lg text-center mb-6">
              <div className="text-primary-foreground">
                <p className="text-sm opacity-90 mb-1">Total Paid</p>
                <p className="text-3xl font-bold">
                  ${order?.totalPrice?.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mb-6 border border-blue-200/20">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900 dark:text-blue-100">
                  Estimated Delivery
                </span>
              </div>
              <p className="text-blue-800 dark:text-blue-200">3-4 days</p>
              <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                We'll send you tracking information once your order ships.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Receipt
              </Button>

              <Button variant="outline" asChild>
                <Link to="/orders" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  View Orders
                </Link>
              </Button>

              <Button asChild className="flex items-center gap-2">
                <Link to="/products">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Actions */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              🎁 Spread the Love
            </h3>
            <p className="text-muted-foreground mb-4">
              Love your purchase? Share it with friends and get rewards!
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" size="sm">
                Share Purchase
              </Button>
              <Button variant="outline" size="sm">
                Rate Experience
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
