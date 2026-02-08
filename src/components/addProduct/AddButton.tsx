import useAddProduct from '@/hooks/useAddProduct';
import { Button } from '../ui/button';

const AddButton = () => {
  const { navigate } = useAddProduct();
  return (
    <div className="flex gap-4 pt-6">
      <Button type="submit" className="flex-1" variant="hero">
        Add Product
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate(-1)}
        className="flex-1"
      >
        Cancel
      </Button>
    </div>
  );
};

export default AddButton;
