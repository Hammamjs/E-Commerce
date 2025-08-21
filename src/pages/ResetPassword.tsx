import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader } from '@/components/ui/Loader';
import { Lock, Eye, EyeOff, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

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
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500 animate-scale-in" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Your password has been successfully reset.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You can now sign in with your new password.
                  </p>
                </div>
                <Link to="/login">
                  <Button className="w-full">Continue to Sign In</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                        confirmPassword && !passwordsMatch
                          ? 'border-destructive'
                          : ''
                      }`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                    <p className="text-xs text-destructive">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full relative overflow-hidden group transition-all duration-300 hover:shadow-glow"
                  disabled={isLoading || !isFormValid}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader size="sm" className="mr-2" />
                      Updating Password...
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">Update Password</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Remember your password? Sign In
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
