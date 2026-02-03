import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './pages/routes';
import AppInitializer from './components/AppInitializer';

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />;
      <AppInitializer />
    </>
  );
};
export default App;
