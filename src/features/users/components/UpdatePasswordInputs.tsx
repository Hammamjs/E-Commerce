import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import type { UserInfo } from '@/features/users/types/User';
import type { Dispatch, SetStateAction } from 'react';
import { Button } from '../../../components/ui/button';

type UpdatePasswordInputsProps = {
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  changePass: boolean;
  showPassword: boolean;
  updateUser: (target: keyof Partial<UserInfo>, newVal: string) => void;
  user: UserInfo;
  handleUpdateUserPassword: () => void;
};

const UpdatePasswordInputs = ({
  changePass,
  showPassword,
  updateUser,
  setShowPassword,
  user,
  handleUpdateUserPassword,
}: UpdatePasswordInputsProps) => {
  return (
    changePass && (
      <>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Current password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Current password"
              value={user?.currentPassword ?? ''}
              className="pl-10 pr-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
              onChange={(e) => updateUser('currentPassword', e.target.value)}
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
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="New password"
              value={user?.password ?? ''}
              className="pl-10 pr-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
              onChange={(e) => updateUser('password', e.target.value)}
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
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Password confirmation
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className="pl-10 pr-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
              onChange={(e) => updateUser('passwordConfirm', e.target.value)}
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
        <Button onClick={handleUpdateUserPassword}>Update password</Button>
      </>
    )
  );
};

export default UpdatePasswordInputs;
