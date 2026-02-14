import { useShallow } from 'zustand/shallow';
import CategoryFeatures from './CategoryFeatures';
import CategoryList from './CategoryList';
import { useCategoriesStore } from '@/stores/useCategoriesStore';

type Props = {};

const Category = ({}: Props) => {
  const categories = useCategoriesStore(
    useShallow((state) => state.categories),
  );

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

        <CategoryList categories={categories} />

        {/* Featured Categories Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Featured Collections
          </h2>
          <CategoryFeatures />
        </div>
      </div>
    </div>
  );
};

export default Category;
