import { useUserStore } from '@/stores/user/useUserStore';
import { useShallow } from 'zustand/shallow';

const useRequireUser = () => {
  const userId = useUserStore(useShallow((state) => state.user?._id));

  const requireUser = () => {
    if (!userId) return false;
    return true;
  };

  return { requireUser, userId };
};

export default useRequireUser;
