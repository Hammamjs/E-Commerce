import { memo } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '@radix-ui/react-label';

interface CategoryFilterProps {
  id: string;
  name: string;
  checked: boolean;
  onCheckedChange: () => void;
  count: number;
}

const CategoryFilter = ({
  id,
  name,
  checked,
  onCheckedChange,
  count,
}: CategoryFilterProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked} //filters.categories.includes(name.trim().toLowerCase())
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor={id} className="text-sm cursor-pointer">
        {name} ({count})
      </Label>
    </div>
  );
};

export default memo(CategoryFilter);
