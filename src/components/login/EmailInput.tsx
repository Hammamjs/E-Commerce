import { Mail } from 'lucide-react';
import { Input } from '../ui/input';
import type { Dispatch, SetStateAction } from 'react';

type EmailInputProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

const EmailInput = ({ email, setEmail }: EmailInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Email</label>
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Enter your email"
          className="pl-10 transition-all duration-300 focus:shadow-primary/25 focus:shadow-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default EmailInput;
