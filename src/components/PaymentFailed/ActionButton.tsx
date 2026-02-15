import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';

const ActionButton = () => {
  const nav = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <Button
        onClick={() => nav('/cart')}
        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
      >
        <RefreshCw className="w-4 h-4" />
        Retry Payment
      </Button>

      <Button variant="outline" asChild>
        <Link to="/cart" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>
      </Button>
    </div>
  );
};

export default ActionButton;
