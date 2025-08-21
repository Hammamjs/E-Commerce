import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CarouselItem } from './ui/carousel';
import type { Product } from '@/types/product';
import { Link } from 'react-router-dom';
import useCart from '@/hooks/use-cart';
import useFavorites from '@/hooks/use-favorites';
import useProductCarousel from '@/hooks/use-carouselProduct';

const CarouselProduct = ({ product }: { product: Product }) => {
  const { handleAddOrUpdateCart } = useCart();
  const { handleUpdateFav, isFavorite } = useFavorites();

  const { handleAddToCart, handleFavoriteClick, tagClass } = useProductCarousel(
    {
      product,
      handleAddOrUpdateCart,
      handleUpdateFav,
      isFavorite,
    }
  );

  return (
    <CarouselItem
      key={product._id}
      className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
    >
      <Card className="group hover:shadow-glow w-full transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </Link>

            {product.tag && (
              <Badge
                className={`absolute top-3 left-3 ${tagClass(product.tag)}`}
              >
                {product.tag}
              </Badge>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 rounded-full backdrop-blur-sm transition-colors duration-200 ${
                isFavorite(product._id)
                  ? 'bg-destructive/20 text-destructive hover:bg-destructive/30'
                  : 'bg-background/20 text-foreground hover:bg-background/30'
              }`}
              onClick={handleFavoriteClick}
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite(product._id) ? 'fill-current' : ''
                }`}
              />
            </Button>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {product.brand}
              </span>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                <span className="text-sm font-medium">
                  {product.ratings.average}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  ({product.ratings.count})
                </span>
              </div>
            </div>

            <Link to={`/product/${product._id}`}>
              <h3 className="font-semibold text-lg mb-3 line-clamp-2 hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary">
                  ${product.discountPrice}
                </span>
                {product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.price}
                  </span>
                )}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default CarouselProduct;
