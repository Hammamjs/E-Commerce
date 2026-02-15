import { Badge } from '../ui/badge';
import ProductQuantity from './ProductQuantity';
import AvialableSizes from './AvialableSizes';
import AvialableColors from './AvialableColors';
import InstockStatus from './InstockStatus';
import FeatureList from './FeatureList';
import PriceAndDiscount from './PriceAndDiscount';
import RatingStatus from './RatingStatus';
import type { Product } from '@/types/product';

type ProductInfoProps = {
  tag: string;
  productname: string;
  ratingAverage: number;
  ratingCount: number;
  brand: string;
  discount: number;
  price: number;
  description: string;
  inStock: number;
  colors: string[];
  features: string[];
  size: string[];
  product: Product;
  quantity: number;
  handleAddOrUpdateCart: (qty: number) => void;
  isFavorite: (productId: string) => boolean;
  setQuantity: (qty: number) => void;
  toggleFavorite: (product: Product) => void;
};

const ProductInfo = ({
  brand,
  colors,
  description,
  discount,
  inStock,
  price,
  productname,
  ratingAverage,
  ratingCount,
  size,
  tag,
  features,
  handleAddOrUpdateCart,
  isFavorite,
  product,
  quantity,
  setQuantity,
  toggleFavorite,
}: ProductInfoProps) => {
  return (
    <div className="space-y-6">
      {tag && (
        <Badge className="bg-primary text-primary-foreground capitalize">
          {tag}
        </Badge>
      )}

      <h1 className="text-3xl font-bold text-foreground">{productname}</h1>

      <div className="flex items-center space-x-4">
        <RatingStatus ratingAverage={ratingAverage} ratingCount={ratingCount} />
        <span className="text-foreground/60">by {brand}</span>
      </div>

      <PriceAndDiscount price={price} discount={discount} />

      <p className="text-foreground/80 leading-relaxed">{description}</p>

      {/* Features */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Key Features</h3>
        <ul className="space-y-2">
          <FeatureList features={features} />
        </ul>
      </div>

      {/* Stock Status */}
      <InstockStatus inStock={inStock} />

      {/* Color and Size */}
      <div className="space-y-3">
        <AvialableColors colors={colors} />

        <AvialableSizes size={size} />
      </div>

      {/* Quantity and Add to Cart */}
      <ProductQuantity
        handleAddOrUpdateCart={handleAddOrUpdateCart}
        isFavorite={isFavorite}
        setQuantity={setQuantity}
        product={product}
        toggleFavorite={toggleFavorite}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductInfo;
