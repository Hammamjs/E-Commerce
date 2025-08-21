import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface ErrorBoundaryFallbackProps {
  error?: Error;
  resetError?: () => void;
}

const ErrorBoundaryFallback = ({
  error,
  resetError,
}: ErrorBoundaryFallbackProps) => {
  const handleReload = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-destructive/5 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-destructive/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-lg relative z-10 backdrop-blur-sm bg-card/95 border-border/50 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-destructive">
            Oops! Something went wrong
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            We encountered an unexpected error. Don't worry, it's not your
            fault!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
              <h4 className="font-semibold text-destructive mb-2">
                Error Details:
              </h4>
              <p className="text-sm text-muted-foreground font-mono break-all">
                {error.message}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleReload}
              className="w-full relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transition-transform group-hover:scale-105"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </span>
            </Button>

            <Button
              variant="outline"
              asChild
              className="w-full border-border hover:bg-accent/50"
            >
              <Link to="/" className="flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-2">
              Still having trouble?
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorBoundaryFallback;
