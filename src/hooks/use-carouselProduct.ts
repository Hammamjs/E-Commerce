import { useCallback } from 'react';
import { toast } from './use-toast';
import type { Product } from '@/types/product';
import { useUserStore } from '@/stores/user/useUserStore';
import { useShallow } from 'zustand/shallow';

interface UseProductCarousel {
  product: Product;
  handleUpdateFav: (product: Product) => void;
  isFav: boolean;
}

interface ProductCarouselHandler {
  handleFavoriteClick: () => void;
  tagClass: (tag: string) => string;
}

const useProductCarousel = ({
  handleUpdateFav,
  isFav,
  product,
}: UseProductCarousel): ProductCarouselHandler => {
  const user = useUserStore(useShallow((state) => state.user));

  const handleFavoriteClick = useCallback(() => {
    if (!user?._id) {
      toast({ title: 'Please log in to add items to your cart.' });
      return;
    }

    handleUpdateFav(product);
  }, [user?._id, handleUpdateFav, product, isFav]);

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

  return { handleFavoriteClick, tagClass };
};

export default useProductCarousel;
