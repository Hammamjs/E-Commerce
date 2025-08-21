import type { Product } from './product';

export type CartEntry = {
  name?: 'Mechanical Gaming Keyboard';
  price?: number;
  product: Product;
  quantity?: number;
  total?: number;
  _id?: string;
};

export interface Cart {
  createdAt?: Date;
  items: CartEntry[];
  totalItems?: number;
  totalPrice?: number;
  updatedAt?: Date;
  user?: string;
  _id?: string;
}
