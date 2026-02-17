import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const QuickAction = () => {
  return (
    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
      <Button variant="outline" size="lg">
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add All to Cart
      </Button>
      <Link to="/products">
        <Button variant="outline" size="lg">
          Browse More Products
        </Button>
      </Link>
    </div>
  );
};

export default QuickAction;
