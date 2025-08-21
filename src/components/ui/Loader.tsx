import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'dots' | 'pulse' | 'wave' | 'orbit';
  className?: string;
}

const Loader = ({
  size = 'md',
  variant = 'default',
  className,
}: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const containerSizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center justify-center gap-1', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full bg-primary',
              size === 'sm'
                ? 'w-1.5 h-1.5'
                : size === 'md'
                ? 'w-2 h-2'
                : 'w-3 h-3'
            )}
            style={{
              animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('relative', containerSizes[size], className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full bg-primary/30"
            style={{
              animation: `ping 2s cubic-bezier(0, 0, 0.2, 1) ${
                i * 0.4
              }s infinite`,
            }}
          />
        ))}
        <div
          className={cn(
            'absolute inset-0 rounded-full bg-primary/50',
            sizeClasses[size]
          )}
        />
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div
        className={cn('flex items-center justify-center gap-0.5', className)}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              'bg-primary rounded-full',
              size === 'sm'
                ? 'w-0.5 h-4'
                : size === 'md'
                ? 'w-1 h-8'
                : 'w-1.5 h-12'
            )}
            style={{
              animation: `wave 1.2s ease-in-out ${i * 0.1}s infinite`,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'orbit') {
    return (
      <div className={cn('relative', containerSizes[size], className)}>
        <div className="absolute inset-0 rounded-full border border-primary/20" />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
            style={{
              animation: `spin ${1 + i * 0.5}s linear infinite`,
              transform: `rotate(${i * 120}deg)`,
            }}
          />
        ))}
        <div
          className={cn(
            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary',
            size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3'
          )}
        />
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-2 border-primary/20"></div>
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"></div>
    </div>
  );
};

export { Loader };
