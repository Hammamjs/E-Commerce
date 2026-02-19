import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/ui/button';

type EmailSentProps = {
  email: string;
  onClick: () => void;
};

const EmailSent = ({ email, onClick }: EmailSentProps) => {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500 animate-scale-in" />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          We've sent a password reset link to:
        </p>
        <p className="font-medium text-foreground">{email}</p>
      </div>
      <div className="space-y-4">
        <Link to="/code-verification">
          <Button variant="ghost" className="w-full">
            Verify code
          </Button>
        </Link>

        <Button onClick={onClick} variant="outline" className="w-full">
          Send Another Email
        </Button>

        <Link to="/login">
          <Button variant="ghost" className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmailSent;
