import { type Ref } from 'react';
import SubmitButtonStatus from './SubmitButtonStatus';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

type Props = {
  handleSubmit: (e: React.FormEvent<Element>) => void;
  code: string;
  onChange: (e: string) => void;
  isLoading: boolean;
  otpRef: Ref<HTMLDivElement>;
};

const SubmissionForm = ({
  code,
  handleSubmit,
  isLoading,
  onChange,
  otpRef,
}: Props) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          value={code}
          onChange={(e) => onChange(e)}
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

      <SubmitButtonStatus codeLength={code.length} isLoading />
    </form>
  );
};

export default SubmissionForm;
