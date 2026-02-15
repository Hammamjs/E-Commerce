import type { OrdersType } from '@/types/Orders';
import UserOrderItem from './UserOrderItem';

type UserOrderListProps = {
  orders: OrdersType[];
};

const UserOrderList = ({ orders }: UserOrderListProps) => {
  return orders?.map((order) => (
    <UserOrderItem
      orderCreatedAt={order.createdAt}
      orderId={order._id}
      orderQty={order.quantity ?? 0}
      orderStatus={order.status}
      totalPrice={order.totalPrice}
      key={order._id}
    />
  ));
};

export default UserOrderList;
