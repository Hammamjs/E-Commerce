import { lazy } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import RequireAuth from '@/components/RequireAuth';

// Lazy layout

const Layout = lazy(() => import('@/components/Layout'));
const LayoutWithoutNav = lazy(() => import('@/components/LayoutWithoutNav'));

// Public routes
const Index = lazy(() => import('@/pages/Index'));
const Products = lazy(() => import('@/pages/Products'));
const Categories = lazy(() => import('@/pages/Categories'));
const CodeVerification = lazy(() => import('@/pages/CodeVerification'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const NewArrivals = lazy(() => import('@/pages/NewArrivals'));
const BestSellers = lazy(() => import('@/pages/BestSellers'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const Login = lazy(() => import('@/pages/Login'));
const AdminOrders = lazy(() => import('@/pages/AdminOrders'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Protected Routes
const PaymentFailed = lazy(() => import('@/pages/PaymentFailed'));
const PaymentSuccess = lazy(() => import('@/pages/PaymentSuccess'));
const Profile = lazy(() => import('@/pages/Profile'));
const Cart = lazy(() => import('@/pages/Cart'));
const Orders = lazy(() => import('@/pages/Orders'));
const EditProduct = lazy(() => import('@/pages/EditProduct'));
const Favorites = lazy(() => import('@/pages/Favorites'));
const AddProduct = lazy(() => import('@/pages/AddProduct'));
const AdminProducts = lazy(() => import('@/pages/AdminProducts'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/categories',
        element: <Categories />,
      },
      {
        path: '/product-details/:id',
        element: <ProductDetail />,
      },
      {
        path: '/new-arrivals',
        element: <NewArrivals />,
      },
      {
        path: '/best-sellers',
        element: <BestSellers />,
      },
    ],
  },

  // Public routes without nav

  {
    element: <LayoutWithoutNav />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/forgot-passowrd',
        element: <ForgotPassword />,
      },
      {
        path: '/code-verification',
        element: <CodeVerification />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
    ],
  },
  // Protected Routes

  {
    element: <Layout />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/dashboard/admin-orders',
            element: <AdminOrders />,
          },
          {
            path: '/profile',
            element: <Profile />,
          },
          {
            path: '/cart',
            element: <Cart />,
          },
          {
            path: '/orders',
            element: <Orders />,
          },
          {
            path: '/favorites',
            element: <Favorites />,
          },
          {
            path: '/add-product',
            element: <AddProduct />,
          },
          {
            path: '/edit-product/:id',
            element: <EditProduct />,
          },
          {
            path: '/dashboard/admin-products',
            element: <AdminProducts />,
          },
        ],
      },
    ],
  },

  {
    element: <LayoutWithoutNav />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/payment-success',
            element: <PaymentSuccess />,
          },
          {
            path: '/payment-failed',
            element: <PaymentFailed />,
          },
        ],
      },
    ],
  },
  // Catch not found pages *
  {
    path: '*',
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);
