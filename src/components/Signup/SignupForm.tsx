import type { UserInfo } from '@/types/User';
import SignupFormFields from './SignupFormFields';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

type UserFields = {
  [K in keyof UserInfo]: UserInfo[K] extends string ? K : never;
}[keyof UserInfo];

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupFormProps = {
  formData: FormData;
  showPassword: boolean;
  showConfirmedPassword: boolean;
  isLoading: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (field: UserFields, value: string) => void;
  handleSubmit: () => void;
};

const SignupForm = ({
  isLoading,
  formData,
  handleInputChange,
  setShowConfirmPassword,
  setShowPassword,
  showConfirmedPassword,
  showPassword,
  handleSubmit,
}: SignupFormProps) => {
  return (
    <Card className="backdrop-blur-lg bg-card/80 border-border/50 shadow-glow animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          Fill in your information to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <SignupFormFields
            formData={formData}
            handleInputChange={handleInputChange}
            setShowConfirmPassword={setShowConfirmPassword}
            setShowPassword={setShowPassword}
            showConfirmedPassword={showConfirmedPassword}
            showPassword={showPassword}
          />
          <Button
            type="submit"
            className="w-full relative overflow-hidden group transition-all duration-300 hover:shadow-glow"
            disabled={
              isLoading || formData.password !== formData.confirmPassword
            }
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                {/* <Loader size="sm" className="mr-2" /> */}
                Creating your account...
              </div>
            ) : (
              <>
                <span className="relative z-10">Create Account</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </>
            )}
          </Button>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
