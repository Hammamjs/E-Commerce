import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero_img.jpg';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-6 w-6 text-primary-foreground mr-2 animate-float" />
            <span className="text-primary-foreground/80 text-sm uppercase tracking-wide">
              Premium Collection
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Redefine Your
            <span className="block bg-gradient-to-r from-white to-primary-foreground/60 bg-clip-text text-transparent">
              Digital Style
            </span>
          </h1>

          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover cutting-edge products that blend innovation with elegance.
            Elevate your lifestyle with our curated collection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/products">
              <Button variant="hero" size="lg" className="animate-scale-in">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="glass" size="lg">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/60 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
