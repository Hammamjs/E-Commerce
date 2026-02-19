import type { OrderStatus } from '@/types/Orders';

export const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-500 text-white';
    case 'pending':
      return 'bg-yellow-500 text-white';
    case 'shipped':
      return 'bg-blue-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};
