import type { OrdersType } from '@/types/Orders';
import PaymentOrderItem from './PaymentOrderItem';
import { Gift } from 'lucide-react';

type PaymentOrderListProps = {
  order: OrdersType;
};

const PaymentOrderList = ({ order }: PaymentOrderListProps) => {
  return (
    <div className="space-y-4 mb-6">
      <h4 className="font-semibold text-foreground flex items-center gap-2">
        <Gift className="w-5 h-5 text-primary" />
        Items Purchased
      </h4>
      {order?.items?.map((item) => (
        <PaymentOrderItem
          item={item}
          key={item._id}
          OrderQty={order.quantity ?? 0}
          orderTotalPrice={order.totalPrice}
        />
      ))}
    </div>
  );
};

export default PaymentOrderList;
