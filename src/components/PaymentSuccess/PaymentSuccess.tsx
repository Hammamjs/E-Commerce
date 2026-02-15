import type { OrdersType } from '@/types/Orders';
import { getLocalstorage } from '@/utils/LocalStorage';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import SuccessAnimation from './SuccessAnimation';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import PaymentOrderSummary from './PaymentOrderSummary';

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
    if (setOrder) setOrder(storedOrder);
  }, []);

  if (!order) return;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Animation Container */}
        <SuccessAnimation showConfetti={showConfetti} />

        {/* Order Summary Card */}
        <PaymentOrderSummary order={order} />

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
