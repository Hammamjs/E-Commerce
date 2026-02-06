import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { productSchema, type ProductFormData } from '@/schema/ProductSchema';
import { useCallback, useEffect, useReducer, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '@/stores/useUserStore';
import { useCategoriesStore } from '@/stores/useCategoriesStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddProduct } from '@/api/ProductsApi';
import type { AddProductType } from '@/types/product';
import { useShallow } from 'zustand/shallow';
import {
  AddProductInitialState,
  AddProductReducer,
} from '@/reducer/add-product.reducer';
import handleError from '@/utils/ErrorHandler';

const useAddProduct = () => {
  const [state, dispatch] = useReducer(
    AddProductReducer,
    AddProductInitialState,
  );
  const { toast } = useToast();
  const navigate = useNavigate();

  const user = useUserStore(useShallow((state) => state.user));
  const categories = useCategoriesStore(
    useShallow((state) => state.categories),
  );

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      category: '',
      brand: '',
      description: '',
      inStock: 0,
      images: [],
      features: [],
      discountPrice: 0,
    },
  });
  useEffect(() => {
    const cleanedImages = state.images.map((img) => img.trim()).filter(Boolean);

    const cleanedFeatures = state.features.map((f) => f.trim()).filter(Boolean);

    form.setValue('images', cleanedImages, { shouldValidate: true });
    form.setValue('features', cleanedFeatures, { shouldValidate: true });
  }, [state.images, state.features]);

  const queryClient = useQueryClient();
  const { mutate: AddProductMutation } = useMutation({
    mutationFn: AddProduct,
    onSuccess(data) {
      toast({
        title: 'Product Added Successfully!',
        description: `${data.name} has been added to your catalog.`,
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },

    onError: (err) => handleError(err),
  });

  const handleColorOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_COLOR', payload: e.target.value });
  };

  const onSubmit = async (data: ProductFormData) => {
    if (!user?._id) return;

    const productData = {
      ...data,
      user: user._id,
      features: data.features,
      images: data.images,
      image: data.images[0] ?? null, // slice first image from images as cover
      ratings: {
        average: 0,
        count: 0,
      },
      attributes: {
        colors: state.colors,
        size: state.size,
      },
    };

    try {
      AddProductMutation(productData as unknown as AddProductType);
      navigate('/products');
      console.log('done');
    } catch (err) {
      console.log('Error ', err);
    }
  };

  return {
    state,
    dispatch,
    form,
    navigate,
    categories,
    handleColorOnChange,
    AddProductMutation,
    onSubmit,
  };
};

export default useAddProduct;
