import { FormProvider } from 'react-hook-form';
import AddProductCustomInput from './AddProductCustomInput';
import AddButton from './AddButton';
import ColorPicker from './ColorPicker';
import ProductArrayString from './FormStringArrayField';

const AddProductForm = ({ form, onSubmit }: { form: any; onSubmit: any }) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AddProductCustomInput form={form} />
        <ColorPicker />
        <ProductArrayString field="features" />
        <ProductArrayString field="images" />
        <AddButton />
      </form>
    </FormProvider>
  );
};

export default AddProductForm;
