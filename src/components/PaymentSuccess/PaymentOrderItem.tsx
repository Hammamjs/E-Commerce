import type { OrderItemType } from '@/types/Orders';

type PaymnetItemProps = {
  OrderQty: number;
  orderTotalPrice: number;
  item: OrderItemType;
};

const PaymentOrderItem = ({
  orderTotalPrice,
  OrderQty,
  item,
}: PaymnetItemProps) => {
  return (
    <div className="flex justify-between items-center py-3 px-4 bg-muted/30 rounded-lg">
      <div className="flex-1">
        <span className="font-medium text-foreground">{item.product.name}</span>
        <span className="text-muted-foreground ml-2">× {OrderQty}</span>
      </div>
      <span className="font-semibold text-foreground">
        ${(orderTotalPrice || 0).toFixed(2)}
      </span>
    </div>
  );
};

export default PaymentOrderItem;
