import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import { PathwaySessionsProvider } from './contexts/PathwaySessionsContext';

export default function App() {
  return (
    <AuthProvider>
      <PathwaySessionsProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </PathwaySessionsProvider>
    </AuthProvider>
  );
}