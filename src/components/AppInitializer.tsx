import { useQuery } from '@tanstack/react-query';
import { getUserCart, type UserCartResult } from '@/api/CartApi';
import { useCartStore } from '@/stores/cart/useCartStore';
import { getAllProducts } from '@/api/ProductsApi';
import { useProductsStore } from '@/stores/product/useProductsStore';
import type { Product } from '@/types/product';
import { useUserStore } from '@/stores/user/useUserStore';
import { getUserFavoritesApi } from '@/api/FavoritesApi';
import { useFavoriteStore } from '@/stores/favorites/useFavoritesStore';
import { getAllCategories } from '@/api/CategoriesApi';
import { useCategoriesStore } from '@/stores/useCategoriesStore';
import { useCallback, useEffect } from 'react';
import type { Categories } from '@/types/Categories';

type initData = {
  products: Product[];
  cart: UserCartResult['data'];
  favorites: Product[];
  categories: Categories[];
};

const emptyCart: UserCartResult = {
  data: { items: [] },
};

const AppInitializer = () => {
  const user = useUserStore(useCallback((state) => state.user, []));

  const setProducts = useProductsStore(
    useCallback((state) => state.setProducts, []),
  );

  const setCart = useCartStore(useCallback((state) => state.setCart, []));
  const setFavorites = useFavoriteStore(
    useCallback((state) => state.setFavorites, []),
  );
  const setCategories = useCategoriesStore(
    useCallback((state) => state.setCategories, []),
  );

  const { data, isSuccess } = useQuery<initData>({
    queryKey: ['initData'],
    queryFn: async () => {
      const [productsRes, categoriesRes, cartRes, favoritesRes] =
        await Promise.all([
          getAllProducts(),
          getAllCategories(),

          user?.username ? getUserCart() : Promise.resolve(emptyCart),

          user?.username
            ? getUserFavoritesApi()
            : Promise.resolve({ data: { items: [] } }),
        ]);

      const favorites = favoritesRes.data.items.map(
        (item: { product: Product }) => item.product,
      );

      return {
        products: productsRes.data,
        categories: categoriesRes.data,
        cart: cartRes.data,
        favorites,
      };
    },
    enabled: !!user,
    staleTime: 10000 * 60,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setProducts(data.products);
      setCategories(data.categories);
      setCart(data.cart);
      setFavorites(data.favorites);
    }
  }, [isSuccess, data, setProducts, setCategories, setCart, setFavorites]);

  /*
   ** why am using Promise.all rather than multiple useQuery calls?
   ** Using Promise.all allows us to fetch all the necessary data in parallel,
   ** reducing the overall loading time and improving the user experience.
   ** reducing the number of re-renders and improving performance.
   ** distributing the data fetching workload more evenly.
   ** Cache key management is simplified, as all related data can be cached under a single key.
   */

  return null;
};

export default AppInitializer;
