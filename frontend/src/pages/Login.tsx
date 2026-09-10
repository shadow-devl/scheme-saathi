import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      login(data.token, data.user);
      
      // Redirect based on role
      if (data.user.role === 'ADMIN') navigate('/admin');
      else if (data.user.role === 'PARTNER') navigate('/partner');
      else navigate('/dashboard');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-md w-full space-y-8 glass-panel p-10 rounded-3xl shadow-sm border border-border-subtle">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-text-base ">
            {isLogin ? 'Sign in to your account' : 'Create an account'}
          </h2>
          <p className="mt-2 text-center text-sm text-text-muted ">
            {isLogin ? "Welcome back to Scheme Saathi" : "Join to apply for financial schemes"}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="p-3 bg-red-50 text-red-200 text-sm rounded-xl border border-red-200 ">{error}</div>}
          
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-text-base">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 w-full p-3 border border-border-subtle rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white text-text-base transition-all shadow-inner placeholder-slate-400" />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-text-base">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-muted" />
                </div>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="mt-1 w-full p-3 pl-10 border border-border-subtle rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white text-text-base transition-all shadow-inner placeholder-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-base">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-muted" />
                </div>
                <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="mt-1 w-full p-3 pl-10 border border-border-subtle rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white text-text-base transition-all shadow-inner placeholder-slate-400" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-medium transition-all">
            {loading ? <Loader2 className="animate-spin w-5 h-5"/> : (isLogin ? 'Sign In' : 'Register')}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:text-blue-200 font-medium text-sm transition-colors ">
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign in"}
          </button>
        </div>
        
        {isLogin && (
          <div className="mt-6 pt-6 border-t border-border-subtle text-xs text-text-muted text-center">
            <p className="mb-1 text-text-muted font-medium">Demo Accounts:</p>
            <p>Admin: admin@avenik.com / admin123</p>
            <p>Partner: branchA@sca.gov / partner123</p>
          </div>
        )}
      </div>
    </div>
  );
}
