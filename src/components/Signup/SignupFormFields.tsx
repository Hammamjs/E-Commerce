import type { UserInfo } from '@/types/User';
import FormInput from './FormInput';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import PasswordRequirements from './PasswordRequirements';

type UserFields = {
  [K in keyof UserInfo]: UserInfo[K] extends string ? K : never;
}[keyof UserInfo];

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupFormFieldsProps = {
  formData: FormData;
  showPassword: boolean;
  showConfirmedPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (field: UserFields, value: string) => void;
};

const SignupFormFields = ({
  formData,
  handleInputChange,
  setShowConfirmPassword,
  setShowPassword,
  showConfirmedPassword,
  showPassword,
}: SignupFormFieldsProps) => {
  return (
    <>
      <FormInput
        label="Username"
        placeholder="Enter your name"
        onChange={(value) => handleInputChange('username', value)}
        type="text"
        value={formData.username}
        icon={<User className="h-4 w-4" />}
      />

      <FormInput
        label="Email"
        placeholder="Enter your name"
        onChange={(value) => handleInputChange('email', value)}
        type="text"
        value={formData.email}
        icon={<Mail className="h-4 w-4" />}
      />

      <FormInput
        label="Password"
        onChange={(value) => handleInputChange('password', value)}
        placeholder="Enter strong password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        icon={<Lock className="h-4 w-4" />}
        rightElement={
          <button onClick={() => setShowPassword((p) => !p)} type="button">
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        }
      />
      <PasswordRequirements password={formData.password} />

      <FormInput
        label="Confirm password"
        onChange={(value) => handleInputChange('passwordConfirm', value)}
        placeholder="Enter password confirmation"
        type="text"
        value={formData.confirmPassword}
        icon={<Lock className="w-4 h-4" />}
        rightElement={
          <button
            type="button"
            onClick={() => setShowConfirmPassword((p) => !p)}
          >
            {showConfirmedPassword ? <EyeOff /> : <Eye />}
          </button>
        }
      />

      {formData.confirmPassword &&
        formData.confirmPassword != formData.password && (
          <p className="text-sm text-destructive">Passwords do not match</p>
        )}
    </>
  );
};

export default SignupFormFields;
