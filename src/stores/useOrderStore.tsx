import type { OrdersType } from '@/types/Orders';
import { create } from 'zustand';

interface Order {
  orders: OrdersType[];
  setOrders: (orders: OrdersType[]) => void;
}

export const useOrdersStore = create<Order>((set) => ({
  orders: [],
  setOrders: (orders) =>
    set({
      orders,
    }),
}));
