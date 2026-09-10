import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Missing verification token.');
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/verify-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || 'Verification failed');
        
        setStatus('success');
        setMessage('Your email has been successfully verified.');
        
        // After 3 seconds, redirect to dashboard or login
        setTimeout(() => {
          navigate(user ? '/dashboard' : '/login');
        }, 3000);
      } catch (err: any) {
        setStatus('error');
        setMessage(err.message);
      }
    };

    verifyToken();
  }, [token, navigate, user]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-md w-full space-y-8 glass-panel p-10 rounded-3xl shadow-sm border border-border-subtle bg-white text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <h2 className="text-2xl font-extrabold text-slate-900">Verifying Email</h2>
            <p className="mt-2 text-sm text-slate-600">Please wait while we verify your email address.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
            <h2 className="text-2xl font-extrabold text-slate-900">Email Verified!</h2>
            <p className="mt-2 text-sm text-slate-600">{message}</p>
            <p className="text-xs text-slate-500 mt-4">Redirecting...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-extrabold text-slate-900">Verification Failed</h2>
            <p className="mt-2 text-sm text-slate-600">{message}</p>
            <div className="mt-6">
              <Link to="/login" className="inline-flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-medium transition-all">
                Go to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
