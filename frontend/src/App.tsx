import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import IntakeForm from './pages/IntakeForm';
import Results from './pages/Results';
import Login from './pages/Login';
import DashboardHome from './pages/DashboardHome';
import Settings from './pages/Settings';
import BusinessProfile from './pages/BusinessProfile';
import CRM from './pages/CRM';
import Projects from './pages/Projects';
import Finance from './pages/Finance';
import Store from './pages/Store';
import AIWorkflows from './pages/AIWorkflows';
import DashboardLayout from './components/DashboardLayout';
import PartnerDashboard from './pages/PartnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GlobalSchemes from './pages/GlobalSchemes';
import PrivateInvestors from './pages/PrivateInvestors';
import Documentation from './pages/Documentation';
import About from './pages/About';
import Terms from './pages/Terms';
import Compare from './pages/Compare';
import Chatbot from './components/Chatbot';
import AnimatedBackground from './components/AnimatedBackground';
import { type ReactNode } from 'react';

function ProtectedRoute({ children, allowedRoles }: { children: ReactNode, allowedRoles?: string[] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-100 selection:bg-blue-500/30 relative">
      <Routes>
        <Route path="/" element={<LayoutWithNav><Home /></LayoutWithNav>} />
        <Route path="/login" element={<LayoutWithNav><Login /></LayoutWithNav>} />
        <Route path="/apply" element={<LayoutWithNav><IntakeForm /></LayoutWithNav>} />
        <Route path="/results" element={<LayoutWithNav><Results /></LayoutWithNav>} />
        <Route path="/global-schemes" element={<LayoutWithNav><GlobalSchemes /></LayoutWithNav>} />
        <Route path="/investors" element={<LayoutWithNav><PrivateInvestors /></LayoutWithNav>} />
        <Route path="/compare" element={<LayoutWithNav><Compare /></LayoutWithNav>} />
        <Route path="/docs" element={<LayoutWithNav><Documentation /></LayoutWithNav>} />
        <Route path="/about" element={<LayoutWithNav><About /></LayoutWithNav>} />
        <Route path="/terms" element={<LayoutWithNav><Terms /></LayoutWithNav>} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/crm" element={<CRM />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/store" element={<Store />} />
                <Route path="/ai" element={<AIWorkflows />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/business-profile" element={<BusinessProfile />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/partner" element={
          <ProtectedRoute allowedRoles={['PARTNER']}>
            <LayoutWithNav><PartnerDashboard /></LayoutWithNav>
          </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <LayoutWithNav><AdminDashboard /></LayoutWithNav>
          </ProtectedRoute>
        } />
      </Routes>
      <Chatbot />
    </div>
  );
}

function LayoutWithNav({ children }: { children: ReactNode }) {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow z-10 relative">
        {children}
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="glass-panel mt-auto py-8 text-center text-gray-400 text-sm z-10 border-b-0 border-l-0 border-r-0">
      <div className="mb-4 space-x-4">
        <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
        <Link to="/docs" className="hover:text-blue-400 transition-colors">Documentation</Link>
        <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
      </div>
      <p>© 2026 Avenik Core. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
