import { Sparkles } from 'lucide-react';

const GreetingSection = () => {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="flex items-center justify-center mb-4">
        <Sparkles className="h-8 w-8 text-primary-foreground mr-2 animate-float" />
        <h1 className="text-3xl font-bold text-primary-foreground">
          Welcome Back
        </h1>
      </div>
      <p className="text-primary-foreground/80">Sign in to your account</p>
    </div>
  );
};

export default GreetingSection;
