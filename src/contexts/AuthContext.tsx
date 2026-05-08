import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { toast } from 'sonner';

const API_BASE = '/api';
const DEV_AUTH_USER_KEY = 'dev_auth_user';

function createDevUser(email: string): User {
  const normalizedEmail = email.toLowerCase().trim() || 'demo@local.test';
  const stored = localStorage.getItem(DEV_AUTH_USER_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as User;
      if (parsed.email === normalizedEmail) return parsed;
    } catch {
      // ignore malformed dev data
    }
  }
  const user: User = {
    id: `dev-${normalizedEmail}`,
    email: normalizedEmail,
    name: normalizedEmail.split('@')[0] || 'Demo User',
    title: 'Dev Preview',
    institution: 'Local',
    role: normalizedEmail.includes('admin') ? 'admin' : 'user',
  };
  localStorage.setItem(DEV_AUTH_USER_KEY, JSON.stringify(user));
  return user;
}

function isDevToken(token: string) {
  return import.meta.env.DEV && token.startsWith('dev-token:');
}

// Fix #5 (SECURITY NOTE):
// JWT disimpan di localStorage agar sesi tetap ada setelah refresh halaman.
// Risiko: localStorage dapat dibaca JavaScript → rentan XSS.
// Mitigasi yang sudah diterapkan:
//   1. CSP headers di vercel.json mencegah injeksi script eksternal.
//   2. escapeHtml() di handlePrintReport mencegah stored XSS via laporan.
//   3. Token divalidasi ulang ke server setiap kali halaman di-mount.
//
// Solusi permanen (future work): Migrasi ke httpOnly cookie dari server.
// Cookie httpOnly tidak bisa diakses JavaScript sama sekali.

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
  // Fix #5: token disimpan di memory (state) sehingga tidak terbaca dari closure luar
  // localStorage HANYA dipakai untuk persistensi sesi lintas refresh halaman
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // Ref untuk menghindari double-validation di Strict Mode
  const validatingRef = useRef(false);
  const mountedRef = useRef(true);

  const isAdmin = user?.role === 'admin';

  // Validasi token ke server: pastikan token masih valid dan dapatkan user info terbaru
  const validateToken = async (token: string, signal?: AbortSignal) => {
    if (validatingRef.current) return;
    validatingRef.current = true;
    try {
      if (isDevToken(token)) {
        const email = token.replace('dev-token:', '');
        if (!mountedRef.current || signal?.aborted) return;
        setUser(createDevUser(email));
        setAccessToken(token);
        setLoading(false);
        return;
      }
      const res = await fetch(`${API_BASE}/auth?action=me`, {
        headers: { 'Authorization': `Bearer ${token}` },
        signal,
      });
      if (!res.ok) throw new Error('Token tidak valid atau sudah expire');
      const data = await res.json();
      if (!mountedRef.current || signal?.aborted) return;
      setUser(data.user);
      setAccessToken(token);
    } catch (error) {
      if ((error as Error).name === 'AbortError') return;
      console.error('[AUTH] Validasi token gagal:', error);
      // Token tidak valid — bersihkan semua state
      localStorage.removeItem('auth_token');
      if (!mountedRef.current) return;
      setAccessToken(null);
      setUser(null);
    } finally {
      if (mountedRef.current && !signal?.aborted) {
        setLoading(false);
      }
      validatingRef.current = false;
    }
  };

  // Mount: cek localStorage, validasi ke server jika ada token
  useEffect(() => {
    mountedRef.current = true;
    const controller = new AbortController();
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      // Token ada di localStorage, set ke memory dulu lalu validasi ke server
      setAccessToken(storedToken);
      validateToken(storedToken, controller.signal);
    } else {
      setLoading(false);
    }
    return () => {
      mountedRef.current = false;
      controller.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      if (import.meta.env.DEV && password.length > 0) {
        const user = createDevUser(email);
        const token = `dev-token:${user.email}`;
        localStorage.setItem('auth_token', token);
        setAccessToken(token);
        setUser(user);
        toast.success(`Dev preview login: ${user.name}`);
        return true;
      }
      const res = await fetch(`${API_BASE}/auth?action=signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Gagal masuk. Periksa email dan password Anda.');
        return false;
      }
      // Fix #5: simpan ke localStorage untuk persistensi, memory untuk runtime
      localStorage.setItem('auth_token', data.access_token);
      setAccessToken(data.access_token);
      setUser(data.user);
      toast.success(`Selamat datang, ${data.user.name}!`);
      return true;
    } catch (error: unknown) {
      console.error('[AUTH] Sign in error:', error);
      if (import.meta.env.DEV && password.length > 0) {
        const user = createDevUser(email);
        const token = `dev-token:${user.email}`;
        localStorage.setItem('auth_token', token);
        setAccessToken(token);
        setUser(user);
        toast.success(`Dev preview login: ${user.name}`);
        return true;
      }
      toast.error('Gagal masuk. Periksa koneksi internet Anda.');
      return false;
    }
  };

  const signUp = async (
    name: string, email: string, password: string, title?: string, institution?: string
  ): Promise<boolean> => {
    try {
      if (import.meta.env.DEV) {
        createDevUser(email);
        toast.success('Dev preview account created. Silakan masuk.');
        return true;
      }
      const res = await fetch(`${API_BASE}/auth?action=signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, title, institution }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Gagal membuat akun.');
        return false;
      }
      toast.success(data.message || 'Akun berhasil dibuat! Silakan masuk.');
      return true;
    } catch (error: unknown) {
      console.error('[AUTH] Sign up error:', error);
      toast.error('Gagal membuat akun. Periksa koneksi internet Anda.');
      return false;
    }
  };

  const signOut = () => {
    // Fix #5: hapus dari localStorage dan memory sekaligus
    localStorage.removeItem('auth_token');
    setAccessToken(null);
    setUser(null);
    toast.success('Berhasil keluar');
  };

  return (
    <AuthContext.Provider value={{ user, loading, accessToken, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
