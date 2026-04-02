import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { Mail, Plus, Trash2, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

const API_BASE = '/api';

interface WhitelistEntry {
  email: string;
  addedAt?: string;
}

export function WhitelistPage() {
  const { accessToken } = useAuth();
  const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadWhitelist();
  }, []);

  const loadWhitelist = async () => {
    try {
      const res = await fetch(`${API_BASE}/whitelist`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await res.json();

      if (data.whitelist && Array.isArray(data.whitelist)) {
        setWhitelist(data.whitelist.map((item: any) =>
          typeof item === 'string' ? { email: item, addedAt: '' } : item
        ));
      } else {
        setWhitelist([]);
      }
    } catch (error: any) {
      console.error('Failed to load whitelist:', error);
      toast.error('Failed to load whitelist');
      setWhitelist([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newEmail) {
      toast.error('Please enter an email address');
      return;
    }

    if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setAdding(true);

    try {
      const normalizedEmail = newEmail.toLowerCase().trim();

      const exists = whitelist.some(w => w.email === normalizedEmail);
      if (exists) {
        toast.error('Email already in whitelist');
        setAdding(false);
        return;
      }

      const res = await fetch(`${API_BASE}/whitelist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        toast.error('Failed to add email: ' + (data.error || 'Unknown error'));
        return;
      }

      if (data.whitelist && Array.isArray(data.whitelist)) {
        setWhitelist(data.whitelist.map((item: any) =>
          typeof item === 'string' ? { email: item, addedAt: '' } : item
        ));
      }
      setNewEmail('');
      toast.success('Email added to whitelist!');
    } catch (error: any) {
      console.error('Failed to add email:', error);
      toast.error('Failed to add email');
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveEmail = async (entry: WhitelistEntry) => {
    try {
      const res = await fetch(`${API_BASE}/whitelist/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ email: entry.email }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        toast.error('Failed to remove email: ' + (data.error || 'Unknown error'));
        return;
      }

      if (data.whitelist && Array.isArray(data.whitelist)) {
        setWhitelist(data.whitelist.map((item: any) =>
          typeof item === 'string' ? { email: item, addedAt: '' } : item
        ));
      }
      toast.success('Email removed from whitelist');
    } catch (error: any) {
      console.error('Failed to remove email:', error);
      toast.error('Failed to remove email');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      <Navbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-teal-400" />
            </div>
            <h1 className="text-4xl text-white mb-4">
              Email Whitelist Management
            </h1>
            <p className="text-slate-300 text-lg">
              Only whitelisted emails can create accounts
            </p>
          </motion.div>

          {/* Add Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-teal-400/20"
          >
            <h2 className="text-2xl text-white mb-6 flex items-center gap-2">
              <Plus className="w-6 h-6 text-teal-400" />
              Add Email to Whitelist
            </h2>

            <form onSubmit={handleAddEmail} className="flex gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="doctor@hospital.com"
                  className="w-full px-4 py-3 bg-white/5 border border-teal-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  disabled={adding}
                />
              </div>
              <button
                type="submit"
                disabled={adding}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {adding ? 'Adding...' : 'Add'}
              </button>
            </form>
          </motion.div>

          {/* Whitelist Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-teal-400/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white flex items-center gap-2">
                <Mail className="w-6 h-6 text-teal-400" />
                Whitelisted Emails
              </h2>
              <div className="flex items-center gap-2 bg-teal-500/20 px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-teal-400" />
                <span className="text-teal-400">
                  {whitelist.length} {whitelist.length === 1 ? 'email' : 'emails'}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-400">Loading whitelist...</p>
              </div>
            ) : whitelist.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">
                  No emails in whitelist yet
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Add emails above to allow users to sign up
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {whitelist.map((entry, index) => (
                  <motion.div
                    key={entry.email}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between bg-white/5 border border-teal-400/20 rounded-lg p-4 group hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-teal-500/20 rounded-lg">
                        <Mail className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <span className="text-white">{entry.email}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveEmail(entry)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      title="Remove from whitelist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-teal-500/10 border border-teal-400/30 rounded-xl p-6"
          >
            <h3 className="text-lg text-teal-400 mb-3">
              How it works:
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                <span>Add authorized email addresses to the whitelist</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                <span>Only whitelisted emails can create accounts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                <span>No approval needed - accounts are instantly active</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                <span>Remove emails anytime to revoke signup access</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
