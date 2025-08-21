import type {
  AddProductType,
  ExcludeProductId,
  Product,
} from '@/types/product';
import { apiEndPoint, createInstance } from './BaseUrl';
export type ProductPage = {
  result: { documents: Product[] };
  hasMore: boolean;
};

export const getAllProducts = async () => {
  const response = await createInstance.get(apiEndPoint + '/products?limit=50');

  return response.data;
};

export const AddProduct = async (product: AddProductType) => {
  const response = await createInstance.post(
    apiEndPoint + '/products',
    product
  );

  return response.data;
};

export const updateProduct = async ({
  product,
  productId,
}: {
  productId: string;
  product: Partial<ExcludeProductId>;
}) => {
  const response = await createInstance.put(
    apiEndPoint + `/products/${productId}`,
    product
  );

  return response.data;
};

export const deleteProduct = async ({ productId }: { productId: string }) => {
  const response = await createInstance.delete(
    apiEndPoint + `/products/${productId}`
  );

  return response.data;
};
