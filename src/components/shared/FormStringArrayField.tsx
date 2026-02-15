import { Label } from 'recharts';
import GenericInput from '../GenericInput';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import useAddProduct from '@/hooks/useAddProduct';
import type { ArrayField } from '@/stores/addProduct/useAddProductState';
import { capitalize } from '@/utils/capitalize';

type FormStringArrayFieldProps = {
  field: ArrayField;
};

const FormStringArrayField = ({ field }: FormStringArrayFieldProps) => {
  const { formState, addToArray, removeFromArray, updateInArray } =
    useAddProduct();
  const capitalizeField = capitalize(field);
  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">
        Product {capitalizeField}
      </Label>
      {formState[field].map((val, index) => (
        <GenericInput
          className={`${index != formState[field].length - 1 ? 'transition-opacity opacity-30' : null}`}
          values={formState[field]}
          value={val}
          index={index}
          key={index}
          onUpdate={(value) => updateInArray(field, value, index)}
          onRemove={() => removeFromArray(field, index)}
          placeholder={`Enter product ${capitalizeField.slice(0, capitalizeField.length - 1)}`}
          disabled={index != formState[field].length - 1}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => addToArray(field, '')}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {capitalizeField}
      </Button>
    </div>
  );
};

export default FormStringArrayField;
