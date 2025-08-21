import type { OrderStatus } from '@/types/Orders';
import { createInstance, apiEndPoint } from './BaseUrl';

export const getOrders = async () => {
  const response = await createInstance.get(apiEndPoint + '/orders?limit=50');

  return response.data;
};

export const changeOrderStatus = async (
  status: OrderStatus,
  orderId: string
) => {
  const response = await createInstance.patch(
    apiEndPoint + `/orders/${status}`,
    { orderId }
  );

  return response.data;
};
