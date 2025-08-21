import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, ArrowLeft, Sparkles, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Loader } from '@/components/ui/Loader';
import { Toaster } from '@/components/ui/sonner';
import useForgotPassowrd from '@/hooks/useForgotPassowrd';

const ForgotPassword = () => {
  const {
    email,
    handleSubmit,
    isEmailSent,
    isLoading,
    setEmail,
    setIsEmailSent,
  } = useForgotPassowrd();

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
              {isEmailSent ? 'Check Your Email' : 'Forgot Password'}
            </h1>
          </div>
          <p className="text-primary-foreground/80">
            {isEmailSent
              ? "We've sent you a password reset link"
              : 'Enter your email to reset your password'}
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-card/80 border-border/50 shadow-glow animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isEmailSent ? 'Email Sent' : 'Reset Password'}
            </CardTitle>
            <CardDescription className="text-center">
              {isEmailSent
                ? 'Check your inbox for the reset link'
                : "We'll send you a link to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEmailSent ? (
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500 animate-scale-in" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    We've sent a password reset link to:
                  </p>
                  <p className="font-medium text-foreground">{email}</p>
                </div>
                <div className="space-y-4">
                  <Link to="/code-verification">
                    <Button variant="ghost" className="w-full">
                      Verify code
                    </Button>
                  </Link>

                  <Button
                    onClick={() => {
                      setIsEmailSent(false);
                      setEmail('');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Send Another Email
                  </Button>

                  <Link to="/login">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="pl-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter the email address associated with your account
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full relative overflow-hidden group transition-all duration-300 hover:shadow-glow"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader size="sm" className="mr-2" />x Sending Reset
                      Link...
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">Send Reset Link</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Sign In
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
        <Toaster position="top-right" theme="dark" richColors />
      </div>
    </div>
  );
};

export default ForgotPassword;
