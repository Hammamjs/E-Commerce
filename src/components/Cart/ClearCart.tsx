import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

type ClearCartProps = {
  handleClearCart: () => void;
};

const ClearCart = ({ handleClearCart }: ClearCartProps) => {
  return (
    <div className="flex justify-end pt-4">
      <Button
        variant="outline"
        onClick={handleClearCart}
        className="text-destructive border-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear Cart
      </Button>
    </div>
  );
};

export default ClearCart;
