import CategoryCard from './CategoryCard';
import type { Categories } from '@/types/Categories';

type Props = {
  categories: Categories[];
};

const CategoryList = ({ categories }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category, index) => (
        <CategoryCard
          key={category._id}
          name={category.name}
          image={category.image}
          index={index}
        />
      ))}
    </div>
  );
};

export default CategoryList;
