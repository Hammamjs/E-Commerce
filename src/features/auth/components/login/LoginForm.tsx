import { type Dispatch, type SetStateAction } from 'react';

import PasswordInput from './PasswordInput';
import SubmitLoginButton from './SubmitLoginButton';
import LoginFooter from '../../components/login/LoginFooter';
import ForgotPasswordLink from './ForgotPasswordLink';
import EmailInput from './EmailInput';

type LoginFormProps = {
  handleSubmit: (form: FormData) => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setShowPassword: (isVisible: boolean) => void;
  showPassword: boolean;
  isLoading: boolean;
};

const LoginForm = ({
  email,
  handleSubmit,
  isLoading,
  password,
  setEmail,
  setPassword,
  setShowPassword,
  showPassword,
}: LoginFormProps) => {
  return (
    <form action={handleSubmit} className="space-y-4">
      <EmailInput email={email} setEmail={setEmail} />

      <PasswordInput
        password={password}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
      />

      <ForgotPasswordLink />

      <SubmitLoginButton isLoading={isLoading} />

      <LoginFooter />
    </form>
  );
};

export default LoginForm;
