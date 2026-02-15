import { Sparkles } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import AnimatedBackground from './AnimatedBackground';
import ResetPasswordCompelete from './ResetPasswordCompelete';
import ResetPasswordFormInput from './ResetPasswordFormInput';
import useResetPassowrd from '@/hooks/use-resetPassword';

const ResetPassword = () => {
  const {
    handleSubmit,
    isFormValid,
    isLoading,
    isPasswordReset,
    password,
    passwordsMatch,
    setConfirmPassword,
    setPassword,
    setShowConfirmPassword,
    setShowPassword,
    showConfirmPassword,
    showPassword,
    confirmPassword,
  } = useResetPassowrd();

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <AnimatedBackground />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary-foreground mr-2 animate-float" />
            <h1 className="text-3xl font-bold text-primary-foreground">
              {isPasswordReset ? 'Password Updated' : 'Reset Password'}
            </h1>
          </div>
          <p className="text-primary-foreground/80">
            {isPasswordReset
              ? 'Your password has been successfully updated'
              : 'Create a new password for your account'}
          </p>
        </div>

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
      </div>
    </div>
  );
};

export default ResetPassword;
