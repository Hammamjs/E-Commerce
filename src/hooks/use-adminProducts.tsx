import handleError from '@/utils/ErrorHandler';
import { toast } from './use-toast';
import { useMemo, useState } from 'react';
import { useProductsStore } from '@/stores/useProductsStore';
import { useMutation } from '@tanstack/react-query';
import { deleteProduct } from '@/api/ProductsApi';
import { useQueryClient } from '@tanstack/react-query';

const useAdminProducts = () => {
  const [searchKey, setSearchKey] = useState('');

  const products = useProductsStore((state) => state.products);

  const filteredProducts = useMemo(() => {
    if (!searchKey) return products;
    return products.filter((product) =>
      product.name
        .toLowerCase()
        .split(' ')
        .some((prod) => prod.includes(searchKey.toLowerCase()))
    );
  }, [searchKey]);

  const queryClient = useQueryClient();

  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: deleteProduct,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });

      console.log('Deleted ', data);
      toast({
        title: 'Product deleted',
        description: 'The product has been successfully deleted.',
      });
    },
    onError: (err) => handleError(err, 'product'),
  });

  return {
    setSearchKey,
    filteredProducts,
    deleteProductMutation,
    products,
  };
};

export default useAdminProducts;
