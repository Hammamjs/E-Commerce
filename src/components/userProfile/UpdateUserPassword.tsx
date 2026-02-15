import type { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
import UpdatePasswordInputs from './UpdatePasswordInputs';
import type { UserInfo } from '@/types/User';

type UpdateUserPasswordProps = {
  changePass: boolean;
  showPassword: boolean;
  user: UserInfo;
  updateUser: (user: keyof Partial<UserInfo>, val: string) => void;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  setChangePass: Dispatch<SetStateAction<boolean>>;
  handleUpdateUserPassword: () => void;
};

const UpdateUserPassword = ({
  setChangePass,
  changePass,
  handleUpdateUserPassword,
  setShowPassword,
  showPassword,
  updateUser,
  user,
}: UpdateUserPasswordProps) => {
  return (
    <>
      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
        <div>
          <h4 className="font-medium">Change Password</h4>
          <p className="text-sm text-foreground/60">
            Update your account password
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setChangePass((prev) => !prev)}
        >
          {changePass ? 'Hide' : 'Change'}
        </Button>
      </div>
      <UpdatePasswordInputs
        changePass={changePass}
        handleUpdateUserPassword={handleUpdateUserPassword}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        updateUser={updateUser}
        user={user}
      />
    </>
  );
};

export default UpdateUserPassword;
