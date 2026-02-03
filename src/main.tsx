import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const queyClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <QueryClientProvider client={queyClient}>
        <App />
      </QueryClientProvider>
    </TooltipProvider>
  </StrictMode>,
);
