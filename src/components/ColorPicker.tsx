import { Input } from '@/components/ui/input';
import useAddProduct from '@/hooks/useAddProduct';

const ColorPicker = () => {
  const { state, dispatch } = useAddProduct();

  return (
    <>
      <h3>Pick a color</h3>
      <div className="grid grid-cols-1 items-center gap-2">
        <div>
          <Input
            type="color"
            className="w-16 h-10 p-1 rounded cursor-pointer"
            value={state.selectedColor}
            onChange={(e) =>
              dispatch({ type: 'ADD_COLOR', payload: e.target.value })
            }
          />
        </div>

        <div className="mt-4 flex gap-2">
          {state.colors.map((color, idx) => (
            <div
              key={color}
              className="w-6 h-6 shadow-[0_0_10px_rgba(255,255,255,0.3)] bg-black text-white p-4 rounded cursor-pointer"
              style={{ backgroundColor: color }}
              title={color}
              onClick={() => dispatch({ type: 'REMOVE_COLOR', payload: idx })}
            />
          ))}
        </div>
      </div>
    </>
  );
};
ColorPicker.displayName = 'ColorPicker';
export default ColorPicker;
