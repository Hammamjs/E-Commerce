import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Link } from 'react-router-dom';
import CarouselProduct from './CarouselProduct';
import { useProductsStore } from '@/stores/useProductsStore';
import { memo, useCallback, useMemo } from 'react';
import type { Product } from '@/types/product';

const shuffleArr = (products: Product[]) => {
  const shuffled = [...products];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 6);
};

const ProductCarousel = () => {
  const products = useProductsStore(useCallback((state) => state.products, []));
  const featuredProducts = useMemo(() => shuffleArr(products), [products]);

  return (
    <section className="py-16 bg-gradient-accent px-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, curated just
            for you
          </p>
        </div>

        <Carousel
          className="w-full max-w-7xl mx-auto"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredProducts.map((product) => (
              <CarouselProduct key={product._id} product={product} />
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="hidden md:flex -right-12 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground" />
        </Carousel>

        <div className="text-center mt-8">
          <Link to="/products">
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(ProductCarousel);
