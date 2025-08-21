import Layout from '@/components/Layout';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import RequireAuth from '@/components/RequireAuth';
import LayoutWithoutNav from '@/components/LayoutWithoutNav';
import AppWrapper from '@/components/AppWrapper';

// Public routes
const Index = lazy(() => import('@/pages/Index'));
const Products = lazy(() => import('@/pages/Products'));
const Categories = lazy(() => import('@/pages/Categories'));
const CodeVerification = lazy(() => import('@/pages/CodeVerification'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
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
    element: (
      <AppWrapper>
        <Layout />
      </AppWrapper>
    ),
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
    element: (
      <AppWrapper>
        <LayoutWithoutNav />
      </AppWrapper>
    ),
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

  // {
  //   element: <LayoutWithoutNav />,
  //   children: [
  //     {
  //       path: '/login',
  //       element: <Login />,
  //     },
  //     {
  //       path: '*',
  //       element: <NotFound />,
  //     },
  //   ],
  // },
];
