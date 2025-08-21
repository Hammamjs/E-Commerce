import { Input } from '@/components/ui/input';
import useAddProduct from '@/hooks/useAddProduct';

const ColorPicker = () => {
  const {
    selectedColor,
    handleColorOnChange,
    handleKeyDown,
    addColor,
    colors,
    removeColor,
  } = useAddProduct();

  return (
    <>
      <h3>Pick a color</h3>
      <div className="grid grid-cols-1 items-center gap-2">
        <div>
          <Input
            type="color"
            className="w-16 h-10 p-1 rounded cursor-pointer"
            value={selectedColor}
            onChange={handleColorOnChange}
          />
          <Input
            type="text"
            placeholder="Press Enter to add"
            value={selectedColor}
            onChange={handleColorOnChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={addColor}
            className="px-3 py-2 bg-black text-white rounded"
            type="button"
          >
            Add
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          {colors.map((color, idx) => (
            <div
              key={idx}
              className="w-6 h-6 shadow-[0_0_10px_rgba(255,255,255,0.3)] bg-black text-white p-4 rounded cursor-pointer"
              style={{ backgroundColor: color }}
              title={color}
              onClick={() => removeColor(idx)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
ColorPicker.displayName = 'ColorPicker';
export default ColorPicker;
