import { toast } from '@/hooks/use-toast';
import { useUserStore } from '../store/useUserStore';
import useUpdateUserMutation from './useUpdateUserMutation';

const usePasswordProfile = () => {
  const handleUpdateUserPassword = () => {
    const { user, validate } = useUserStore((state) => ({
      validate: state.validate,
      user: state.user,
    }));

    if (!user) return;

    const { updateUserPassword } = useUpdateUserMutation();

    const result = validate();

    if (result.errors) {
      toast({ title: result.errors?.[0]?.message });
      console.log(result.errors);
      return;
    }
    const data = {
      newPassword: user.password,
      confirmPassword: user.passwordConfirm,
      currentPassword: user.currentPassword,
      email: user.email,
    };
    updateUserPassword(data);
  };

  return { handleUpdateUserPassword };
};

export default usePasswordProfile;
