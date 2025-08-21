import { apiEndPoint, createInstance } from './BaseUrl';

export const getAllCategories = async () => {
  const response = await createInstance.get(apiEndPoint + '/categories');

  return response.data;
};
