import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ArrowRight } from 'lucide-react';

type Props = {};

const CategoryFeatures = ({}: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gradient-primary text-primary-foreground overflow-hidden">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold mb-4">New Arrivals</h3>
          <p className="mb-6 opacity-90">
            Check out the latest products that just landed in our store
          </p>
          <Link to="/new-arrivals">
            <Button variant="secondary">
              Shop New Arrivals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="bg-gradient-secondary text-foreground overflow-hidden">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold mb-4">Best Sellers</h3>
          <p className="mb-6 text-foreground/80">
            Discover what everyone else is buying this month
          </p>
          <Link to="/best-sellers">
            <Button>
              View Best Sellers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryFeatures;
