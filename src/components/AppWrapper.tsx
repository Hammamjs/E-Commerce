import { Suspense, type ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from './ErrorBoudary';
import { ProductLoader } from './ProductLoader';
import AppInitializer from './AppInitializer';

const AppWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <Suspense fallback={<ProductLoader />}>
          {children}
          <AppInitializer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default AppWrapper;
