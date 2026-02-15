import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import EmailFormButtonStatus from './EmailFormButtonStatus';
import { ArrowLeft, Mail } from 'lucide-react';
import { Input } from '../ui/input';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  handleSubmit: (e: FormData) => Promise<void>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
};

const EmailForm = ({ handleSubmit, email, setEmail, isLoading }: Props) => {
  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email address"
            className="pl-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Enter the email address associated with your account
        </p>
      </div>

      <Button
        type="submit"
        className="w-full relative overflow-hidden group transition-all duration-300 hover:shadow-glow"
        disabled={isLoading}
      >
        <EmailFormButtonStatus isLoading={isLoading} />
      </Button>

      <div className="text-center">
        <Link
          to="/login"
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Sign In
        </Link>
      </div>
    </form>
  );
};

export default EmailForm;
