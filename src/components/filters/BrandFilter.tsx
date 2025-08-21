import { Label } from '@radix-ui/react-label';
import { memo } from 'react';
import { Checkbox } from '../ui/checkbox';

interface BrandFilterProps {
  brand: string;
  toggleBrandFilter: (brand: string) => void;
  checked: boolean;
}

const BrandFilter = ({
  brand,
  toggleBrandFilter,
  checked,
}: BrandFilterProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={brand}
        checked={checked}
        onCheckedChange={() => toggleBrandFilter(brand)}
      />
      <Label htmlFor={brand} className="text-sm cursor-pointer">
        {brand}
      </Label>
    </div>
  );
};

export default memo(BrandFilter);
