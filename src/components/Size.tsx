import { Input } from './ui/input';
import useAddProduct from '@/hooks/useAddProduct';

const Size = () => {
  const { dispatch, state } = useAddProduct();
  const allowededSizes = ['S', 'M', 'L', 'XL'];
  return (
    <div>
      <h3>Size</h3>
      <Input
        onChange={(e) => {
          const val = e.target.value.toUpperCase().trim();
          dispatch({ type: 'SET_TYPED_SIZE', payload: val });
          console.log(state.typedSize);
          if (allowededSizes.includes(val) && !state.size.includes(val))
            dispatch({ type: 'ADD_SIZE', payload: val });
        }}
        placeholder=" Add sizes. e.g. S, M, L, XL"
        value={state.typedSize}
      />
      <div className="flex gap-1">
        {state.size.map((s) => (
          <span
            onClick={() => dispatch({ type: 'REMOVE_SIZE', payload: s })}
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
