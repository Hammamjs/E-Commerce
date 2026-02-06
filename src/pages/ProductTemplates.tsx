import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useCart from '@/hooks/use-cart';
import useFavorites from '@/hooks/use-favorites';
import { useFavoriteStore } from '@/stores/useFavoritesStore';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface ProductTemplatesProps {
  productId: string;
}

const ProductTemplates = ({ productId }: ProductTemplatesProps) => {
  const favorite = useFavoriteStore((state) => state.favoriteById[productId]);
  const { handleAddOrUpdateCart } = useCart(productId);
  const { handleUpdateFav } = useFavorites(favorite);

  if (!favorite) return null;

  return (
    <Card className="group bg-card/50 backdrop-blur-sm border-border/20 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-in">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Link to={`/product/${productId}`}>
            <img
              loading="lazy"
              width={400}
              height={300}
              src={favorite.image}
              alt={favorite.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </Link>
          {favorite.tag && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground">
                {favorite.tag}
              </Badge>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Button
              variant="glass"
              size="icon"
              onClick={handleUpdateFav}
              className="bg-red-500/20 hover:bg-red-500/30"
            >
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </Button>
          </div>
          {!favorite.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <Link to={`/product/${favorite._id}`}>
            <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors">
              {favorite.name}
            </h3>
          </Link>
          <p className="text-sm text-foreground/60 mb-2">{favorite.brand}</p>
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{favorite.ratings?.average}</span>
              <span className="text-sm text-foreground/60 ml-1">
                ({favorite.ratings?.count})
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">
                ${favorite.price}
              </span>
              {favorite.discountPrice && (
                <span className="text-sm text-foreground/60 line-through">
                  ${favorite.discountPrice}
                </span>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => handleAddOrUpdateCart()}
              disabled={favorite.inStock < 1}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default memo(ProductTemplates);
