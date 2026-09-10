import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Book, Shield, Lock, FileText, UserCheck, AlertTriangle } from 'lucide-react';

const legalLinks = [
  { path: '/legal', name: 'Legal Center Home', icon: <Book className="w-4 h-4 mr-2" /> },
  { path: '/legal/terms', name: 'Terms of Service', icon: <FileText className="w-4 h-4 mr-2" /> },
  { path: '/legal/privacy', name: 'Privacy Policy', icon: <Lock className="w-4 h-4 mr-2" /> },
  { path: '/legal/cookies', name: 'Cookie Policy', icon: <AlertTriangle className="w-4 h-4 mr-2" /> },
  { path: '/legal/acceptable-use', name: 'Acceptable Use', icon: <UserCheck className="w-4 h-4 mr-2" /> },
  { path: '/legal/security', name: 'Security & Trust', icon: <Shield className="w-4 h-4 mr-2" /> },
];

export default function LegalLayout({ children, title, lastUpdated }: { children: ReactNode, title: string, lastUpdated: string }) {
  const location = useLocation();

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-12 pt-24 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-72 flex-shrink-0">
          <div className="glass-panel p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Scheme Saathi Legal
            </h2>
            <nav className="flex flex-col space-y-2">
              {legalLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center p-2 rounded-lg transition-colors text-sm font-medium ${
                      isActive 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'text-text-muted hover:bg-white/5 hover:text-text-base'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-text-muted mb-2">Need help with legal inquiries?</p>
              <a href="mailto:legal@schemesaathi.com" className="text-sm text-primary hover:underline block">legal@schemesaathi.com</a>
              <a href="mailto:privacy@schemesaathi.com" className="text-sm text-primary hover:underline block">privacy@schemesaathi.com</a>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
          <div className="glass-panel p-8 md:p-12">
            <header className="mb-8 pb-8 border-b border-white/10">
              <h1 className="text-3xl md:text-4xl font-bold text-text-base mb-4">{title}</h1>
              <p className="text-sm text-text-muted">
                Effective Date: <span className="text-text-base">{lastUpdated}</span>
              </p>
            </header>
            
            <div className="prose dark:prose-invert prose-blue max-w-none text-slate-700">
              {children}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
