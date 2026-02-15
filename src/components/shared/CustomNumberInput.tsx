import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { ProductFormData } from '@/schema/ProductSchema';
import type { Control, Path } from 'react-hook-form';

type OnlyNumberFields = {
  [k in keyof ProductFormData]: ProductFormData[k] extends number | undefined
    ? k
    : never;
};

type CustomNumberInputProps = {
  control: Control<ProductFormData>;
  name: Path<OnlyNumberFields>;
  label?: string;
};

const CustomNumberInput = ({
  control,
  name,
  label,
}: CustomNumberInputProps) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                placeholder="0"
                value={field.value ?? ''}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(
                    value == '' ? undefined : Number(e.target.value || 0),
                  );
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CustomNumberInput;
