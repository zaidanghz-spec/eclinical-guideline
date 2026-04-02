import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { Shield, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is admin
  // PRIMARY: Check role === 'admin'
  // FALLBACK: Check email === 'admin1@gmail.com'
  const isAdmin = user.role === 'admin';

  if (!isAdmin) {
    // Show 403 Forbidden page instead of redirect
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/30 to-slate-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          {/* 403 Error Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-red-400/20 text-center">
            {/* Icon */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Shield className="w-20 h-20 text-red-400" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-10 h-10 text-red-500" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-2">403</h1>
            <h2 className="text-2xl font-semibold text-red-400 mb-4">
              Admin Access Required
            </h2>

            {/* Description */}
            <p className="text-slate-300 mb-6">
              This page is restricted to administrators only. You don't have permission to access this resource.
            </p>

            {/* User Info */}
            <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-400 mb-1">Signed in as:</p>
              <p className="text-white font-medium">{user.email}</p>
              <p className="text-xs text-slate-500 mt-1">Role: {user.role || 'user'}</p>
            </div>

            {/* Action Button */}
            <Link
              to="/home"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>

            {/* Help Text */}
            <p className="text-slate-500 text-sm mt-6">
              If you believe you should have access, please contact your system administrator.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
