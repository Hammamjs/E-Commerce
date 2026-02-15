import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from './use-toast';
import { productSchema, type ProductFormData } from '@/schema/ProductSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductsStore } from '@/stores/product/useProductsStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '@/api/ProductsApi';
import type { ExcludeProductId } from '@/types/product';
import handleError from '@/utils/ErrorHandler';
import { useUiStore } from '@/stores/useUiStore';

const useEditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [productFound, setProductFound] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const formState = useUiStore((state) => state.addProduct.form);
  const addToArray = useUiStore((state) => state.addProduct.addToArray);
  const removeFromArray = useUiStore(
    (state) => state.addProduct.removeFromArray,
  );

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      discountPrice: 0,
      category: '',
      brand: '',
      description: '',
      inStock: 3,
    },
  });

  const queryClient = useQueryClient();
  const { mutate: updateProductMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateProduct,
    onSuccess(data) {
      toast({
        title: 'Product Updated Successfully!',
        description: `${data.name} has been updated in your catalog.`,
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/products');
    },

    onError: (err) => handleError(err, 'product'),
  });

  useEffect(() => {
    const loadProduct = () => {
      setLoading(true);

      if (!id) return;

      // Simulate API call delay
      setTimeout(() => {
        const product = useProductsStore.getState().getProduct(id);

        if (product) {
          setProductFound(true);
          form.reset({
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice || 0,
            category: product.category._id,
            brand: product.brand,
            description: product.description,
            inStock: product.inStock,
          });

          addToArray('features', [...product.features]);
          addToArray('images', [...(product.images ?? product.image)]);
        } else {
          setProductFound(false);
          toast({
            title: 'Product Not Found',
            description: "The product you're trying to edit doesn't exist.",
          });
        }
        setLoading(false);
      }, 800);
    };

    if (id) {
      loadProduct();
    }
  }, [id, form, toast]);

  const onSubmit = useCallback((data: ProductFormData) => {
    if (!id) return;

    console.log(data);
    if (!formState.images.length) {
      toast({ title: 'Images are required' });
      return;
    }
    const productData = {
      ...data,
      image: formState.images[0],
      features: formState.features.filter((f) => f.trim() !== ''),
      images: formState.images.filter((img) => img.trim() !== ''),
    };

    updateProductMutation({
      productId: id,
      product: productData as unknown as ExcludeProductId,
    });
  }, []);

  return {
    form,
    addToArray,
    removeFromArray,
    loading,
    productFound,
    onSubmit,
    navigate,
    isUpdating,
  };
};

export default useEditProduct;
