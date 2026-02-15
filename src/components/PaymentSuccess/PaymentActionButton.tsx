import { ArrowRight, Download, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const PaymentActionButton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Button variant="outline" className="flex items-center gap-2">
        <Download className="w-4 h-4" />
        Download Receipt
      </Button>

      <Button variant="outline" asChild>
        <Link to="/orders" className="flex items-center gap-2">
          <Package className="w-4 h-4" />
          View Orders
        </Link>
      </Button>

      <Button asChild className="flex items-center gap-2">
        <Link to="/products">
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
};

export default PaymentActionButton;
