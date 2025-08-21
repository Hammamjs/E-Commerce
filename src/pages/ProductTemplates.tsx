import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Product } from '@/types/product';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface ProductTemplatesProps {
  index: number;
  product: Product;
  handleAddOrUpdateCart: (product: Product, quantity: number) => void;
  handleUpdateFav: (product: Product) => void;
}

const ProductTemplates = ({
  index,
  product,
  handleAddOrUpdateCart,
  handleUpdateFav,
}: ProductTemplatesProps) => {
  return (
    <Card
      className="group bg-card/50 backdrop-blur-sm border-border/20 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Link to={`/product/${product._id}`}>
            <img
              loading="lazy"
              width={400}
              height={300}
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </Link>
          {product.tag && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground">
                {product.tag}
              </Badge>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Button
              variant="glass"
              size="icon"
              onClick={() => handleUpdateFav(product)}
              className="bg-red-500/20 hover:bg-red-500/30"
            >
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </Button>
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-foreground/60 mb-2">{product.brand}</p>
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{product.ratings?.average}</span>
              <span className="text-sm text-foreground/60 ml-1">
                ({product.ratings?.count})
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">
                ${product.price}
              </span>
              {product.discountPrice && (
                <span className="text-sm text-foreground/60 line-through">
                  ${product.discountPrice}
                </span>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => handleAddOrUpdateCart(product, 1)}
              disabled={product.inStock < 1}
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
