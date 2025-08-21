import { createInstance, apiEndPoint } from './BaseUrl';

export const addToFavoritesApi = async (product: string) => {
  const response = await createInstance.post(apiEndPoint + '/favorites', {
    product,
  });

  return response.data;
};

export const getUserFavoritesApi = async () => {
  const response = await createInstance.get(apiEndPoint + '/favorites/user');

  return response.data;
};

export const removeFromFav = async (productId: string) => {
  const response = await createInstance.patch(apiEndPoint + '/favorites', {
    productId,
  });

  return response.data;
};
