import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL } from '../config';
import { Lock, Loader2 } from 'lucide-react';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to reset password');
      
      navigate('/login?reset=success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full p-8 text-center text-red-600 bg-red-50 rounded-xl border border-red-200">
          Invalid or missing reset token.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-md w-full space-y-8 glass-panel p-10 rounded-3xl shadow-sm border border-border-subtle bg-white">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Create New Password
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Please enter your new password below.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200">{error}</div>}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">New Password</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full p-3 pl-10 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 transition-all placeholder-slate-400" placeholder="••••••••" minLength={8} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input required type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="block w-full p-3 pl-10 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 transition-all placeholder-slate-400" placeholder="••••••••" minLength={8} />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-medium transition-all text-base">
            {loading ? <Loader2 className="animate-spin w-5 h-5"/> : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
