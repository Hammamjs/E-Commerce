import { forwardRef, type ImgHTMLAttributes } from 'react';

const LazyImage = forwardRef<
  HTMLImageElement,
  ImgHTMLAttributes<HTMLImageElement>
>((props, ref) => {
  return <img ref={ref} {...props} />;
});

export default LazyImage;
