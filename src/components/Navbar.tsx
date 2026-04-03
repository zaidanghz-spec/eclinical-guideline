import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { AnimatePresence } from 'motion/react';
import {
  Activity,
  ClipboardList,
  AlertCircle,
  History,
  Home,
  User,
  LogOut,
  Menu,
  X,
  Shield,
  Mail
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, signOut, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const baseNavItems = [
    { to: '/home', label: 'Home', icon: Home },
    { to: '/pathways', label: 'Pathways', icon: ClipboardList },
    { to: '/emergency', label: 'Emergency', icon: AlertCircle },
    { to: '/history', label: 'History', icon: History },
  ];

  // Admin-only items (only shown if user is admin OR email is admin1@gmail.com)
  const adminNavItems = [
    { to: '/whitelist', label: 'Whitelist', icon: Mail, adminOnly: true },
  ];

  // Combine nav items based on user role
  const navItems = [
    ...baseNavItems,
    ...(isAdmin ? adminNavItems : [])
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-slate-900">Clinical Pathway</div>
              <div className="text-xs text-slate-500">Decision Support System</div>
            </div>
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  isActive(item.to)
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-semibold text-slate-900 flex items-center gap-2 justify-end">
                <span>
                  Dr. {user?.name}
                  {user?.title && <span className="text-teal-600">, {user.title}</span>}
                </span>
                {/* Admin Badge */}
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-sm">
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500">
                {user?.institution || user?.email}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isAdmin 
                  ? 'bg-gradient-to-br from-amber-100 to-orange-200'
                  : 'bg-gradient-to-br from-teal-100 to-teal-200'
              }`}>
                {isAdmin ? (
                  <Shield className="w-5 h-5 text-orange-700" />
                ) : (
                  <User className="w-5 h-5 text-teal-700" />
                )}
              </div>

              <button
                onClick={signOut}
                className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            title="Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <div className="md:hidden border-t border-slate-200 px-4 py-2">
            <div className="flex justify-around">
              {navItems.slice(0, 4).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                    isActive(item.to)
                      ? 'text-teal-600'
                      : 'text-slate-500'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}