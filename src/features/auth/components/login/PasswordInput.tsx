import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input } from '../../../../components/ui/input';
import type { Dispatch, SetStateAction } from 'react';

type PasswordInputProps = {
  showPassword: boolean;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setShowPassword: (isVisible: boolean) => void;
};

const PasswordInput = ({
  showPassword,
  password,
  setPassword,
  setShowPassword,
}: PasswordInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Password</label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          className="pl-10 pr-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
