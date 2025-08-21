import { Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { Loader } from '@/components/ui/loader';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Check } from 'lucide-react';
import useSignup from '@/hooks/use-signup';

const SignUp = () => {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    isLoading,
    passwordRequirements,
    setShowConfirmPassword,
    setShowPassword,
    showConfirmPassword,
    showPassword,
  } = useSignup();

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-accent/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '3s' }}
        ></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary-foreground mr-2 animate-float" />
            <h1 className="text-3xl font-bold text-primary-foreground">
              Join Us
            </h1>
          </div>
          <p className="text-primary-foreground/80">
            Create your account and start your journey
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-card/80 border-border/50 shadow-glow animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create Account
            </CardTitle>
            <CardDescription className="text-center">
              Fill in your information to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    UserName
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="John"
                      className="pl-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange('username', e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="pl-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
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
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
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
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div
                        key={index}
                        className={`flex items-center text-xs transition-colors duration-200 ${
                          req.met ? 'text-green-500' : 'text-muted-foreground'
                        }`}
                      >
                        <Check
                          className={`h-3 w-3 mr-2 transition-opacity duration-200 ${
                            req.met ? 'opacity-100' : 'opacity-30'
                          }`}
                        />
                        {req.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange('confirmPassword', e.target.value)
                    }
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
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-destructive">
                      Passwords do not match
                    </p>
                  )}
              </div>

              <Button
                type="submit"
                className="w-full relative overflow-hidden group transition-all duration-300 hover:shadow-glow"
                disabled={
                  isLoading || formData.password !== formData.confirmPassword
                }
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    {/* <Loader size="sm" className="mr-2" /> */}
                    Creating your account...
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Create Account</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                )}
              </Button>

              <div className="text-center">
                <span className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster position="top-left" richColors />
    </div>
  );
};

export default SignUp;
