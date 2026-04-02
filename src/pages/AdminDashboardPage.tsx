import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Shield,
  Mail,
  Building2,
  Calendar,
  ArrowLeft,
  RefreshCw,
  Trash2,
  Crown,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';

const API_BASE = '/api';

interface UserData {
  id: string;
  email: string;
  name: string;
  title: string;
  institution: string;
  role: string;
  createdAt?: string;
  created_at?: string;
}

export default function AdminDashboardPage() {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      navigate('/home', { replace: true });
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to fetch users');
      }

      setUsers(data.users || []);
    } catch (error: any) {
      console.error('Fetch users error:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  const toggleAdminRole = async (targetUser: UserData) => {
    if (targetUser.id === user?.id) {
      toast.error("You can't change your own role");
      return;
    }

    setProcessingId(targetUser.id);
    try {
      const res = await fetch(`${API_BASE}/admin?action=toggle-role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId: targetUser.id }),
      });
      const data = await res.json();

      if (!res.ok || data.error) throw new Error(data.error);

      toast.success(`${targetUser.name} is now ${data.user.role}`);
      await fetchUsers();
    } catch (error: any) {
      toast.error('Failed to update role');
    } finally {
      setProcessingId(null);
    }
  };

  const deleteUser = async (targetUser: UserData) => {
    if (targetUser.id === user?.id) {
      toast.error("You can't delete your own account");
      return;
    }

    if (!confirm(`Delete user ${targetUser.name} (${targetUser.email})?`)) return;

    setProcessingId(targetUser.id);
    try {
      const res = await fetch(`${API_BASE}/admin?action=delete-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId: targetUser.id }),
      });
      const data = await res.json();

      if (!res.ok || data.error) throw new Error(data.error);

      toast.success('User deleted');
      await fetchUsers();
    } catch (error: any) {
      toast.error('Failed to delete user');
    } finally {
      setProcessingId(null);
    }
  };

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    users: users.filter(u => u.role === 'user').length,
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-600">Manage users and access control</p>
              </div>
            </div>

            <button
              onClick={fetchUsers}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl hover:shadow-lg transition-all border border-slate-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Users</p>
                <p className="text-3xl text-slate-900">{stats.total}</p>
              </div>
              <Users className="w-10 h-10 text-slate-400" />
            </div>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 mb-1">Admins</p>
                <p className="text-3xl text-purple-900">{stats.admins}</p>
              </div>
              <Shield className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          <div className="bg-teal-50 rounded-2xl p-6 border border-teal-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-700 mb-1">Regular Users</p>
                <p className="text-3xl text-teal-900">{stats.users}</p>
              </div>
              <UserCheck className="w-10 h-10 text-teal-500" />
            </div>
          </div>
        </motion.div>

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {loading ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 mb-2">No users found</p>
              <p className="text-sm text-slate-500">Users will appear here after they sign up</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {users.map((userData, index) => (
                <motion.div
                  key={userData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        userData.role === 'admin'
                          ? 'bg-gradient-to-br from-purple-500 to-pink-600'
                          : 'bg-gradient-to-br from-teal-500 to-cyan-600'
                      }`}>
                        {userData.role === 'admin' ? (
                          <Shield className="w-6 h-6 text-white" />
                        ) : (
                          <Users className="w-6 h-6 text-white" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-slate-900">{userData.name}</h3>
                          {userData.role === 'admin' && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-lg">
                              ADMIN
                            </span>
                          )}
                          {userData.id === user?.id && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-lg">
                              YOU
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-4 h-4" />
                            <span>{userData.email}</span>
                          </div>
                          {userData.title && (
                            <div className="flex items-center gap-2 text-slate-600">
                              <UserCheck className="w-4 h-4" />
                              <span>{userData.title}</span>
                            </div>
                          )}
                          {userData.institution && (
                            <div className="flex items-center gap-2 text-slate-600">
                              <Building2 className="w-4 h-4" />
                              <span>{userData.institution}</span>
                            </div>
                          )}
                          {(userData.createdAt || userData.created_at) && (
                            <div className="flex items-center gap-2 text-slate-600">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(userData.createdAt || userData.created_at || '').toLocaleDateString('id-ID', {
                                day: 'numeric', month: 'short', year: 'numeric'
                              })}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {userData.id !== user?.id && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleAdminRole(userData)}
                          disabled={processingId === userData.id}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all disabled:opacity-50 ${
                            userData.role === 'admin'
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                          }`}
                          title={userData.role === 'admin' ? 'Remove admin' : 'Make admin'}
                        >
                          <Crown className="w-4 h-4" />
                          {userData.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </button>
                        <button
                          onClick={() => deleteUser(userData)}
                          disabled={processingId === userData.id}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm bg-red-100 text-red-700 hover:bg-red-200 transition-all disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
}
