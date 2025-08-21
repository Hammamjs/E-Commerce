import { cn } from '@/lib/utils';

interface ProductLoaderProps {
  variant?: 'card' | 'grid' | 'list' | 'detail';
  count?: number;
  className?: string;
}

const ProductLoader = ({
  variant = 'card',
  count = 1,
  className,
}: ProductLoaderProps) => {
  if (variant === 'grid') {
    return (
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
          className
        )}
      >
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} delay={i * 0.1} />
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn('space-y-4', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <ProductListSkeleton key={i} delay={i * 0.08} />
        ))}
      </div>
    );
  }

  if (variant === 'detail') {
    return (
      <div className={cn('grid md:grid-cols-2 gap-8', className)}>
        <ProductImageSkeleton />
        <ProductDetailsSkeleton />
      </div>
    );
  }

  // Default card variant
  return (
    <div className={cn('', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} delay={i * 0.1} />
      ))}
    </div>
  );
};

const ProductCardSkeleton = ({ delay = 0 }: { delay?: number }) => (
  <div
    className="bg-card rounded-lg border overflow-hidden animate-fade-in"
    style={{ animationDelay: `${delay}s` }}
  >
    {/* Product Image Skeleton */}
    <div className="relative h-48 bg-gradient-to-r from-muted via-muted/50 to-muted animate-shimmer bg-[length:200%_100%]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    </div>

    {/* Product Info Skeleton */}
    <div className="p-4 space-y-3">
      {/* Title */}
      <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%]" />

      {/* Price */}
      <div className="h-6 w-20 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded animate-shimmer bg-[length:200%_100%]" />

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <div className="flex-1 h-9 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%]" />
        <div className="w-9 h-9 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%]" />
      </div>
    </div>
  </div>
);

const ProductListSkeleton = ({ delay = 0 }: { delay?: number }) => (
  <div
    className="flex gap-4 p-4 bg-card rounded-lg border animate-fade-in"
    style={{ animationDelay: `${delay}s` }}
  >
    {/* Product Image */}
    <div className="relative w-20 h-20 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 border border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    </div>

    {/* Product Info */}
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%]" />
      <div className="h-3 w-3/4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%]" />
      <div className="h-5 w-16 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded animate-shimmer bg-[length:200%_100%]" />
    </div>
  </div>
);

const ProductImageSkeleton = () => (
  <div className="relative aspect-square bg-gradient-to-br from-muted via-muted/50 to-muted rounded-lg animate-shimmer bg-[length:200%_100%]">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-primary/40 rounded-full"
            style={{
              animation: `orbit 2s linear infinite`,
              animationDelay: `${i * 0.6}s`,
              transformOrigin: '20px 0px',
            }}
          />
        ))}
        {/* Center dot */}
        <div className="w-4 h-4 bg-primary/60 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

const ProductDetailsSkeleton = () => (
  <div className="space-y-6 animate-fade-in">
    {/* Title */}
    <div className="space-y-2">
      <div className="h-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%]" />
      <div className="h-8 w-3/4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%]" />
    </div>

    {/* Price */}
    <div className="h-10 w-32 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded animate-shimmer bg-[length:200%_100%]" />

    {/* Description */}
    <div className="space-y-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%]"
          style={{ width: `${100 - i * 10}%` }}
        />
      ))}
    </div>

    {/* Buttons */}
    <div className="flex gap-3">
      <div className="flex-1 h-12 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%]" />
      <div className="w-12 h-12 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:200%_100%]" />
    </div>
  </div>
);

export { ProductLoader };
