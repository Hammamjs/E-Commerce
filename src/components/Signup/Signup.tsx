import useSignup from '@/hooks/SignupHooks/use-signup';
import AnimatedBackground from './AnimatedBackground';
import { Toaster } from 'sonner';
import SignupForm from './SignupForm';
import { Sparkles } from 'lucide-react';

const Signup = () => {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    isLoading,
    setShowConfirmPassword,
    setShowPassword,
    showConfirmPassword,
    showPassword,
  } = useSignup();

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <AnimatedBackground />

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
        <SignupForm
          formData={formData}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setShowConfirmPassword={setShowConfirmPassword}
          setShowPassword={setShowPassword}
          showConfirmedPassword={showConfirmPassword}
          showPassword={showPassword}
        />
      </div>
      <Toaster position="top-left" richColors />
    </div>
  );
};

export default Signup;
