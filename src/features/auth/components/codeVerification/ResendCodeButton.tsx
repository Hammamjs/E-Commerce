import { Button } from '../../../../components/ui/button';

type ResendCodeButtonProps = {
  onClick: () => void;
  isLoading: boolean;
  isCodeSent: boolean;
};

const ResendCodeButton = ({
  isCodeSent,
  isLoading,
  onClick,
}: ResendCodeButtonProps) => {
  return (
    <div className="text-center space-y-4">
      <div className="text-sm text-muted-foreground">
        Didn't receive the code?
      </div>

      <Button
        variant="ghost"
        onClick={onClick}
        disabled={isLoading || isCodeSent}
        className="text-primary hover:text-primary/80 hover:bg-primary/10"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            {/* <Loader size="sm" /> */}
            Sending...
          </div>
        ) : isCodeSent ? (
          'Code Sent!'
        ) : (
          'Resend Code'
        )}
      </Button>
    </div>
  );
};

export default ResendCodeButton;
