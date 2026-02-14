import { Switch } from '@radix-ui/react-switch';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import type { Control } from 'react-hook-form';
import type { ProductFormData } from '@/schema/ProductSchema';

type Props = {
  control: Control<ProductFormData>;
};

const CheckInStock = ({ control }: Props) => {
  return (
    <FormField
      control={control}
      name="inStock"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">In Stock</FormLabel>
            <p className="text-sm text-muted-foreground">
              Is this product currently available?
            </p>
          </div>
          <FormControl>
            <Switch
              checked={field.value > 0}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CheckInStock;
