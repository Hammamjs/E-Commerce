import { Button } from '../ui/button';
import UpdatePassword from './UpdatePassword';
import UpdatingStatus from './UpdatingStatus';

type UpdateButtonProps = {
  isLoading: boolean;
  isFormValid: boolean;
};

const UpdateButton = ({ isFormValid, isLoading }: UpdateButtonProps) => {
  return (
    <Button
      type="submit"
      className="w-full relative overflow-hidden group transition-all duration-300 hover:shadow-glow"
      disabled={isLoading || !isFormValid}
    >
      {isLoading ? <UpdatingStatus /> : <UpdatePassword />}
    </Button>
  );
};

export default UpdateButton;
