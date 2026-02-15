import type { OrderItemType } from '@/types/Orders';

type OrderItemProps = {
  item: OrderItemType;
  orderQty: number | undefined;
};

const OrderItem = ({ item, orderQty }: OrderItemProps) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex-1">
        <span className="font-medium text-foreground">{item.product.name}</span>
        <span className="text-muted-foreground ml-2">× {orderQty}</span>
      </div>
      <span className="font-semibold text-foreground">${(3.0).toFixed(2)}</span>
    </div>
  );
};

export default OrderItem;
