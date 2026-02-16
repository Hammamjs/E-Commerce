import type { CartEntry } from '@/features/cart/types/Cart';
import { createInstance, apiEndPoint } from '../../../api/BaseUrl';
import type { Product } from '@/types/product';

export const addToCartApi = async ({
  cart,
}: {
  cart: CartEntry;
}): Promise<{ cart: CartEntry }> => {
  const response = await createInstance.post(apiEndPoint + '/cart', {
    items: { ...cart },
  });

  return response.data;
};

export const getUserCart = async () => {
  // Cart id
  const response = await createInstance.get<{ data: { items: CartEntry[] } }>(
    apiEndPoint + '/cart/user',
    {
      withCredentials: true,
    },
  );

  return {
    cart: {
      items: response.data.data.items,
    },
  };
};

export const updateCart = async ({
  items,
  quantity,
}: {
  items: Product;
  quantity: number;
}) => {
  const response = await createInstance.put(
    apiEndPoint + `/cart/${items._id}`,
    { items: { ...items, quantity } },
  );

  return response.data;
};

export const deleteProductFromCart = async (productId: string) => {
  const response = await createInstance.patch(
    apiEndPoint + `/cart/${productId}`,
  );

  return {
    cart: response.data,
  };
};

export const deleteCart = async (id: string) => {
  const response = await createInstance.delete(apiEndPoint + `/cart/${id}`);

  return response.data;
};

export type UserCartResult = Awaited<ReturnType<typeof getUserCart>>;
