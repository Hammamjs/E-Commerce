import { Loader2 } from 'lucide-react';
import Header from '../Header';
import { Card, CardContent } from '../ui/card';

const LoadingProduct = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-xl border-border/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">
                Loading product details...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoadingProduct;
