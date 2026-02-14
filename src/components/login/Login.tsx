import { Toaster } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import AnimatedBackground from './AnimatedBackground';
import GreetingSection from './GreetingSection';
import LoginForm from './LoginForm';
import useLogin from '@/hooks/use-login';

const Login = () => {
  const {
    email,
    handleSubmit,
    isLoading,
    setEmail,
    setPassword,
    setShowPassword,
    showPassword,
    password,
  } = useLogin();

  return (
    <AnimatedBackground>
      <div className="w-full max-w-md relative z-10">
        <GreetingSection />

        <Card className="backdrop-blur-lg bg-card/80 border-border/50 shadow-glow animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm
              email={email}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
            />
          </CardContent>
        </Card>
      </div>
      <Toaster position="top-left" richColors theme="dark" />
    </AnimatedBackground>
  );
};

export default Login;
