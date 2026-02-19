import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import ResetPasswordCompelete from './ResetPasswordCompelete';
import ResetPasswordFormInput from './ResetPasswordFormInput';

type ResetPasswordInputProps = {
  isPasswordReset: boolean;
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

const ResetPasswordInput = ({
  isPasswordReset,
  confirmPassword,
  handleSubmit,
  isFormValid,
  isLoading,
  password,
  passwordsMatch,
  setConfirmPassword,
  setPassword,
  setShowConfirmPassword,
  setShowPassword,
  showConfirmPassword,
  showPassword,
}: ResetPasswordInputProps) => {
  return (
    <Card className="backdrop-blur-lg bg-card/80 border-border/50 shadow-glow animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          {isPasswordReset ? 'Success!' : 'New Password'}
        </CardTitle>
        <CardDescription className="text-center">
          {isPasswordReset
            ? 'You can now sign in with your new password'
            : 'Enter your new password below'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPasswordReset ? (
          <ResetPasswordCompelete />
        ) : (
          <ResetPasswordFormInput
            confirmPassword={confirmPassword}
            handleSubmit={handleSubmit}
            isFormValid={isFormValid}
            isLoading={isLoading}
            password={password}
            passwordsMatch={passwordsMatch}
            setConfirmPassword={setConfirmPassword}
            setPassword={setPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            showPassword={showPassword}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ResetPasswordInput;
