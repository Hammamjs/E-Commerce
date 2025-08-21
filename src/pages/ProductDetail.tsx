import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  ShoppingCart,
  Star,
  ArrowLeft,
  Plus,
  Minus,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ProductReviews from '@/components/ProductReviews';
import useProductDetails from '@/hooks/use-productDetails';
import RelatedProduct from '@/components/RelatedProduct';

const ProductDetail = () => {
  const {
    product,
    products,
    handleAddOrUpdateCart,
    handleAddReview,
    isFavorite,
    quantity,
    selectedImage,
    setQuantity,
    setSelectedImage,
    toggleFavorite,
  } = useProductDetails();

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(
      (p) => p.category._id === product.category._id && p._id !== product._id
    )
    .slice(0, 4);

  if (product.inStock < 1) {
    toast({
      title: 'Out of stock',
      description: 'Add it to favorite to be notified when be available again',
    });
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8 text-sm text-foreground/60">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center mb-8 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-card">
              <img
                loading="lazy"
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-border'
                    }`}
                  >
                    <img
                      loading="lazy"
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.tag && (
              <Badge className="bg-primary text-primary-foreground">
                {product.tag}
              </Badge>
            )}

            <h1 className="text-3xl font-bold text-foreground">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">
                  {product.ratings.average}
                </span>
                <span className="ml-1 text-foreground/60">
                  ({product.ratings.count} reviews)
                </span>
              </div>
              <span className="text-foreground/60">by {product.brand}</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary">
                ${product.discountPrice}
              </span>
              {product.price && (
                <span className="text-xl text-foreground/60 line-through">
                  ${product.price}
                </span>
              )}
              {product.discountPrice && (
                <Badge variant="destructive">
                  Save ${product.price - product.discountPrice}
                </Badge>
              )}
            </div>

            <p className="text-foreground/80 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-foreground/80"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.inStock > 0 ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span
                className={
                  product.inStock > 0 ? 'text-green-600' : 'text-red-600'
                }
              >
                {product.inStock > 0
                  ? `${product.inStock} in stock`
                  : 'Out of Stock'}
              </span>
            </div>

            {/* Color and Size */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Color:</span>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-border"
                    style={{ backgroundColor: product.attributes?.colors[0] }}
                  />
                  <span className="text-sm text-foreground/80 capitalize">
                    {product.attributes?.colors}
                  </span>
                </div>
              </div>

              {product.attributes?.size && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">Size:</span>
                  <Badge variant="outline">{product.attributes?.size}</Badge>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
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
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
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
                  onClick={() => handleAddOrUpdateCart(product, quantity)}
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
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Reviews</h2>
          <ProductReviews
            onAddReview={handleAddReview}
            productId={product._id}
          />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-12">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <RelatedProduct
                  key={relatedProduct._id}
                  id={relatedProduct._id}
                  image={relatedProduct.image}
                  name={relatedProduct.name}
                  discountPrice={
                    relatedProduct.discountPrice || relatedProduct.price
                  }
                  ratings={relatedProduct.ratings}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
