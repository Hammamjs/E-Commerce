import CustomFieldText from '../CustomFieldText';
import CustomFormFiled from '../CustomFormFiled';
import Size from './Size';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import type { UseFormReturn } from 'react-hook-form';
import type { ProductFormData } from '@/schema/ProductSchema';
import ProductFormField from './ProductFormField';

type AddProductCustomProps = {
  form: UseFormReturn<ProductFormData>;
};

const AddProductCustomInput = ({ form }: AddProductCustomProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomFieldText form={form} name="name" />

        <CustomFieldText form={form} name="brand" placeholder="Enter brand" />

        <CustomFormFiled
          form={form}
          type="number"
          label="Price ($)"
          name="price"
        />

        <CustomFormFiled
          form={form}
          type="number"
          name="discountPrice"
          label="Discount Price ($) - Optional"
        />
        <CustomFormFiled
          form={form}
          type="number"
          name="inStock"
          label="Stock Quantity"
        />

        <Size />
        <ProductFormField form={form} />
      </div>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter detailed product description"
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AddProductCustomInput;
