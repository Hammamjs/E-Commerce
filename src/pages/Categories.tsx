import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useCategoriesStore } from '@/stores/useCategoriesStore';
import { useProductsStore } from '@/stores/useProductsStore';
import CategoryList from '@/components/CategoryList';
import { Link } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

const Categories = () => {
  const categories = useCategoriesStore(
    useShallow((state) => state.categories)
  );
  const Products = useProductsStore(useShallow((state) => state.products));

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Categories
          </h1>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Discover products across our diverse range of categories, from
            cutting-edge electronics to stylish fashion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryList
              key={category._id}
              name={category.name}
              image={category.image}
              index={index}
              products={Products}
            />
          ))}
        </div>

        {/* Featured Categories Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-primary text-primary-foreground overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">New Arrivals</h3>
                <p className="mb-6 opacity-90">
                  Check out the latest products that just landed in our store
                </p>
                <Link to="/new-arrivals">
                  <Button variant="secondary">
                    Shop New Arrivals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-secondary text-foreground overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Best Sellers</h3>
                <p className="mb-6 text-foreground/80">
                  Discover what everyone else is buying this month
                </p>
                <Link to="/best-sellers">
                  <Button>
                    View Best Sellers
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
