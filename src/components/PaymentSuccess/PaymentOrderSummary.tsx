import { Badge, Package } from 'lucide-react';
import OrderTotalPrice from './OrderTotalPrice';
import PaymentActionButton from './PaymentActionButton';
import PaymentOrderList from './PaymentOrderList';
import { Card, CardContent } from '../ui/card';
import type { OrdersType } from '@/types/Orders';

type PaymentOrderSummaryProps = {
  order: OrdersType;
};

const PaymentOrderSummary = ({ order }: PaymentOrderSummaryProps) => {
  return (
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
        <PaymentOrderList order={order} />

        {/* Order Total */}
        <OrderTotalPrice orderTotalPrice={order?.totalPrice ?? 0} />

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
        <PaymentActionButton />
      </CardContent>
    </Card>
  );
};

export default PaymentOrderSummary;
