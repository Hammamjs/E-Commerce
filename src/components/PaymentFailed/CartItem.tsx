import type { CartEntry } from '@/types/Cart';

type CartItemProps = {
  item: CartEntry;
};

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="flex justify-between items-center py-3 px-4 bg-muted/30 rounded-lg">
      <div className="flex-1">
        <span className="font-medium text-foreground">{item.product.name}</span>
        <span className="text-muted-foreground ml-2">× {item.quantity}</span>
      </div>
      <span className="font-semibold text-foreground">
        ${item.total?.toFixed(2)}
      </span>
    </div>
  );
};

export default CartItem;
