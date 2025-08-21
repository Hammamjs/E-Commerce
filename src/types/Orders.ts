import type { UserInfo } from './User';

export type OrdersType = {
  _id: string;
  user: Pick<UserInfo, '_id' | 'email' | 'username'>;
  totalPrice: number;
  shippingAddress: string;
  quantity?: number;
  items: [
    {
      product: {
        _id: string;
        name: string;
        price: number;
        user: string;
        category: {
          _id: string;
          name: string;
        };
      };
      _id: string;
    }
  ];
  status: 'shipped' | 'pending' | 'delivered';
  PaidAt: Date;
  isPaid: boolean;
  PaymentMethodType: string;
  createdAt: Date;
  updatedAt: Date;
  paymentIntentId: string;
};

export type OrderStatus = 'pending' | 'shipped' | 'delivered';
