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
    <nav className="bg-white sticky top-0 z-50 border-t-0 border-l-0 border-r-0 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/30 border border-blue-500/20">
              <img src="./logo.jpg" alt="Scheme Saathi Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold text-text-base tracking-tight">Scheme Saathi</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-text-muted hover:text-blue-400 font-medium transition-colors">
              Home
            </Link>
            <Link to="/apply" className="text-text-muted hover:text-blue-400 font-medium transition-colors">
              {lang === 'EN' ? 'Find Schemes' : 'योजनाएं खोजें'}
            </Link>
            <Link to="/compare" className="text-text-muted hover:text-blue-400 font-medium transition-colors">Compare</Link>
            <Link to="/global-schemes" className="text-text-muted hover:text-blue-400 font-medium transition-colors">Global Gov</Link>
            <Link to="/investors" className="text-text-muted hover:text-blue-400 font-medium transition-colors flex items-center gap-1">
               Investors <span className="px-1.5 py-0.5 bg-blue-500/20 border border-blue-500/50 rounded-md text-[10px] text-blue-300 font-bold tracking-wider">VC</span>
            </Link>
            
            {/* A11y & Localization Tools */}
            <div className="flex items-center gap-2 ml-2 border-l pl-4 border-slate-200">
              <button 
                onClick={toggleHighContrast}
                className="p-1.5 text-text-muted hover:bg-slate-100 rounded-lg transition-colors"
                title="Toggle High Contrast"
              >
                <Eye className="w-5 h-5" />
              </button>
              <div className="relative group flex items-center">
                <Globe className="w-5 h-5 text-text-muted mr-1" />
                <select 
                  className="bg-transparent text-sm text-text-muted font-medium focus:outline-none cursor-pointer [&>option]:bg-white shadow-card rounded-[17px] border border-border-subtle"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value="EN">EN</option>
                  <option value="HI">HI</option>
                </select>
              </div>
            </div>

            {user ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
                <Link to={getDashboardLink()} className="flex items-center gap-2 text-text-muted hover:text-blue-600 font-medium">
                  <User className="h-4 w-4" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-text-muted hover:text-red-500 text-sm font-medium">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="ml-4 px-4 py-2 bg-blue-600 border border-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

