import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to send reset link');
      
      setMessage('If an account with that email exists, we have sent a password reset link.');
      setEmail('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-md w-full space-y-8 glass-panel p-10 rounded-3xl shadow-sm border border-border-subtle bg-white">
        <div>
          <Link to="/login" className="text-sm text-slate-500 hover:text-blue-600 mb-4 inline-flex items-center gap-1 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to sign in
          </Link>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200">{error}</div>}
          {message && <div className="p-3 bg-emerald-50 text-emerald-700 text-sm rounded-xl border border-emerald-200">{message}</div>}
          
          <div>
            <label className="block text-sm font-medium text-slate-700">Email Address</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full p-3 pl-10 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 transition-all placeholder-slate-400" placeholder="you@example.com" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-medium transition-all text-base">
            {loading ? <Loader2 className="animate-spin w-5 h-5"/> : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
}
