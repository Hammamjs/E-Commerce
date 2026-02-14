import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const FavoriteNotFound = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <Heart className="h-24 w-24 text-foreground/30 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              No Favorites Yet
            </h1>
            <p className="text-foreground/60">
              Start exploring and add products to your favorites list
            </p>
          </div>
          <Link to="/products">
            <Button size="lg">Discover Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FavoriteNotFound;
