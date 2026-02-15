import { getPasswordRequirements } from '@/utils/getPasswordRequirements';
import { Check } from 'lucide-react';

type PasswordRequirementsProps = {
  password: string;
};

const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  const requirments = getPasswordRequirements(password);
  return (
    password && (
      <div className="mt-2 space-y-1">
        {requirments.map(({ text, met }) => (
          <div
            key={text}
            className={`flex items-center text-xs transition-colors duration-200 ${
              met ? 'text-green-500' : 'text-muted-foreground'
            }`}
          >
            <Check
              className={`h-3 w-3 mr-2 transition-opacity duration-200 ${
                met ? 'opacity-100' : 'opacity-30'
              }`}
            />
            {text}
          </div>
        ))}
      </div>
    )
  );
};

export default PasswordRequirements;
