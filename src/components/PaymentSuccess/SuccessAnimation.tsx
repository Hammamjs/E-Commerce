import { CheckCircle, Sparkles } from 'lucide-react';

type SuccessAnimationProps = {
  showConfetti: boolean;
};

const SuccessAnimation = ({ showConfetti }: SuccessAnimationProps) => {
  return (
    <div className="text-center mb-8 relative">
      <div className="relative inline-block">
        <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        {showConfetti && (
          <div className="absolute -top-4 -right-4">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
        )}
      </div>

      <h1 className="text-4xl font-bold text-foreground mb-2 animate-fade-in">
        Payment Successful! 🎉
      </h1>
      <p className="text-xl text-muted-foreground">
        Thank you for your purchase. Your order has been confirmed!
      </p>
    </div>
  );
};

export default SuccessAnimation;
