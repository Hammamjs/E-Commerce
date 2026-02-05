import { X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import React, { memo } from 'react';

interface GenericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  values: string[];
  value: string;
  index: number;
  onUpdate: (val: string) => void;
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
  className,
  disabled,
}: GenericInputProps) => {
  return (
    <div className="flex gap-2">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onUpdate(e.target.value)
        }
        className={className}
        disabled={disabled}
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
