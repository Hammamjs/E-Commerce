import { useCallback } from 'react';
import { toast } from './use-toast';
import type { Product } from '@/types/product';
import { useUserStore } from '@/stores/useUserStore';
import { useShallow } from 'zustand/shallow';

interface UseProductCarousel {
  product: Product;
  handleUpdateFav: (product: Product) => void;
  isFavorite: (favId: string) => boolean;
  handleAddOrUpdateCart: (product: Product, qty: number) => void;
}

interface ProductCarouselHandler {
  handleAddToCart: () => void;
  handleFavoriteClick: () => void;
  tagClass: (tag: string) => string;
}

const useProductCarousel = ({
  handleAddOrUpdateCart,
  handleUpdateFav,
  isFavorite,
  product,
}: UseProductCarousel): ProductCarouselHandler => {
  const user = useUserStore(useShallow((state) => state.user));

  const handleFavoriteClick = useCallback(() => {
    if (!user?._id) {
      toast({ title: 'Please log in to add items to your cart.' });
      return;
    }

    handleUpdateFav(product);
    toast({
      title: isFavorite(product._id) ? 'Item removed' : 'Item Added',
      description: product.name,
    });
  }, [user?._id, handleUpdateFav, product, isFavorite]);

  const handleAddToCart = useCallback(() => {
    handleAddOrUpdateCart(product, 1);
  }, [product, handleAddOrUpdateCart]);

  const tagClass = useCallback((tag: string): string => {
    switch (tag) {
      case 'Best Seller':
        return 'bg-primary text-primary-foreground';
      case 'New':
        return 'bg-accent text-accent-foreground';
      case 'Limited':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  }, []);

  return { handleAddToCart, handleFavoriteClick, tagClass };
};

export default useProductCarousel;
