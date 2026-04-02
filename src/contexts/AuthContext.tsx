import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

const API_BASE = '/api';

interface User {
  id: string;
  email: string;
  name: string;
  title?: string;
  institution?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  accessToken: string | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string, title?: string, institution?: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  accessToken: null,
  isAdmin: false,
  signIn: async () => false,
  signUp: async () => false,
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin';

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setAccessToken(token);
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error('Invalid token');
      }

      const data = await res.json();
      setUser(data.user);
      setAccessToken(token);
    } catch (error) {
      console.error('[AUTH] Token validation failed:', error);
      localStorage.removeItem('auth_token');
      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to sign in');
        return false;
      }

      // Save token
      localStorage.setItem('auth_token', data.access_token);
      setAccessToken(data.access_token);
      setUser(data.user);
      toast.success(`Welcome back, Dr. ${data.user.name}!`);
      return true;
    } catch (error: any) {
      console.error('[AUTH] Sign in error:', error);
      toast.error('Failed to sign in. Please try again.');
      return false;
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    title?: string,
    institution?: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, title, institution }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to create account');
        return false;
      }

      toast.success(data.message || 'Account created successfully!');
      return true;
    } catch (error: any) {
      console.error('[AUTH] Sign up error:', error);
      toast.error('Failed to create account. Please try again.');
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem('auth_token');
    setAccessToken(null);
    setUser(null);
    toast.success('Signed out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, accessToken, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
