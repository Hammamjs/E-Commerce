import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const ResetPasswordCompelete = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500 animate-scale-in" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Your password has been successfully reset.
        </p>
        <p className="text-sm text-muted-foreground">
          You can now sign in with your new password.
        </p>
      </div>
      <Link to="/login">
        <Button className="w-full">Continue to Sign In</Button>
      </Link>
    </div>
  );
};

export default ResetPasswordCompelete;
