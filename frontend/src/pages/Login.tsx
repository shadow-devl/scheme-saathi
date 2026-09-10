import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, type UserRole } from '../context/AuthContext';
import { API_URL } from '../config';
import { Lock, Mail, Loader2, KeyRound } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useMsal } from '@azure/msal-react';

const allowedEmailDomains = [
  'gmail.com',
  'outlook.com',
  'outlook.in',
  'hotmail.com',
  'hotmail.in',
  'live.com',
  'msn.com'
];

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<UserRole | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { instance: msalInstance } = useMsal();

  const handleGoogleSuccess = async (tokenResponse: any) => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: tokenResponse.access_token })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Google login failed');
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError('Google Login Failed. Please check if your Client ID is valid.')
  });

  const handleMicrosoftLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await msalInstance.loginPopup({
        scopes: ["User.Read", "profile", "email"]
      });
      const res = await fetch(`${API_URL}/api/auth/microsoft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.idToken })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Microsoft login failed');
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailDomain = formData.email.split('@')[1]?.toLowerCase();
    if (!allowedEmailDomains.includes(emailDomain)) {
      setError('Please use a Gmail or Microsoft email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      login(data.token, data.user);
      
      // Redirect based on role
      navigate('/dashboard'); // All go to dashboard, router will handle role-based dashboards
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: UserRole) => {
    setDemoLoading(role);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/demo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Demo login failed');

      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-md w-full space-y-8 glass-panel p-10 rounded-3xl shadow-sm border border-border-subtle bg-white">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-slate-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Sign in to Scheme Saathi to continue
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 flex flex-col items-center">
          {(!import.meta.env.VITE_GOOGLE_CLIENT_ID || import.meta.env.VITE_GOOGLE_CLIENT_ID === 'dummy-client-id') && (
            <div className="w-full p-3 bg-amber-50 text-amber-700 text-xs rounded-xl border border-amber-200 text-center mb-2">
              <strong>Notice:</strong> Google/Microsoft Sign-in is currently unavailable because the Client IDs are not configured in the `.env` file. Please use Email or Demo Login.
            </div>
          )}
          
          <button type="button" onClick={() => loginWithGoogle()} className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-slate-300 rounded-xl shadow-sm bg-white text-slate-700 hover:bg-slate-50 font-medium transition-all">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          <button type="button" onClick={handleMicrosoftLogin} className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-slate-300 rounded-xl shadow-sm bg-white text-slate-700 hover:bg-slate-50 font-medium transition-all">
            <svg viewBox="0 0 21 21" className="w-5 h-5"><path fill="#f25022" d="M1 1h9v9H1z"/><path fill="#7fba00" d="M11 1h9v9h-9z"/><path fill="#00a4ef" d="M1 11h9v9H1z"/><path fill="#ffb900" d="M11 11h9v9h-9z"/></svg>
            Continue with Microsoft
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">Or sign in with email</span>
          </div>
        </div>
        
        <form className="mt-4 space-y-6" onSubmit={handleLogin}>
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200">{error}</div>}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email Address</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="block w-full p-3 pl-10 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 transition-all placeholder-slate-400" placeholder="you@gmail.com" />
              </div>
              <p className="mt-1 text-xs text-slate-500">Supported: Gmail, Outlook, Hotmail.</p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</Link>
              </div>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="block w-full p-3 pl-10 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 transition-all placeholder-slate-400" placeholder="••••••••" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-medium transition-all text-base">
            {loading ? <Loader2 className="animate-spin w-5 h-5"/> : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-slate-600 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
        
        {/* Demo Access Panel */}
        <div className="mt-8 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <KeyRound className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Quick Demo Access</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleDemoLogin('USER')} disabled={!!demoLoading} className="py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors flex justify-center items-center">
              {demoLoading === 'USER' ? <Loader2 className="w-3 h-3 animate-spin"/> : 'Demo User'}
            </button>
            <button onClick={() => handleDemoLogin('ENTREPRENEUR')} disabled={!!demoLoading} className="py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors flex justify-center items-center">
              {demoLoading === 'ENTREPRENEUR' ? <Loader2 className="w-3 h-3 animate-spin"/> : 'Demo Founder'}
            </button>
            <button onClick={() => handleDemoLogin('INVESTOR')} disabled={!!demoLoading} className="py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors flex justify-center items-center col-span-2">
              {demoLoading === 'INVESTOR' ? <Loader2 className="w-3 h-3 animate-spin"/> : 'Demo Investor'}
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 text-center">Demo sessions are isolated and last for 2 hours.</p>
        </div>

      </div>
    </div>
  );
}
