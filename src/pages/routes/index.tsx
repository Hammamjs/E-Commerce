import { lazy } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import RequireAuth from '@/components/guard/RequireAuth';

// Lazy layout

const Layout = lazy(() => import('@/components/Layout'));
const LayoutWithoutNav = lazy(() => import('@/components/LayoutWithoutNav'));

// Public routes
const Index = lazy(() => import('@/pages/Index'));
const Products = lazy(() => import('@/pages/ProductsPage'));
const Categories = lazy(() => import('@/pages/CategoryPage'));
const CodeVerification = lazy(() => import('@/pages/CodeVerificationPage'));
const ResetPassword = lazy(() => import('@/pages/ResetPasswordPage'));
const NewArrivals = lazy(() => import('@/pages/NewArrivalsPage'));
const BestSellers = lazy(() => import('@/pages/BestSellersPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const SignUp = lazy(() => import('@/pages/SignupPage'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPasswordPage'));
const Login = lazy(() => import('@/pages/LoginPage'));
const AdminOrders = lazy(() => import('@/pages/AdminOrdersPage'));
const NotFound = lazy(() => import('@/pages/NotFoundPage'));

// Protected Routes
const PaymentFailed = lazy(() => import('@/pages/PaymentFailedPage'));
const PaymentSuccess = lazy(() => import('@/pages/PaymentSuccessPage'));
const Profile = lazy(() => import('@/pages/ProfilePage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const Orders = lazy(() => import('@/pages/OrdersPage'));
const EditProduct = lazy(() => import('@/pages/EditProductPage'));
const Favorites = lazy(() => import('@/pages/FavoritesPage'));
const AddProductPage = lazy(() => import('@/pages/AddProductPage'));
const AdminProductsPage = lazy(() => import('@/pages/AdminProductsPage'));

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
        element: <ProductDetailPage />,
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
            element: <CartPage />,
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
            element: <AddProductPage />,
          },
          {
            path: '/edit-product/:id',
            element: <EditProduct />,
          },
          {
            path: '/dashboard/admin-products',
            element: <AdminProductsPage />,
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
