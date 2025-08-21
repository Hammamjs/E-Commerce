import React from 'react';
import { Card, CardContent } from './ui/card';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface RelatedProductProps {
  id: string;
  name: string;
  image: string;
  discountPrice: number;
  ratings: {
    average: number;
  };
}

const RelatedProduct = ({
  id,
  name,
  image,
  discountPrice,
  ratings,
}: RelatedProductProps) => {
  return (
    <Card
      key={id}
      className="group bg-card/50 backdrop-blur-sm border-border/20 hover:shadow-glow transition-all duration-300 hover:-translate-y-2"
    >
      <CardContent className="p-0">
        <Link to={`/product-details/${id}`}>
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              loading="lazy"
              src={image}
              alt={name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-primary">
                ${discountPrice}
              </span>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm ml-1">{ratings.average}</span>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RelatedProduct;
