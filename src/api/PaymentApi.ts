import { apiEndPoint, createInstance } from './BaseUrl';

export const createOrder = async (cartId: string) => {
  const response = await createInstance.post(
    apiEndPoint + '/orders/checkout-session',
    {
      cartId,
    }
  );

  return response;
};
