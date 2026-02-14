import { Link } from 'react-router-dom';

const ForgotPasswordLink = () => {
  return (
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
  );
};

export default ForgotPasswordLink;
