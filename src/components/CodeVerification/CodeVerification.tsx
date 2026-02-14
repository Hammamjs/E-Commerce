import useCodeVerification from '@/hooks/use-codeVerification';
import ResendCodeButton from './ResendCodeButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Link } from 'react-router-dom';
import SubmissionForm from './SubmissionForm';

type Props = {};

const CodeVerification = ({}: Props) => {
  const {
    otpRef,
    code,
    handleResendCode,
    handleSubmit,
    isCodeSent,
    isLoading,
    setCode,
  } = useCodeVerification();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-card/95 border-border/50 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Enter Verification Code
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Please enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>

        <SubmissionForm
          code={code}
          handleSubmit={(e) => handleSubmit(e)}
          isLoading
          otpRef={otpRef}
          onChange={setCode}
        />

        <CardContent className="space-y-6">
          <ResendCodeButton
            isCodeSent={isCodeSent}
            isLoading={isLoading}
            onClick={handleResendCode}
          />

          <div className="text-center pt-4 border-t border-border/50">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeVerification;
