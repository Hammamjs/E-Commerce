import { memo } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

interface CustomFieldTextProps {
  form: any;
  name: string;
}

const CustomFieldText = ({ form, name }: CustomFieldTextProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter product name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default memo(CustomFieldText);
