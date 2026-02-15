import React from 'react';
import { Button } from '../ui/button';
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types/product';

type ProductQuantityProps = {
  setQuantity: (qty: number) => void;
  handleAddOrUpdateCart: (qty: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  product: Product;
  quantity: number;
};

export default function ProductQuantity({
  product,
  setQuantity,
  handleAddOrUpdateCart,
  isFavorite,
  toggleFavorite,
  quantity,
}: ProductQuantityProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Quantity:</span>
        <div className="flex items-center border border-border rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-10 w-10"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            className="h-10 w-10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={() => handleAddOrUpdateCart(quantity)}
          disabled={product.inStock === 0}
          className="flex-1"
          size="lg"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => toggleFavorite(product)}
          className="px-6"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite(product._id) ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </Button>
      </div>
    </div>
  );
}
