import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { Loader } from "@/components/ui/loader";
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import useLogin from '@/hooks/use-login';
import { Toaster } from 'sonner';

const Login = () => {
  const {
    email,
    handleSubmit,
    isLoading,
    setEmail,
    setPassword,
    setShowPassword,
    showPassword,
    password,
  } = useLogin();

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
              Welcome Back
            </h1>
          </div>
          <p className="text-primary-foreground/80">Sign in to your account</p>
        </div>

        <Card className="backdrop-blur-lg bg-card/80 border-border/50 shadow-glow animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
                <Link
                  to="/"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Return Home
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full relative overflow-hidden group transition-all duration-300 hover:shadow-glow"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    {/* <Loader size="sm" className="mr-2" /> */}
                    Signing in...
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Sign In</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                )}
              </Button>

              <div className="text-center">
                <span className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster position="top-left" richColors theme="dark" />
    </div>
  );
};

export default Login;
