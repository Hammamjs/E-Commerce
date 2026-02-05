import { cn } from '@/lib/utils';
import { useState } from 'react';

type image = {
  img: string;
  productName: string;
  className?: string;
  loadingState?: 'eager' | 'lazy';
};

const CustomImage = ({
  img,
  productName,
  className,
  loadingState = 'lazy',
}: image) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-64 overflow-hidden bg-muted">
      <div
        className={`absolute inset-0 bg-muted transition-opacity duration-500 
       ${loaded ? 'opacity-0' : 'opacity-100'}
       `}
      ></div>
      <img
        loading={loadingState}
        src={img}
        sizes="(max-width: 768px) 100vw, 50vw"
        alt={`${productName}`}
        className={cn(
          `absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out
         ${loaded ? 'blur-none scale-100 opacity-100' : 'blur-xl scale-105 opacity-70'}
         `,
          className,
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default CustomImage;
