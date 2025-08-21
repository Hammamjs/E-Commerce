import { changeOrderStatus, getOrders } from '@/api/Orders';
import type { OrderStatus, OrdersType } from '@/types/Orders';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useToast } from './use-toast';

const useAdminOrders = () => {
  const { toast } = useToast();

  const { data: ordersData } = useSuspenseQuery<
    { data: OrdersType[] },
    Error,
    OrdersType[]
  >({
    queryKey: ['getOrders'],
    queryFn: getOrders,
    select: (res) => res.data,
  });

  const [orders, setOrders] = useState<OrdersType[]>(ordersData || []);

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getStatusDot = (status: OrderStatus): string => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleStatusChange = useCallback(
    async (orderId: string, newStatus: OrderStatus) => {
      try {
        const response = await changeOrderStatus(newStatus, orderId);

        console.log(response);

        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );

        toast({
          title: 'Order Status Updated',
          description: `Order ${orderId} status changed to ${newStatus}`,
        });
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  const getOrderStats = () => {
    const pending = orders.filter((o) => o.status === 'pending').length;
    const shipped = orders.filter((o) => o.status === 'shipped').length;
    const delivered = orders.filter((o) => o.status === 'delivered').length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    return { pending, shipped, delivered, totalRevenue };
  };

  const stats = getOrderStats();

  return {
    orders,
    getStatusColor,
    getStatusDot,
    stats,
    handleStatusChange,
  };
};

export default useAdminOrders;
