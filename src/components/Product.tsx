import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product as ProductType } from '@/types/product';
import useCart from '@/hooks/use-cart';
import useFavorites from '@/hooks/use-favorites';
import { memo } from 'react';
import { useFavoriteStore } from '@/stores/useFavoritesStore';
import CustomImage from './shared/customImg';
import { useShallow } from 'zustand/shallow';

interface ProductProps {
  product: ProductType;
}

export const Product = memo(({ product }: ProductProps) => {
  const { handleAddOrUpdateCart } = useCart(product._id);
  const { handleUpdateFav } = useFavorites(product);

  const isFavorite = useFavoriteStore(useShallow((state) => state.isFavorite));

  return (
    <Card className="group bg-card/50 backdrop-blur-sm border-border/20 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-in">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Link to={`/product-details/${product._id}`}>
            <CustomImage
              img={product.image}
              productName={product.name}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </Link>
          <div className="absolute top-4 left-4 capitalize">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
              {product.tag}
            </span>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 rounded-full backdrop-blur-sm transition-colors duration-200 ${
                isFavorite(product._id)
                  ? 'bg-destructive/20 text-destructive hover:bg-destructive/30'
                  : 'bg-background/20 text-foreground hover:bg-background/30'
              }`}
              onClick={handleUpdateFav}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite(product._id) ? 'fill-current' : ''}`}
              />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <Link to={`/product/${product._id}`}>
            <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${product.discountPrice}
            </span>
            <Button size="sm" onClick={() => handleAddOrUpdateCart()}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
