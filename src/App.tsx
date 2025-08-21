import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from './components/ErrorBoudary';
import { Suspense } from 'react';
import { ProductLoader } from './components/ProductLoader';
import { routes } from './pages/routes';

const router = createBrowserRouter(routes);

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
    <Suspense fallback={<ProductLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  </ErrorBoundary>
);

export default App;
