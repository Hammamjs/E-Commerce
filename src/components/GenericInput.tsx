import { X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { memo } from 'react';

interface GenericInputProps {
  values: string[];
  value: string;
  index: number;
  onUpdate: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}

const FeaturesInput = ({
  values,
  value,
  index,
  onUpdate,
  onRemove,
  placeholder,
}: GenericInputProps) => {
  return (
    <div className="flex gap-2">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onUpdate(index, e.target.value)}
      />
      {values.length > 1 && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => onRemove(index)}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default memo(FeaturesInput);
