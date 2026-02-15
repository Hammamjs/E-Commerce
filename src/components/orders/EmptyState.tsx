import { Card, CardContent } from '../ui/card';
import { Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

type EmptyStateOrder = {
  orderLength: number;
};

const EmptyState = ({ orderLength }: EmptyStateOrder) => {
  return (
    orderLength === 0 && (
      <Card className="text-center py-12">
        <CardContent>
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No orders yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Start shopping to see your orders here
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </CardContent>
      </Card>
    )
  );
};

export default EmptyState;
