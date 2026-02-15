import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <div className="text-center">
      <span className="text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Sign up
        </Link>
      </span>
    </div>
  );
};

export default LoginFooter;
