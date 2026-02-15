import { memo } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import type { Control, Path } from 'react-hook-form';
import type { ProductFormData } from '@/schema/ProductSchema';
import { capitalize } from '@/utils/capitalize';

type OnlyStringFields = {
  [k in keyof ProductFormData]: ProductFormData[k] extends string ? k : never;
};

interface CustomTextPropsInput {
  control: Control<ProductFormData>;
  name: Path<OnlyStringFields>;
  placeholder?: string;
  labelname: string;
}

const CustomTextInput = ({
  control,
  name,
  labelname,
  placeholder,
}: CustomTextPropsInput) => {
  const capitalizename = capitalize(labelname);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{capitalizename}</FormLabel>
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

export default memo(CustomTextInput);
