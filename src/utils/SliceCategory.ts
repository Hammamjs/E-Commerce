import type { Product } from '@/types/product';

export const sliceCategory = (
  Products: Product[],
  categoryName: string
): number => {
  return Products.filter(
    (prod) => prod.category.name.toLowerCase() === categoryName.toLowerCase()
  ).length;
};
