import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { CartEntry } from '@/features/cart/types/Cart';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface CartCard {
  item: CartEntry;
  handleAddOrUpdateCart: (productId: string, qty?: number) => void;
  handleDeleteProductFromCart: (productId: string) => void;
}

const CartCard = ({
  item,
  handleAddOrUpdateCart,
  handleDeleteProductFromCart,
}: CartCard) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Link to={`/product/${item.product._id}`} className="flex-shrink-0">
            <img
              loading="lazy"
              width="400"
              height="300"
              decoding="async"
              src={item.product?.image}
              alt={item.product?.name}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
            />
          </Link>

          <div className="flex-1 space-y-3">
            <div>
              <Link to={`/product/${item.product._id}`}>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                  {item.product.name}
                </h3>
              </Link>
              <p className="text-sm text-foreground/60">{item.product.brand}</p>
              {item.product.tag && (
                <Badge className="mt-1 bg-primary text-primary-foreground">
                  {item.product.tag}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-primary">
                  ${item.product.discountPrice}
                </span>
                {item.product.price && (
                  <span className="text-sm text-foreground/60 line-through">
                    ${item.product.price}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAddOrUpdateCart(item.product._id, -1)}
                    className="h-8 w-8"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="px-3 py-1 min-w-[2rem] text-center text-sm">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAddOrUpdateCart(item.product._id, 1)}
                    className="h-8 w-8"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteProductFromCart(item.product._id)}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-lg font-semibold">
                Subtotal: $
                {(
                  (item?.product.discountPrice || 0) * (item.quantity || 0)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(CartCard);
