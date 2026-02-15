import { Button } from '../ui/button';
import { Download, Eye } from 'lucide-react';
import type { OrderStatus } from '@/types/Orders';

type OrderActionProps = {
  orderStatus: OrderStatus;
};

const OrderAction = ({ orderStatus }: OrderActionProps) => {
  return (
    <>
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <Eye className="w-4 h-4" />
        View Details
      </Button>

      {orderStatus === 'delivered' && (
        <>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Invoice
          </Button>
          <Button variant="outline" size="sm">
            Reorder
          </Button>
        </>
      )}

      {orderStatus === 'shipped' && (
        <Button variant="outline" size="sm">
          Track Package
        </Button>
      )}
    </>
  );
};

export default OrderAction;
