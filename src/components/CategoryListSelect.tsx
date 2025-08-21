import type { Categories } from '@/types/Categories';
import { SelectItem } from './ui/select';
import { memo } from 'react';

const CategoryList = ({ category }: { category: Categories }) => {
  return <SelectItem value={category._id}>{category.name}</SelectItem>;
};

export default memo(CategoryList);
