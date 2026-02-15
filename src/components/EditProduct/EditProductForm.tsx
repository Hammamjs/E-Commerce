import { Form } from 'react-router-dom';
import { CardContent } from '../ui/card';
import type { UseFormReturn } from 'react-hook-form';
import type { ProductFormData } from '@/schema/ProductSchema';
import CustomTextInput from '../shared/CustomTextInput';
import CustomNumberInput from '../shared/CustomNumberInput';
import CheckInStock from './CheckInStock';
import FormStringArrayField from '../shared/FormStringArrayField';
import EditButtonStatus from './EditButtonStatus';
import CategoriesdDropdown from '../shared/CategoriesDropdown';

type Props = {
  form: UseFormReturn<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  isUpdating: boolean;
};

const EditProductForm = ({ form, onSubmit, isUpdating }: Props) => {
  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomTextInput
              control={form.control}
              name="name"
              labelname="poduct name"
              placeholder="enter product name"
            />

            <CustomTextInput
              control={form.control}
              name="name"
              labelname="Brand"
              placeholder="Enter brand name"
            />

            <CustomNumberInput
              name="price"
              label="Price ($)"
              control={form.control}
            />

            <CustomNumberInput
              control={form.control}
              name="discountPrice"
              label="Original Price ($) - Optional"
            />

            {/* <FormField
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
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Home & Garden">
                        Home & Garden
                      </SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Beauty">Beauty</SelectItem>
                      <SelectItem value="Toys">Toys</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <CategoriesdDropdown form={form} />

            <CheckInStock control={form.control} />
          </div>

          <CustomTextInput
            control={form.control}
            name="description"
            labelname="description"
            placeholder="Enter detailed product description"
          />

          {/* Product Features */}
          <FormStringArrayField field="features" />

          {/* Product Images */}
          <FormStringArrayField field="images" />

          <EditButtonStatus isUpdating={isUpdating} />
        </form>
      </Form>
    </CardContent>
  );
};

export default EditProductForm;
