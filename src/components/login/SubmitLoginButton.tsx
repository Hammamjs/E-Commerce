import { Button } from '../ui/button';

type SubmitLoginButtonProps = {
  isLoading: boolean;
};

const SubmitLoginButton = ({ isLoading }: SubmitLoginButtonProps) => {
  return (
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
  );
};

export default SubmitLoginButton;
