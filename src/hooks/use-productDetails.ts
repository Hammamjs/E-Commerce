import { useState } from 'react';
import { useFavoriteStore } from '@/stores/favorites/useFavoritesStore';
import { useShallow } from 'zustand/shallow';
import { useProductsStore } from '@/stores/product/useProductsStore';
import useCart from '@/hooks/use-cart';
import type { Product, Review } from '@/types/product';
import { useUserStore } from '@/stores/user/useUserStore';
import { toast } from './use-toast';
import { useReviewStore } from '@/stores/reviews/useReviewsStore';

const useProductDetails = (id: string) => {
  const product = useProductsStore(
    useShallow((state) => state.getProduct(id)),
  ) as Product;

  const productIds = useProductsStore(useShallow((state) => state.productIds));

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { toggleFavorite, isFavorite } = useFavoriteStore(
    useShallow((state) => ({
      toggleFavorite: state.toggleFavorite,
      isFavorite: state.isFavorite,
    })),
  );

  const { handleAddOrUpdateCart } = useCart(id);

  const { addReview } = useReviewStore(
    useShallow((state) => ({
      addReview: state.addReview,
    })),
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
    productIds,
    selectedImage,
    setSelectedImage,
    quantity,
    setQuantity,
    toggleFavorite: handleToggleFavorite,
    isFavorite,
    handleAddOrUpdateCart,
    handleAddReview,
    user,
    product,
  };
};

export default useProductDetails;
