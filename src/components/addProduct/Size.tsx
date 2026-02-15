import { useState } from 'react';
import { Input } from '../ui/input';
import useAddProduct from '@/hooks/useAddProduct';

const Size = () => {
  const { formState, removeFromArray, addToArray } = useAddProduct();
  const [size, setSize] = useState('');
  const allowededSizes = ['S', 'M', 'L', 'XL'];
  return (
    <div>
      <h3>Size</h3>
      <Input
        onChange={(e) => {
          const val = e.target.value.toUpperCase().trim();
          setSize(val);
          if (allowededSizes.includes(val) && !formState.size.includes(val)) {
            addToArray('size', val);
            setSize('');
          }
        }}
        placeholder=" Add sizes. e.g. S, M, L, XL"
        value={size}
      />
      <div className="flex gap-1">
        {formState.size.map((s, idx) => (
          <span
            onClick={() => removeFromArray('size', idx)}
            key={s}
            className="badge bg-gray-400 cursor-pointer text-black mt-1 block px-1 text-center uppercase rounded-4"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Size;
