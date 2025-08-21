import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Loader } from '@/components/ui/Loader';
import useCodeVerification from '@/hooks/use-codeVerification';

const CodeVerification = () => {
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

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => setCode(value)}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} ref={otpRef} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              className="w-full relative overflow-hidden group"
              disabled={isLoading || code.length !== 6}
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
          </form>

          <div className="text-center space-y-4">
            <div className="text-sm text-muted-foreground">
              Didn't receive the code?
            </div>

            <Button
              variant="ghost"
              onClick={handleResendCode}
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
