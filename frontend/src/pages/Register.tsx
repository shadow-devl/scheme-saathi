import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, type UserRole } from '../context/AuthContext';
import { API_URL } from '../config';
import { Mail, Lock, Loader2, User, Briefcase, Building, ChevronRight } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError('Please select a role first');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      id: 'USER',
      title: 'Individual',
      description: 'Find schemes for yourself or family members.',
      icon: <User className="w-6 h-6 text-blue-500" />
    },
    {
      id: 'ENTREPRENEUR',
      title: 'Entrepreneur',
      description: 'Find funding, grants, and support for your startup.',
      icon: <Briefcase className="w-6 h-6 text-emerald-500" />
    },
    {
      id: 'INVESTOR',
      title: 'Investor / Mentor',
      description: 'Invest in and mentor promising startups.',
      icon: <Building className="w-6 h-6 text-purple-500" />
    }
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-md w-full space-y-8 glass-panel p-10 rounded-3xl shadow-sm border border-border-subtle bg-white">
        
        {step === 1 ? (
          <div>
            <div>
              <h2 className="text-center text-3xl font-extrabold text-slate-900">
                Join Scheme Saathi
              </h2>
              <p className="mt-2 text-center text-sm text-slate-600">
                How would you like to use the platform?
              </p>
            </div>
            
            <div className="mt-8 space-y-4">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRole(r.id as UserRole);
                    setStep(2);
                  }}
                  className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group flex items-start gap-4 bg-white"
                >
                  <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors">
                    {r.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{r.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{r.description}</p>
                  </div>
                  <div className="self-center text-slate-300 group-hover:text-blue-500">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center mt-8 pt-6 border-t border-slate-200">
              <p className="text-slate-600 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <button 
                onClick={() => setStep(1)}
                className="text-sm text-slate-500 hover:text-blue-600 mb-4 inline-block font-medium"
              >
                ← Back to roles
              </button>
              <h2 className="text-center text-3xl font-extrabold text-slate-900">
                Create Account
              </h2>
              <p className="mt-2 text-center text-sm text-slate-600">
                Registering as {roles.find(r => r.id === role)?.title}
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleRegister}>
              {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200">{error}</div>}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Full Name</label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="block w-full p-3 pl-10 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 transition-all placeholder-slate-400" placeholder="John Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Email Address</label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="block w-full p-3 pl-10 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 transition-all placeholder-slate-400" placeholder="you@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="block w-full p-3 pl-10 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 transition-all placeholder-slate-400" placeholder="••••••••" minLength={8} />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-medium transition-all text-base">
                {loading ? <Loader2 className="animate-spin w-5 h-5"/> : 'Create Account'}
              </button>
            </form>

            <div className="text-center mt-6 pt-6 border-t border-slate-200">
              <p className="text-slate-500 text-xs">
                By registering, you agree to our <Link to="/legal/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/legal/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
