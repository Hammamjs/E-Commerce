import Header from './Header';
import Footer from './Footer';
import { Toaster } from './ui/CustomToaster';
import { Outlet } from 'react-router-dom';
import ScrollTop from './ScrollTop';

const Layout = () => {
  return (
    <>
      <ScrollTop />
      <Header />
      <Outlet />
      <Toaster />
      <Footer />
    </>
  );
};

export default Layout;
