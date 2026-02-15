import AddProductHeader from './AddProductHeader';
import { Card, CardContent } from '../ui/card';
import CardHeaderProduct from './CardHeaderProduct';
import useAddProduct from '@/hooks/useAddProduct';
import AddProductForm from './AddProductForm';

const AddProduct = () => {
  const { form, onSubmit } = useAddProduct();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AddProductHeader />
      </div>
      <Card className="shadow-xl border-border/20 bg-card/50 backdrop-blur-sm">
        <CardHeaderProduct />
        <CardContent>
          <AddProductForm form={form} onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
