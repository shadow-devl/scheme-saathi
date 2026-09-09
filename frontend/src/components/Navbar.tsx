import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, LogOut, User, Globe, Eye } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [highContrast, setHighContrast] = useState(false);
  const [lang, setLang] = useState('EN');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin';
    if (user.role === 'PARTNER') return '/partner';
    return '/dashboard';
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 border-t-0 border-l-0 border-r-0 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-emerald-500/30 border border-emerald-500/20">
              <img src="./logo.jpg" alt="Avenik Core Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Avenik Core</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-300 hover:text-emerald-400 font-medium transition-colors">
              Home
            </Link>
            <Link to="/apply" className="text-gray-300 hover:text-emerald-400 font-medium transition-colors">
              {lang === 'EN' ? 'Find Schemes' : 'योजनाएं खोजें'}
            </Link>
            <Link to="/compare" className="text-gray-300 hover:text-emerald-400 font-medium transition-colors">Compare</Link>
            <Link to="/global-schemes" className="text-gray-300 hover:text-emerald-400 font-medium transition-colors">Global Gov</Link>
            <Link to="/investors" className="text-gray-300 hover:text-emerald-400 font-medium transition-colors flex items-center gap-1">
               Investors <span className="px-1.5 py-0.5 bg-emerald-500/20 border border-emerald-500/50 rounded-md text-[10px] text-emerald-300 font-bold tracking-wider">VC</span>
            </Link>
            
            {/* A11y & Localization Tools */}
            <div className="flex items-center gap-2 ml-2 border-l pl-4 border-white/10">
              <button 
                onClick={toggleHighContrast}
                className="p-1.5 text-gray-400 hover:bg-white/5 rounded-lg transition-colors"
                title="Toggle High Contrast"
              >
                <Eye className="w-5 h-5" />
              </button>
              <div className="relative group flex items-center">
                <Globe className="w-5 h-5 text-gray-400 mr-1" />
                <select 
                  className="bg-transparent text-sm text-gray-300 font-medium focus:outline-none cursor-pointer [&>option]:bg-gray-900"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value="EN">EN</option>
                  <option value="HI">HI</option>
                </select>
              </div>
            </div>

            {user ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                <Link to={getDashboardLink()} className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 font-medium">
                  <User className="h-4 w-4" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm font-medium">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="ml-4 px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 rounded-lg font-medium hover:bg-emerald-600/40 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

