import type { UserInfo } from './User';

export interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  images?: string[];
  category: {
    _id: string;
    name: string;
  };
  brand: string;
  ratings: {
    average: number;
    count: number;
  };
  description: string;
  sales?: number;
  features: string[];
  inStock: number;
  tag?: string;
  attributes?: {
    colors: string[];
    size?: string[];
  };
}

export interface Review {
  _id: string;
  user: Pick<UserInfo, '_id' | 'username' | 'profileImg'>;
  rating: number;
  product: string;
  comment: string;
  createdAt: string;
}

export interface ProductReviewsProps {
  productId: string;
}

export type ExcludeProductId = Omit<Product, '_id'>;

export interface AddProductType extends ExcludeProductId {
  user: string;
}

export interface CartItem extends Product {
  quantity: number;
  product: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}
