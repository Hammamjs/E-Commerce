import { Link } from 'react-router-dom';
import InputConfirmPassword from './InputConfirmPassword';
import InputPassword from './InputPassword';
import UpdateButton from './UpdateButton';

type ResetPasswordFormInputProps = {
  showPassword: boolean;
  isLoading: boolean;
  isFormValid: boolean;
  showConfirmPassword: boolean;
  confirmPassword: string;
  passwordsMatch: boolean;
  password: string;
  handleSubmit: () => void;
  setConfirmPassword: (val: string) => void;
  setShowConfirmPassword: (isVisible: boolean) => void;
  setPassword: (pass: string) => void;
  setShowPassword: (isVisible: boolean) => void;
};

const ResetPasswordFormInput = ({
  password,
  setPassword,
  setShowPassword,
  showPassword,
  isFormValid,
  isLoading,
  confirmPassword,
  passwordsMatch,
  setConfirmPassword,
  setShowConfirmPassword,
  showConfirmPassword,
  handleSubmit,
}: ResetPasswordFormInputProps) => {
  return (
    <form action={handleSubmit} className="space-y-4">
      <InputPassword
        password={password}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
      />

      <InputConfirmPassword
        confirmPassword={confirmPassword}
        passwordsMatch={passwordsMatch}
        setConfirmPassword={setConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        showConfirmPassword={showConfirmPassword}
      />

      <UpdateButton isLoading={isLoading} isFormValid={isFormValid} />

      <div className="text-center">
        <Link
          to="/login"
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Remember your password? Sign In
        </Link>
      </div>
    </form>
  );
};

export default ResetPasswordFormInput;
