import type { ReactNode } from 'react';
import { Input } from '../ui/input';

type InputType = React.InputHTMLAttributes<HTMLInputElement>['type'];

type FormInputProps = {
  label: string;
  type: InputType;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  rightElement?: ReactNode;
};

const FormInput = ({
  icon,
  type,
  label,
  onChange,
  placeholder,
  rightElement,
  value,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 h-4 w-4 text-muted-foreground">
            {icon}
          </div>
        )}
        <Input
          type={type}
          placeholder={placeholder}
          className={`pl-10 pr-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg
           ${icon ? 'pl-1' : ''} ${rightElement ? 'pr-10' : ''}
           `}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />
        {rightElement && (
          <div className="absolute right-3 top-3">{rightElement}</div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
