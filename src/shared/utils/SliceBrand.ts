import type { Product } from '@/types/product';

export const sliceBrand = (Products: Product[]) => [
  ...new Set(Products.map((product) => product.brand)),
];
