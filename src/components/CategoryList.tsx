import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types/product';
import { memo } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface CategoryListProps {
  name: string;
  image: string;
  index: number;
  products: Product[];
}
const CategoryList = ({ name, image, index }: CategoryListProps) => {
  return (
    <Card
      className="group bg-card/50 backdrop-blur-sm border-border/20 hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-in overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-white/80 text-sm">{0} products</p>
          </div>
        </div>

        <div className="p-6">
          <Link to={`/products?category=${name}`}>
            <Button className="w-full group-hover:shadow-primary transition-all duration-300">
              Browse {name}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(CategoryList);
