import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import IntakeForm from './pages/IntakeForm';
import Results from './pages/Results';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import DashboardHome from './pages/DashboardHome';
import Settings from './pages/Settings';
import BusinessProfile from './pages/BusinessProfile';
import CRM from './pages/CRM';
import Projects from './pages/Projects';
import Finance from './pages/Finance';
import Store from './pages/Store';
import AIWorkflows from './pages/AIWorkflows';
import CommunicationPreferences from './pages/CommunicationPreferences';
import DashboardLayout from './components/DashboardLayout';
import PartnerDashboard from './pages/PartnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GlobalSchemes from './pages/GlobalSchemes';
import PrivateInvestors from './pages/PrivateInvestors';
import Documentation from './pages/Documentation';
import About from './pages/About';
import Terms from './pages/Terms';
import Compare from './pages/Compare';
import FloatingGuide from './components/FloatingGuide';
import AppLayout from './components/layout/AppLayout';
import LegalCenter from './pages/legal/LegalCenter';
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import CookiePolicy from './pages/legal/CookiePolicy';
import AcceptableUse from './pages/legal/AcceptableUse';
import SecurityPolicy from './pages/legal/SecurityPolicy';
import { type ReactNode } from 'react';

function ProtectedRoute({ children, allowedRoles }: { children: ReactNode, allowedRoles?: string[] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-text-base selection:bg-blue-50 relative">
      <Routes>
        <Route path="/" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/login" element={<AppLayout showFooter={false}><Login /></AppLayout>} />
        <Route path="/register" element={<AppLayout showFooter={false}><Register /></AppLayout>} />
        <Route path="/forgot-password" element={<AppLayout showFooter={false}><ForgotPassword /></AppLayout>} />
        <Route path="/reset-password" element={<AppLayout showFooter={false}><ResetPassword /></AppLayout>} />
        <Route path="/verify-email" element={<AppLayout showFooter={false}><VerifyEmail /></AppLayout>} />
        <Route path="/apply" element={<AppLayout><IntakeForm /></AppLayout>} />
        <Route path="/results" element={<AppLayout><Results /></AppLayout>} />
        <Route path="/global-schemes" element={<AppLayout><GlobalSchemes /></AppLayout>} />
        <Route path="/investors" element={<AppLayout><PrivateInvestors /></AppLayout>} />
        <Route path="/compare" element={<AppLayout><Compare /></AppLayout>} />
        <Route path="/docs" element={<AppLayout><Documentation /></AppLayout>} />
        <Route path="/about" element={<AppLayout><About /></AppLayout>} />
        <Route path="/terms" element={<Navigate to="/legal/terms" replace />} />
        
        {/* Legal Center Routes */}
        <Route path="/legal" element={<AppLayout><LegalCenter /></AppLayout>} />
        <Route path="/legal/terms" element={<AppLayout><TermsOfService /></AppLayout>} />
        <Route path="/legal/privacy" element={<AppLayout><PrivacyPolicy /></AppLayout>} />
        <Route path="/legal/cookies" element={<AppLayout><CookiePolicy /></AppLayout>} />
        <Route path="/legal/acceptable-use" element={<AppLayout><AcceptableUse /></AppLayout>} />
        <Route path="/legal/security" element={<AppLayout><SecurityPolicy /></AppLayout>} />
        
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
                <Route path="/preferences" element={<CommunicationPreferences />} />
                <Route path="/business-profile" element={<BusinessProfile />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/partner" element={
          <ProtectedRoute allowedRoles={['PARTNER']}>
            <AppLayout><PartnerDashboard /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AppLayout><AdminDashboard /></AppLayout>
          </ProtectedRoute>
        } />
      </Routes>
      <FloatingGuide />
    </div>
  );
}

// LayoutWithNav and Footer removed since we now use AppLayout and components/Footer.tsx

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
