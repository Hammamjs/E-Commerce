import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import useAddProduct from '@/hooks/useAddProduct';
import type { ProductFormData } from '@/schema/ProductSchema';
import type { UseFormReturn } from 'react-hook-form';
import CategoryListSelect from '../CategoryListSelect';

type CategoriesdDropdownProps = {
  form: UseFormReturn<ProductFormData>;
};

const CategoriesdDropdown = ({ form }: CategoriesdDropdownProps) => {
  const { categories } = useAddProduct();
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map((c) => (
                <CategoryListSelect key={c._id} category={c} />
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CategoriesdDropdown;
