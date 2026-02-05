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
  placeholder?: string;
}

const CustomFieldText = ({ form, name, placeholder }: CustomFieldTextProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{name}</FormLabel>
          <FormControl>
            <Input
              placeholder={`${placeholder ? placeholder : 'Enter product name'}`}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default memo(CustomFieldText);
