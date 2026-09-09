import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Users, 
  Briefcase, 
  DollarSign, 
  ShoppingCart, 
  Cpu, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'CRM & Sales', href: '/dashboard/crm', icon: Users },
    { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
    { name: 'Finance', href: '/dashboard/finance', icon: DollarSign },
    { name: 'Store', href: '/dashboard/store', icon: ShoppingCart },
    { name: 'AI Workflows', href: '/dashboard/ai', icon: Cpu },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-gray-100 overflow-hidden relative">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-gray-900 border border-gray-700 rounded-md text-blue-400 hover:bg-gray-800"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed inset-y-0 left-0 z-40 w-64 glass-panel transition-transform duration-300 ease-in-out border-r border-t-0 border-b-0 border-l-0 flex flex-col`}
      >
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/50 group-hover:scale-110 transition-transform">
              <div className="absolute inset-0 bg-blue-400/20 blur-sm rounded-lg"></div>
              <span className="relative font-bold text-blue-400 text-xl">A</span>
            </div>
            <span className="text-xl font-bold tracking-wider text-gray-100 group-hover:text-blue-400 transition-colors">
              AVENIK
            </span>
          </Link>
          <div className="mt-8 mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Business Platform</p>
            <p className="text-sm font-medium text-blue-400 mt-1 truncate">
              {user?.name || 'Entrepreneur'}
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive 
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' 
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 border border-transparent'
                } group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon 
                  className={`${isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'} flex-shrink-0 mr-3 h-5 w-5 transition-colors`} 
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link
            to="/dashboard/business-profile"
            className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 transition-all mb-1"
          >
            <Briefcase className="text-gray-500 group-hover:text-gray-300 flex-shrink-0 mr-3 h-5 w-5 transition-colors" />
            Business Profile
          </Link>
          <Link
            to="/dashboard/settings"
            className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 transition-all mb-2"
          >
            <Settings className="text-gray-500 group-hover:text-gray-300 flex-shrink-0 mr-3 h-5 w-5 transition-colors" />
            Personal Settings
          </Link>
          <button
            onClick={() => {
              logout();
            }}
            className="w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent hover:border-red-500/30"
          >
            <LogOut className="text-red-400/50 group-hover:text-red-400 flex-shrink-0 mr-3 h-5 w-5 transition-colors" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden lg:pl-64">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8 z-10 relative">
          {children}
        </div>
      </main>
    </div>
  );
}
