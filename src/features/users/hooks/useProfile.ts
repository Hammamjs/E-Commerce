import { useUserStore } from '@/features/users/store/useUserStore';
import type { UserInfo } from '@/features/users/types/User';
import { addToLocalstorage } from '@/shared/utils/LocalStorage';
import { toast } from '@/hooks/use-toast';
import { useShallow } from 'zustand/shallow';
import { staticEndpoint } from '@/api/BaseUrl';
import useProfileImage from './useProfileImage';
import usePasswordProfile from './usePasswordProfile';

const useProfile = () => {
  const { user, updateUser, setUser } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      updateUser: state.updateUser,
      setUser: state.setUser,
    })),
  );

  const { handleUpdateUserPassword } = usePasswordProfile();

  const handleUserUpdate = (user: UserInfo) => {
    setUser(user);
    addToLocalstorage('user', user);

    toast({
      title: 'Image change successfully',
      type: 'success',
    });
  };

  const { handleOnImageChange } = useProfileImage({
    userId: user?._id ?? '',
    onUserUpdated: handleUserUpdate,
  });

  return {
    handleOnImageChange,
    handleUpdateUserPassword,
    updateUser,
    user,
    staticEndpoint,
  };
};

export default useProfile;
