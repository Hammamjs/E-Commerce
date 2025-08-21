import { useQuery } from '@tanstack/react-query';
import { getUserCart } from '@/api/CartApi';
import { useCartStore } from '@/stores/useCartStore';
import { getAllProducts } from '@/api/ProductsApi';
import { useProductsStore } from '@/stores/useProductsStore';
import type { Product } from '@/types/product';
import { useUserStore } from '@/stores/useUserStore';
import { getUserFavoritesApi } from '@/api/FavoritesApi';
import { useFavoriteStore } from '@/stores/useFavoritesStore';
import { getAllCategories } from '@/api/CategoriesApi';
import { useCategoriesStore } from '@/stores/useCategoriesStore';
import { useCallback, useEffect } from 'react';

const AppInitializer = () => {
  const setProducts = useProductsStore(
    useCallback((state) => state.setProducts, [])
  );

  const setCart = useCartStore(useCallback((state) => state.setCart, []));
  const setFavorites = useFavoriteStore(
    useCallback((state) => state.setFavorites, [])
  );
  const setCategories = useCategoriesStore(
    useCallback((state) => state.setCategories, [])
  );

  const user = useUserStore((state) => state.user);

  const { isSuccess, data } = useQuery({
    queryKey: ['initData'],
    queryFn: async () => {
      const [products, categories, cart, favorites] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
        user?.username
          ? getUserCart()
          : Promise.resolve({ data: { items: [] } }),
        user?.username
          ? getUserFavoritesApi()
          : Promise.resolve({ data: { items: [] } }),
      ]);
      return { products, categories, cart, favorites };
    },

    select: (response) => {
      const favs = response?.favorites.data.items.map(
        (item: { product: Product[] }) => item.product
      );
      return {
        products: response.products,
        categories: response.categories,
        cart: response.cart.data,
        favorites: favs,
      };
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setProducts(data.products.data);
      setCategories(data.categories.data);
      setCart(data?.cart);
      setFavorites(data.favorites);
    }
  }, [isSuccess, data, setProducts, setCategories, setCart, setFavorites]);

  // get all products
  // const { data: products } = useSuspenseQuery<ProductRes>({
  //   queryKey: ['products'],
  //   queryFn: getAllProducts,
  //   select: (response) => {
  //     setProducts(response.data);
  //     return response;
  //   },
  // });

  // // Get all categories
  // const { data: categories } = useSuspenseQuery({
  //   queryKey: ['categories'],
  //   queryFn: getAllCategories,
  //   select: (response) => setCategories(response?.data),
  // });

  // // get user cart if user exist
  // const { data: cart } = useQuery({
  //   queryKey: ['cart'],
  //   queryFn: getUserCart,
  //   enabled: !!user,
  //   select: (response) => setCart(response?.data),
  // });

  // // Skip fetching data when user not logged in
  // const { data } = useQuery({
  //   queryKey: ['fav'],
  //   queryFn: getUserFavoritesApi,
  //   enabled: !!user,
  //   placeholderData: [],
  //   select: (favs) =>
  //     setFavorites(
  //       favs.data.items.map(
  //         (items: { product: Product }) => items.product
  //       ) as Product[]
  //     ),
  // });

  /*
   ** why am i using Promise.all rather than multiple useQuery calls?
   ** Using Promise.all allows us to fetch all the necessary data in parallel,
   ** reducing the overall loading time and improving the user experience.
   ** reducing the number of re-renders and improving performance.
   ** distributing the data fetching workload more evenly.
   ** Cache key management is simplified, as all related data can be cached under a single key.
   */

  return null;
};

export default AppInitializer;
