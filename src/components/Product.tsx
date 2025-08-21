import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product as ProductInterface } from '@/types/product';
import useCart from '@/hooks/use-cart';
import useFavorites from '@/hooks/use-favorites';
import { memo } from 'react';

export const Product = memo(
  ({ index, product }: { index: number; product: ProductInterface }) => {
    const { handleAddToCart } = useCart();
    const { handleUpdateFav, isFavorite } = useFavorites();

    return (
      <Card
        className="group bg-card/50 backdrop-blur-sm border-border/20 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <Link to={`/product-details/${product._id}`}>
              <img
                srcSet={`${product.image} 2x`}
                loading="lazy"
                alt={product.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
            <div className="absolute top-4 left-4">
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
                onClick={() => handleUpdateFav(product)}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorite(product._id) ? 'fill-current' : ''
                  }`}
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
              <Button size="sm" onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
