import { ArrowLeft } from 'lucide-react';
import Header from '../Header';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { useNavigate } from 'react-router-dom';

const ProductNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/products')}
            className="hover:bg-accent/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-destructive">
              Product Not Found
            </h1>
            <p className="text-muted-foreground">
              The product you're looking for doesn't exist
            </p>
          </div>
        </div>
        <Card className="shadow-xl border-border/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                This product may have been deleted or the ID is incorrect.
              </p>
              <Button onClick={() => navigate('/products')}>
                Back to Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductNotFound;
