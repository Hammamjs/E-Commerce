import { useUserStore } from '@/stores/useUserStore';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

const RequireAuth = () => {
  const location = useLocation();

  const user = useUserStore(useShallow((state) => state.user));
  return user?.username ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default RequireAuth;
