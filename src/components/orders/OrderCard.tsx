import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge, Calendar, Package } from 'lucide-react';
import type { OrderStatus, OrdersType } from '@/types/Orders';
import { Separator } from '@radix-ui/react-select';
import OrderItemList from './OrderItemList';
import OrderAction from './OrderAction';

type OrderCardProps = {
  order: OrdersType;
  getStatusColor: (orderStatus: OrderStatus) => string;
};

const OrderCard = ({ order, getStatusColor }: OrderCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-muted/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{order._id}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
            <div className="text-right">
              <div className="font-semibold text-foreground">
                ${order.totalPrice.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                {order.items.length} item
                {order.items.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Order Items */}
        <div className="space-y-3 mb-4">
          <OrderItemList order={order} />
        </div>

        <Separator className="my-4" />

        {/* Order Actions */}
        <div className="flex flex-wrap gap-3">
          <OrderAction orderStatus={order.status} />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
