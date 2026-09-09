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
      <div className="max-w-md w-full space-y-8 glass-panel p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white drop-shadow-md">
            {isLogin ? 'Sign in to your account' : 'Create an account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300 drop-shadow-sm">
            {isLogin ? "Welcome back to Avenik Core" : "Join to apply for financial schemes"}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="p-3 bg-red-500/20 text-red-200 text-sm rounded-xl border border-red-500/30 backdrop-blur-md">{error}</div>}
          
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-200">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 w-full p-3 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-white/5 backdrop-blur-md text-white transition-all shadow-inner placeholder-gray-400" />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-200 flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-400"/> Email address</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="mt-1 w-full p-3 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-white/5 backdrop-blur-md text-white transition-all shadow-inner placeholder-gray-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-200 flex items-center gap-2"><Lock className="w-4 h-4 text-emerald-400"/> Password</label>
              <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="mt-1 w-full p-3 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-white/5 backdrop-blur-md text-white transition-all shadow-inner placeholder-gray-400" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex justify-center py-4 px-4 border border-emerald-500/50 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] text-white bg-emerald-600/80 hover:bg-emerald-600 hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transform hover:-translate-y-1 font-medium transition-all backdrop-blur-md">
            {loading ? <Loader2 className="animate-spin w-5 h-5"/> : (isLogin ? 'Sign In' : 'Register')}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-emerald-300 hover:text-emerald-200 font-medium text-sm transition-colors drop-shadow-sm">
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign in"}
          </button>
        </div>
        
        {isLogin && (
          <div className="mt-6 pt-6 border-t border-white/10 text-xs text-gray-400 text-center">
            <p className="mb-1 text-gray-300 font-medium">Demo Accounts:</p>
            <p>Admin: admin@avenik.com / admin123</p>
            <p>Partner: branchA@sca.gov / partner123</p>
          </div>
        )}
      </div>
    </div>
  );
}
