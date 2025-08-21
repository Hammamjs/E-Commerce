import { Input } from './ui/input';
import useAddProduct from '@/hooks/useAddProduct';

const Size = () => {
  const { setTypedSize, typedSize, size, removeSize } = useAddProduct();
  return (
    <div>
      <h3>Size</h3>
      <Input
        onChange={(e) => setTypedSize(e.target.value)}
        placeholder=" Add sizes. e.g. S, M, L, XL"
        value={typedSize}
      />
      <div className="flex gap-1">
        {size.map((s) => (
          <span
            onClick={() => removeSize(s)}
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
