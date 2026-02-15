import { Badge } from '../ui/badge';

type PriceAndDiscountProps = {
  price: number;
  discount: number;
};

const PriceAndDiscount = ({ discount, price }: PriceAndDiscountProps) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-3xl font-bold text-primary">${discount}</span>
      {price && (
        <span className="text-xl text-foreground/60 line-through">
          ${price}
        </span>
      )}
      {discount && (
        <Badge variant="destructive">
          Save ${(price - discount).toFixed(2)}
        </Badge>
      )}
    </div>
  );
};

export default PriceAndDiscount;
