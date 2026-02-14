import { Loader } from 'lucide-react';
import { Button } from '../ui/button';

type SubmitButtonStatusProps = {
  isLoading: boolean;
  codeLength: number;
};

const SubmitButtonStatus = ({
  isLoading,
  codeLength,
}: SubmitButtonStatusProps) => {
  return (
    <Button
      type="submit"
      className="w-full relative overflow-hidden group"
      disabled={isLoading || codeLength !== 6}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transition-transform group-hover:scale-105"></div>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader size="sm" />
            Verifying...
          </>
        ) : (
          'Verify Code'
        )}
      </span>
    </Button>
  );
};

export default SubmitButtonStatus;
