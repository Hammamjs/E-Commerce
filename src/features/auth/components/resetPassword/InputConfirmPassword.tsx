import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input } from '../../../../components/ui/input';

type InputConfirmPasswordProps = {
  showConfirmPassword: boolean;
  confirmPassword: string;
  passwordsMatch: boolean;
  setConfirmPassword: (val: string) => void;
  setShowConfirmPassword: (isVisible: boolean) => void;
};

const InputConfirmPassword = ({
  confirmPassword,
  showConfirmPassword,
  passwordsMatch,
  setConfirmPassword,
  setShowConfirmPassword,
}: InputConfirmPasswordProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Confirm Password
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm new password"
          className={`pl-10 pr-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg ${
            confirmPassword && !passwordsMatch ? 'border-destructive' : ''
          }`}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          {showConfirmPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {confirmPassword && !passwordsMatch && (
        <p className="text-xs text-destructive">Passwords do not match</p>
      )}
    </div>
  );
};

export default InputConfirmPassword;
