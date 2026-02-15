import { AlertTriangle, Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import FailedPaymentHeader from './FailedPaymentHeader';
import type { Cart } from '@/types/Cart';
import CartList from './CartList';
import ActionButton from './ActionButton';
import { Button } from '../ui/button';

type FailureDetailsProps = {
  cart: Cart;
};

const FailureDetails = ({ cart }: FailureDetailsProps) => {
  return (
    <Card className="mb-6 overflow-hidden shadow-xl border-0 bg-gradient-to-r from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-sm">
      <CardContent className="p-8">
        {/* Order Header */}
        <FailedPaymentHeader cartId={cart._id!} />

        {/* Failure Reason */}
        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg mb-6 border border-red-200/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-900 dark:text-red-100">
              What happened?
            </span>
          </div>
          <p className="text-red-800 dark:text-red-200">Something went wrong</p>
          <p className="text-sm text-red-600 dark:text-red-300 mt-1">
            This is usually a temporary issue that can be resolved by trying
            again.
          </p>
        </div>

        {/* Order Items */}
        <CartList cart={cart} />

        {/* Order Total */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-lg text-center mb-6">
          <div className="text-white">
            <p className="text-sm opacity-90 mb-1">Total Amount</p>
            <p className="text-3xl font-bold">${cart.totalPrice?.toFixed(2)}</p>
            <p className="text-sm opacity-75 mt-1">Still pending payment</p>
          </div>
        </div>

        {/* Action Buttons */}
        <ActionButton />

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
  );
};

export default FailureDetails;
