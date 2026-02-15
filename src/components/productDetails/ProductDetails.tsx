import { Link, useParams } from 'react-router-dom';
import BreadCrumb from './BreadCrumb';
import { Button } from '../ui/button';
import useProductDetails from '@/hooks/use-productDetails';
import { toast } from '@/hooks/use-toast';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';
import { brands } from '@/data/mockData';
import RelatedProductList from './RelatedProducts';

const ProductDetails = () => {
  const { id } = useParams();

  const {
    product,
    handleAddOrUpdateCart,
    isFavorite,
    quantity,
    selectedImage,
    setQuantity,
    setSelectedImage,
    toggleFavorite,
    productIds,
  } = useProductDetails(id!);

  if (product.inStock < 1) {
    toast({
      title: 'Out of stock',
      description: 'Add it to favorite to be notified when be available again',
    });
  }

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

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <BreadCrumb productname={product.name} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImages
            images={product.images || []}
            image={product.image}
            productname={product.name}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <ProductInfo
            brand={brands[0]}
            colors={product.attributes?.colors || []}
            description={product.description}
            discount={product.discountPrice || 0}
            features={product.features}
            inStock={product.inStock}
            price={product.price}
            productname={product.name}
            ratingAverage={product.ratings.average}
            ratingCount={product.ratings.count}
            size={product.attributes?.size || []}
            tag={product.tag || ''}
            handleAddOrUpdateCart={handleAddOrUpdateCart}
            isFavorite={isFavorite}
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            toggleFavorite={toggleFavorite}
          />
        </div>
        <RelatedProductList productIds={productIds} />
      </div>
    </div>
  );
};

export default ProductDetails;
