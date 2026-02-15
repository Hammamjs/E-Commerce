import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

type Props = {};

const EditProductHeader = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-accent/20"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Edit Product
          </h1>
          <p className="text-muted-foreground">
            Update product information and details
          </p>
        </div>
      </div>
    </>
  );
};

export default EditProductHeader;
