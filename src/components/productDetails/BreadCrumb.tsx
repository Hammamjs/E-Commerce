import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ productname }: { productname: string }) => {
  return (
    <>
      <div className="flex items-center space-x-2 mb-8 text-sm text-foreground/60">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-foreground">
          Products
        </Link>
        <span>/</span>
        <span className="text-foreground">{productname}</span>
      </div>
      <Link
        to="/products"
        className="inline-flex items-center mb-8 text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>
    </>
  );
};

export default BreadCrumb;
