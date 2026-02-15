import OrderCard from './OrderCard';
import type { OrderStatus, OrdersType } from '@/types/Orders';

type OrderListProps = {
  orders: OrdersType[];
  getStatusColor: (orderStatus: OrderStatus) => string;
};

const OrderList = ({ orders, getStatusColor }: OrderListProps) => {
  return orders?.map((order) => (
    <OrderCard order={order} getStatusColor={getStatusColor} />
  ));
};

export default OrderList;
