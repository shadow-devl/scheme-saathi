import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Globe, Eye, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [highContrast, setHighContrast] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.findSchemes'), path: '/apply' },
    { name: t('nav.compare'), path: '/compare' },
    { name: t('nav.globalGov'), path: '/global-schemes' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-slate-200/50' 
        : 'bg-white border-b border-slate-200/80'
    }`}>
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20 border border-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Scheme Saathi Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
              Scheme Saathi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-base font-semibold transition-all duration-200 hover:text-blue-600 ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link to="/investors" className="text-slate-600 hover:text-blue-600 text-base font-semibold transition-all duration-200 flex items-center gap-2 group">
               {t('nav.investors')} 
               <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 rounded text-xs text-blue-600 font-bold tracking-wider group-hover:bg-blue-100 transition-colors">
                 VC
               </span>
            </Link>
            
            <div className="h-8 w-px bg-slate-200 mx-2"></div>

            {/* Desktop Tools */}
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleHighContrast}
                className={`p-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 font-medium ${
                  highContrast 
                    ? 'text-blue-700 bg-blue-100 hover:bg-blue-200' 
                    : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                }`}
                title="Toggle High Contrast"
                aria-label="Toggle High Contrast Mode"
              >
                <Eye className="w-5 h-5" />
              </button>
              
              <div className="relative group flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 hover:border-slate-300 transition-colors">
                <Globe className="w-5 h-5 text-slate-500 mr-2" />
                <select 
                  className="bg-transparent text-sm text-slate-700 font-bold focus:outline-none cursor-pointer"
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  aria-label="Select Language"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                  <option value="mr">मराठी</option>
                  <option value="ta">தமிழ்</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200 mx-2"></div>

            {/* Desktop Auth */}
            {user ? (
              <div className="flex items-center gap-5">
                <Link to={getDashboardLink()} className="flex items-center gap-2 text-slate-700 hover:text-blue-600 text-base font-bold transition-colors">
                  <User className="h-5 w-5" /> {t('nav.dashboard')}
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-slate-600 hover:text-red-600 text-base font-semibold transition-colors">
                  <LogOut className="h-5 w-5" /> {t('nav.logout')}
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-base font-bold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-blue-500/25 active:scale-95">
                {t('nav.login')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button 
              onClick={toggleHighContrast}
              className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
                highContrast 
                  ? 'text-blue-700 bg-blue-100' 
                  : 'text-slate-600 bg-slate-100'
              }`}
              aria-label="Toggle High Contrast Mode"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-200 bg-white ${
          isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 border-transparent'
        }`}
      >
        <div className="px-4 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-lg font-semibold px-3 py-3 rounded-xl transition-colors ${
                location.pathname === link.path ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link to="/investors" className="text-lg font-semibold px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center justify-between">
            <span>{t('nav.investors')}</span>
            <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 rounded text-xs text-blue-600 font-bold tracking-wider">
              VC
            </span>
          </Link>

          <div className="h-px bg-slate-200 my-2"></div>

          <div className="flex items-center justify-between px-3 py-3">
            <span className="text-slate-700 text-lg font-semibold">{t('nav.language')}</span>
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <Globe className="w-5 h-5 text-slate-500 mr-2" />
              <select 
                className="bg-transparent text-base text-slate-700 font-bold focus:outline-none cursor-pointer"
                value={i18n.language}
                onChange={handleLanguageChange}
                aria-label="Select Language"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="mr">मराठी</option>
                <option value="ta">தமிழ்</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>

          <div className="h-px bg-slate-200 my-2"></div>

          {user ? (
            <div className="flex flex-col gap-3">
              <Link to={getDashboardLink()} className="flex items-center gap-3 px-3 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 text-lg font-bold rounded-xl transition-colors">
                <User className="w-6 h-6" /> {t('nav.dashboard')}
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 text-lg font-bold rounded-xl transition-colors text-left w-full">
                <LogOut className="w-6 h-6" /> {t('nav.logout')}
              </button>
            </div>
          ) : (
            <Link to="/login" className="mt-4 text-center w-full px-6 py-4 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-700 transition-colors shadow-sm">
              {t('nav.login')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
