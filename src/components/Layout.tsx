import Header from './Header';
import Footer from './Footer';
import { Toaster } from './ui/CustomToaster';
import { Outlet } from 'react-router-dom';
import ScrollTop from './ScrollTop';
import { Suspense } from 'react';
import { ProductLoader } from './ProductLoader';

const Layout = () => {
  return (
    <>
      <ScrollTop />
      <Header />
      <Suspense fallback={<ProductLoader />}>
        <Outlet />
      </Suspense>
      <Toaster />
      <Footer />
    </>
  );
};

export default Layout;
