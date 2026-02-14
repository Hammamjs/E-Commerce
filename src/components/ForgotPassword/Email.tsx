import EmailFormButtonStatus from './EmailFormButtonStatus';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import EmailSent from './EmailSent';

type EmailProps = {
  isEmailSent: boolean;
  isLoading: boolean;
  email: string;
  onClick: () => void;
};

const Email = ({ isEmailSent, isLoading, email, onClick }: EmailProps) => {
  return (
    <Card className="backdrop-blur-lg bg-card/80 border-border/50 shadow-glow animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          {isEmailSent ? 'Email Sent' : 'Reset Password'}
        </CardTitle>
        <CardDescription className="text-center">
          {isEmailSent
            ? 'Check your inbox for the reset link'
            : "We'll send you a link to reset your password"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEmailSent ? (
          <EmailSent email={email} onClick={onClick} />
        ) : (
          <EmailFormButtonStatus isLoading={isLoading} />
        )}
      </CardContent>
    </Card>
  );
};

export default Email;
