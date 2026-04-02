import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-slate-300 mb-4">404</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Halaman Tidak Ditemukan</h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak ditemukan. 
          Mungkin pathway telah dipindahkan atau URL salah.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            Kembali ke Home
          </Link>
          <Link
            to="/organ-system"
            className="inline-flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            <Search className="w-5 h-5" />
            Cari Penyakit
          </Link>
        </div>
      </div>
    </div>
  );
}
