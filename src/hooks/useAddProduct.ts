import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { productSchema, type ProductFormData } from '@/schema/ProductSchema';
import { useEffect, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '@/stores/useUserStore';
import { useCategoriesStore } from '@/stores/useCategoriesStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddProduct } from '@/api/ProductsApi';
import type { AddProductType } from '@/types/product';
import { useShallow } from 'zustand/shallow';
import handleError from '@/utils/ErrorHandler';
import {
  useAddProductState,
  type TrackInput,
} from '@/stores/addProduct/useAddProductState';

const useAddProduct = () => {
  const formState = useAddProductState((state) => state.form);
  const addToArray = useAddProductState((state) => state.addToArray);
  const updateInArray = useAddProductState((state) => state.updateInArray);
  const removeFromArray = useAddProductState((state) => state.removeFromArray);
  const setInput = useAddProductState((state) => state.setUserInput);

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
    const cleanedImages = formState.images
      .map((img) => img.trim())
      .filter(Boolean);

    const cleanedFeatures = formState.features
      .map((f) => f.trim())
      .filter(Boolean);

    form.setValue('images', cleanedImages, { shouldValidate: true });
    form.setValue('features', cleanedFeatures, { shouldValidate: true });
  }, [formState.images, formState.features]);

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

  const handleInputOnChange = (
    input: TrackInput,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setInput(input, e.target.value);
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
        colors: formState.colors,
        size: formState.size,
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
    formState,
    addToArray,
    updateInArray,
    removeFromArray,
    form,
    navigate,
    categories,
    handleInputOnChange,
    AddProductMutation,
    onSubmit,
  };
};

export default useAddProduct;
