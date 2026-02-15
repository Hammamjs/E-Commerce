import FailureDetails from './FailureDetails';
import HelpSection from './HelpSection';
import useCart from '@/hooks/use-cart';
import { useEffect, useState } from 'react';
import { AlertTriangle, XCircle } from 'lucide-react';

const PaymentFailed = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const { cart } = useCart('');

  if (!cart._id) return;

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
        <FailureDetails cart={cart} />

        {/* Help Section */}
        <HelpSection />
      </div>
    </div>
  );
};

export default PaymentFailed;
