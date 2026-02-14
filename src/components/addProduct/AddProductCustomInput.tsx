import CustomFieldText from '../shared/CustomTextInput';
import Size from './Size';
import type { UseFormReturn } from 'react-hook-form';
import type { ProductFormData } from '@/schema/ProductSchema';
import ProductFormField from '../shared/CategoriesDropdown';
import CustomTextInput from '../shared/CustomTextInput';
import CustomNumberInput from '../shared/CustomNumberInput';
import CustomTextarea from '../shared/CustomTextarea';

type AddProductCustomProps = {
  form: UseFormReturn<ProductFormData>;
};

const AddProductCustomInput = ({ form }: AddProductCustomProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomTextInput
          control={form.control}
          name="name"
          labelname="product"
          placeholder="Enter Product name"
        />

        <CustomFieldText
          control={form.control}
          name="brand"
          labelname="brnd"
          placeholder="Enter brand"
        />

        <CustomNumberInput
          control={form.control}
          label="Price ($)"
          name="price"
        />

        <CustomNumberInput
          control={form.control}
          name="discountPrice"
          label="Discount Price ($) - Optional"
        />

        <CustomNumberInput
          control={form.control}
          name="inStock"
          label="Stock Quantity"
        />

        <Size />
        <ProductFormField form={form} />
      </div>
      <CustomTextarea control={form.control} />
    </>
  );
};

export default AddProductCustomInput;
