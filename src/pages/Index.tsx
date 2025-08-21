import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Features from '@/components/Features';
import ProductCarousel from '@/components/Carousel';

const Index = () => {
  return (
    <div className="min-h-screen bg-background mt-28">
      <Hero />
      <ProductCarousel />
      <ProductGrid />
      <Features />
    </div>
  );
};

export default Index;
