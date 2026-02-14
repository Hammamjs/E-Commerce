import useEditProduct from '@/hooks/use-editProduct';
import Header from '../Header';
import EditProductHeader from './EditProductHeader';
import EditProductForm from './EditProductForm';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Edit } from 'lucide-react';
import LoadingProduct from './LoadingProduct';
import ProductNotFound from './ProductNotFound';

const EditProduct = () => {
  const { form, loading, productFound, onSubmit, isUpdating } =
    useEditProduct();

  if (loading) return <LoadingProduct />;

  if (!productFound) return <ProductNotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <EditProductHeader />

        <Card className="shadow-xl border-border/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Product Information
            </CardTitle>
          </CardHeader>
          <EditProductForm
            form={form}
            onSubmit={onSubmit}
            isUpdating={isUpdating}
          />
        </Card>
      </div>
    </div>
  );
};

export default EditProduct;
