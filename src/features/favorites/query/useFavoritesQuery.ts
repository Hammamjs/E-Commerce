import { useQuery } from '@tanstack/react-query';
import { getUserFavoritesApi } from '../api/FavoritesApi';

export const useGetFavoritesQuery = () =>
  useQuery({
    queryKey: ['favorites'],
    queryFn: getUserFavoritesApi,
    staleTime: 10000 * 60 * 10,
  });
