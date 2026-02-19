import useForgotPassowrd from '../../hooks/forgotPassword/useForgotPassowrd';
import EmailForm from './EmailForm';
import { Sparkles } from 'lucide-react';
import { Toaster } from 'sonner';
import Email from './Email';

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

        <Email
          email={email}
          isEmailSent={isEmailSent}
          isLoading={isLoading}
          onClick={() => {
            setIsEmailSent(false);
            setEmail('');
          }}
        />

        <EmailForm
          email={email}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          setEmail={setEmail}
        />
        <Toaster position="top-right" theme="dark" richColors />
      </div>
    </div>
  );
};

export default ForgotPassword;
