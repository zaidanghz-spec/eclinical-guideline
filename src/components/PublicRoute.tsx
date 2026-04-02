import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { user, loading } = useAuth();

  console.log('🌐 PublicRoute check:', { 
    user: user ? { email: user.email, name: user.name } : null, 
    loading,
    userExists: !!user 
  });

  if (loading) {
    console.log('⏳ [PublicRoute] Loading...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-teal-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    console.log('✅ [PublicRoute] User already logged in, redirecting to /home');
    console.log('👤 [PublicRoute] User details:', { 
      email: user.email, 
      name: user.name
    });
    return <Navigate to="/home" replace />;
  }

  console.log('ℹ️ [PublicRoute] No user, showing public page');
  return <>{children}</>;
}