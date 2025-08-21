import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFavoriteStore } from '@/stores/useFavoritesStore';
import { useShallow } from 'zustand/shallow';
import { useProductsStore } from '@/stores/useProductsStore';
import useCart from '@/hooks/use-cart';
import type { Product, Review } from '@/types/product';
import { useUserStore } from '@/stores/useUserStore';
import { useReviewStore } from '@/stores/useReviewsStore';
import { toast } from './use-toast';

const useProductDetails = () => {
  const { id } = useParams();

  const product = useProductsStore(
    useShallow((state) => state.getProduct(id!))
  ) as Product;

  const products = useProductsStore(useShallow((state) => state.products));

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { toggleFavorite, isFavorite } = useFavoriteStore(
    useShallow((state) => ({
      toggleFavorite: state.toggleFavorite,
      isFavorite: state.isFavorite,
    }))
  );

  const { handleAddOrUpdateCart } = useCart();

  const { addReview } = useReviewStore(
    useShallow((state) => ({
      addReview: state.addReview,
    }))
  );

  // reviewer section
  const user = useUserStore(useShallow((state) => state.user));

  const handleAddReview = (rating: number, comment: string) => {
    if (!user?._id) {
      toast({ title: 'Please log in to add a review.' });
      return;
    }

    const newReview: Review = {
      _id: Date.now().toString(),
      user: { ...user! },
      rating,
      comment,
      createdAt: new Date().toISOString(),
      product: product._id,
    };

    addReview(newReview);
  };

  const handleToggleFavorite = (product: Product) => {
    if (!user?._id) {
      toast({ title: 'Please log in to add a favorite.' });
      return;
    }

    toggleFavorite(product);
  };

  return {
    products,
    selectedImage,
    setSelectedImage,
    quantity,
    setQuantity,
    toggleFavorite: handleToggleFavorite,
    isFavorite,
    handleAddOrUpdateCart,
    handleAddReview,

    product,
  };
};

export default useProductDetails;
