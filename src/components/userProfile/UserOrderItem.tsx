import type { OrderStatus } from '@/types/Orders';
import { Badge } from 'lucide-react';
import { Button } from '../ui/button';
import { getStatusColor } from '@/utils/getStatusColor';

type UserOrderItemProps = {
  orderId: string;
  orderStatus: OrderStatus;
  orderQty: number;
  totalPrice: number;
  orderCreatedAt: Date;
};

const UserOrderItem = ({
  orderId,
  orderQty,
  orderStatus,
  totalPrice,
  orderCreatedAt,
}: UserOrderItemProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{orderId}</span>
          <Badge className={getStatusColor(orderStatus)}>{orderStatus}</Badge>
        </div>
        <p className="text-sm text-foreground/60">
          {new Date(orderCreatedAt).toLocaleDateString()} • {orderQty} items
        </p>
      </div>
      <div className="flex items-center justify-between md:justify-end space-x-4 mt-2 md:mt-0">
        <span className="text-lg font-bold text-primary">${totalPrice}</span>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default UserOrderItem;
