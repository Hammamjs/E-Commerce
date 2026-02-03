import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { productSchema, type ProductFormData } from '@/schema/ProductSchema';
import {
  useCallback,
  useEffect,
  useReducer,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
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

const useAddProduct = () => {
  // const [features, setFeatures] = useState<string[]>(['']);
  // const [images, setImages] = useState<string[]>(['']);
  // const [colors, setColors] = useState<string[]>(['']);
  // const [size, setSize] = useState<string[]>(['']);
  // const [typedSize, setTypedSize] = useState<string>();
  // const [selectedColor, setSelectedColor] = useState<string>('#000');
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
    },
  });

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

    onError: (err) => {
      console.log(err);
    },
  });

  // const addFeature = () => setFeatures((prev) => [...prev, '']);

  // const removeFeature = useCallback(
  //   (index: number) => setFeatures(features.filter((_, i) => i !== index)),
  //   [],
  // );
  // const updateFeature = useCallback((index: number, value: string) => {
  //   const newFeatures = [...features];
  //   newFeatures[index] = value;
  //   setFeatures(newFeatures);
  // }, []);

  // const addImage = () => setImages([...images, '']);
  // const removeImage = (index: number) =>
  //   setImages(images.filter((_, i) => i !== index));
  // const updateImage = (index: number, value: string) => {
  //   const newImages = [...images];
  //   newImages[index] = value;
  //   setImages(newImages);
  // };

  const handleColorOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_COLOR', payload: e.target.value });
  };

  // const addColor = () => {
  //   if (colors && !colors.includes(selectedColor)) {
  //     setColors((prev) => [
  //       ...prev.filter((val) => val != ''),
  //       selectedColor.trim(),
  //     ]);
  //   }
  // };

  // const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //    dispatch({type: 'ADD_COLOR', payload: e.})
  //   }
  // };

  // const removeColor = (index: number) => {
  //   setColors(colors.filter((_, i) => i !== index));
  // };

  // useEffect(() => {
  //   if (!typedSize && !typedSize?.includes(',')) return;

  //   const newSizes = typedSize
  //     .split(',')
  //     .map((s) => s.trim().toLowerCase())
  //     .filter((s) => !size.includes(s) && ['s', 'm', 'l', 'xl'].includes(s));

  //   if (newSizes.length) {
  //     setSize((prev) => [...prev.filter((s) => s !== ''), ...newSizes]);
  //     console.log('Sizes added:', newSizes);
  //     setTypedSize('');
  //   }
  // }, [typedSize]);

  // const removeSize = (size: string) =>
  //   setSize((prev) => prev.filter((s) => s !== size));

  const onSubmit = useCallback(async (data: ProductFormData) => {
    const productData = {
      ...data,
      user: user!._id,
      features: state.features,
      images: state.images,
      image: state.images[0], // slice first image from images as cover
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
      console.log('Product data:', productData);
      navigate('/products');
    } catch (err) {
      console.log('Error ', err);
    }
  }, []);

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
