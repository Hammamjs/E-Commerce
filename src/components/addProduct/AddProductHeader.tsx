import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AddProductHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4 mb-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="hover:bg-accent/20 mt-10 text-white"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Add New Product
        </h1>
        <p className="text-muted-foreground">
          Create a new product listing for your store
        </p>
      </div>
    </div>
  );
};

export default AddProductHeader;
