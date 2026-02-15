import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-secondary opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="w-96 h-72 mx-auto flex items-center justify-center animate-float">
                <div className="text-9xl">🚀</div>
              </div>
            </div>

            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-primary-foreground mr-2 animate-float" />
              <span className="text-primary-foreground/80 text-sm uppercase tracking-wide">
                Oops! Lost in Space
              </span>
            </div>

            <h1 className="text-8xl md:text-9xl font-bold text-primary-foreground mb-4 opacity-20">
              404
            </h1>

            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Page Not Found
            </h2>

            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              The page you're looking for seems to have drifted into the digital
              void. Let's get you back to exploring our amazing products!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="hero"
                size="lg"
                asChild
                className="animate-scale-in"
              >
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Return Home
                </Link>
              </Button>
              <Button
                variant="glass"
                size="lg"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-4 h-4 bg-primary-foreground/20 rounded-full animate-float"></div>
      <div
        className="absolute top-40 right-20 w-6 h-6 bg-primary-foreground/10 rounded-full animate-float"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-8 h-8 bg-primary-foreground/15 rounded-full animate-float"
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-3 h-3 bg-primary-foreground/25 rounded-full animate-float"
        style={{ animationDelay: '0.5s' }}
      ></div>
    </div>
  );
};

export default NotFound;
