import { Loader } from 'lucide-react';

type Props = {
  isLoading: boolean;
};

const EmailFormButtonStatus = ({ isLoading }: Props) => {
  return isLoading ? (
    <div className="flex items-center justify-center">
      <Loader size="sm" className="mr-2" />x Sending Reset Link...
    </div>
  ) : (
    <>
      <span className="relative z-10">Send Reset Link</span>
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </>
  );
};

export default EmailFormButtonStatus;
