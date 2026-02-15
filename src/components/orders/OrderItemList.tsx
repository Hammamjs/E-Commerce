import type { OrdersType } from '@/types/Orders';
import OrderItem from './OrderItem';

type OrderItemListProps = {
  order: OrdersType;
};

const OrderItemList = ({ order }: OrderItemListProps) => {
  return order.items.map((item) => (
    <OrderItem orderQty={order.quantity} item={item} key={order._id} />
  ));
};

export default OrderItemList;
