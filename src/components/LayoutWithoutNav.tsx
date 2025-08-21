import { Outlet } from 'react-router-dom';
import { Toaster } from './ui/CustomToaster';

const LayoutWithoutNav = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default LayoutWithoutNav;
