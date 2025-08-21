import { memo } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '@radix-ui/react-label';
import { sliceCategory } from '@/utils/SliceCategory';
import type { Product } from '@/types/product';

interface CategoryFilterProps {
  id: string;
  name: string;
  checked: boolean;
  onCheckedChange: () => void;
  products: Product[];
}

const CategoryFilter = ({
  id,
  name,
  products,
  checked,
  onCheckedChange,
}: CategoryFilterProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked} //filters.categories.includes(name.trim().toLowerCase())
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor={id} className="text-sm cursor-pointer">
        {name} ({sliceCategory(products, name)})
      </Label>
    </div>
  );
};

export default memo(CategoryFilter);
