import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input } from '../../../../components/ui/input';

type InputPasswordProps = {
  showPassword: boolean;
  password: string;
  setPassword: (pass: string) => void;
  setShowPassword: (isVisible: boolean) => void;
};

const InputPassword = ({
  password,
  setPassword,
  showPassword,
  setShowPassword,
}: InputPasswordProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        New Password
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter new password"
          className="pl-10 pr-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
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
      <p className="text-xs text-muted-foreground">
        Password must be at least 8 characters long
      </p>
    </div>
  );
};

export default InputPassword;
