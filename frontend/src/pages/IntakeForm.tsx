import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { API_URL } from '../config';

export default function IntakeForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    category: 'SC',
    education: 'High School',
    annual_family_income: '',
    project_type: 'business',
    business_sector: 'Retail',
    estimated_cost: '',
    latitude: '',
    longitude: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocation = async () => {
    const useFallback = () => {
      setFormData(prev => ({
        ...prev,
        latitude: '28.6139',
        longitude: '77.2090'
      }));
      alert('Location auto-retrieval failed. Falling back to default Demo Location (New Delhi). You can manually edit these.');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
        },
        async (error) => {
          console.warn("Geolocation error, trying IP fallback:", error);
          try {
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            if (data && data.latitude && data.longitude) {
              setFormData(prev => ({
                ...prev,
                latitude: data.latitude.toString(),
                longitude: data.longitude.toString()
              }));
            } else {
              useFallback();
            }
          } catch(e) {
            useFallback();
          }
        },
        { timeout: 5000 }
      );
    } else {
      useFallback();
    }
  };

  const validateStep = () => {
    if (step === 1) return formData.name.trim() !== '' && formData.age !== '';
    if (step === 2) return formData.annual_family_income !== '' && formData.estimated_cost !== '';
    if (step === 3) return formData.latitude !== '' && formData.longitude !== '';
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      if (validateStep()) {
        setStep(step + 1);
        setError('');
      } else {
        setError('Please fill in all required fields to continue.');
      }
      return;
    }

    if (!validateStep()) {
      setError('Please provide your location to finalize.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        age: Number(formData.age),
        annual_family_income: Number(formData.annual_family_income),
        estimated_cost: Number(formData.estimated_cost),
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude)
      };

      // 1. Fetch matching scheme
      const schemeRes = await fetch(`${API_URL}/api/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!schemeRes.ok) {
        const errorData = await schemeRes.json();
        throw new Error(errorData.error || 'Failed to find a matching scheme.');
      }
      
      const { scheme } = await schemeRes.json();

      // 2. Fetch nearest partners
      const partnersRes = await fetch(`${API_URL}/api/nearest-partners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          latitude: payload.latitude, 
          longitude: payload.longitude,
          required_loan_amount: payload.estimated_cost * (scheme.max_loan_percentage / 100)
        })
      });
      
      let partners = [];
      if (partnersRes.ok) {
        const data = await partnersRes.json();
        partners = data.partners;
      }

      // Navigate to results with data
      navigate('/results', { state: { scheme, partners, payload } });

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 relative z-10">
      <div className="glass-panel rounded-3xl shadow-sm overflow-hidden border border-border-subtle">
        
        {/* Header & Progress Bar */}
        <div className="bg-blue-50  px-8 py-6 border-b border-border-subtle">
          <h2 className="text-2xl font-bold text-text-base ">Find Your Eligible Scheme</h2>
          <p className="text-blue-100 mt-2 font-medium">Step {step} of 3: {step === 1 ? 'Personal Demographics' : step === 2 ? 'Financial & Business Details' : 'Location & Finalize'}</p>
          
          <div className="mt-6 flex gap-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className={`h-2 flex-1 rounded-full ${num <= step ? 'bg-white shadow-sm' : 'bg-slate-100'}`}></div>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-200 rounded-xl text-sm font-medium border border-red-200 ">
              {error}
            </div>
          )}

          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-base">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-xl border-border-subtle border p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white  text-text-base placeholder-slate-400" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-base">Age</label>
                  <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full rounded-xl border-border-subtle border p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white  text-text-base placeholder-slate-400" placeholder="e.g. 28" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-base">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full rounded-xl border-border-subtle border p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white  text-text-base">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-base">Social Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-xl border-border-subtle border p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white  text-text-base">
                    <option value="SC">Scheduled Caste (SC)</option>
                    <option value="ST">Scheduled Tribe (ST)</option>
                    <option value="OBC">Other Backward Class (OBC)</option>
                    <option value="GEN">General</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-base">Highest Education</label>
                <select name="education" value={formData.education} onChange={handleChange} className="w-full rounded-xl border-border-subtle border p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white  text-text-base">
                  <option value="Below 10th">Below 10th</option>
                  <option value="High School">High School (10th/12th)</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Financial Info */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-base">Annual Family Income (₹)</label>
                  <input required type="number" name="annual_family_income" value={formData.annual_family_income} onChange={handleChange} className="w-full rounded-xl border-border-subtle border p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white  text-text-base placeholder-slate-400" placeholder="e.g. 250000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-base">Estimated Project Cost (₹)</label>
                  <input required type="number" name="estimated_cost" value={formData.estimated_cost} onChange={handleChange} className="w-full rounded-xl border-border-subtle border p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white  text-text-base placeholder-slate-400" placeholder="e.g. 100000" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-base">Project Type</label>
                  <select name="project_type" value={formData.project_type} onChange={handleChange} className="w-full rounded-xl border-border-subtle border p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white  text-text-base">
                    <option value="business">Business / Entrepreneurship</option>
                    <option value="education">Education / Skill Development</option>
                    <option value="agriculture">Agriculture / Farming</option>
                  </select>
                </div>
                
                {formData.project_type === 'business' && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-base">Business Sector</label>
                    <select name="business_sector" value={formData.business_sector} onChange={handleChange} className="w-full rounded-xl border-border-subtle border p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white  text-text-base">
                      <option value="Retail">Retail & Trade</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Services">Services (IT, Consulting, Beauty)</option>
                      <option value="Food">Food & Beverage</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Location & Submit */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 text-center space-y-4 ">
                <MapPin className="h-12 w-12 text-primary mx-auto " />
                <h3 className="font-semibold text-text-base ">Locate Nearest Partners</h3>
                <p className="text-sm text-text-muted">We need your coordinates to find the closest banks and channel partners near you.</p>
                <button type="button" onClick={handleLocation} className="px-6 py-2 bg-slate-50 hover:bg-slate-100 text-text-base font-medium rounded-lg border border-border-subtle transition-all shadow-sm">
                  Auto-detect My Location
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-text-muted font-medium uppercase tracking-wider">Latitude</label>
                  <input required type="text" name="latitude" value={formData.latitude} onChange={handleChange} className="w-full rounded-xl border-border-subtle border p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white  text-text-base placeholder-gray-500" placeholder="e.g. 28.6139" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-text-muted font-medium uppercase tracking-wider">Longitude</label>
                  <input required type="text" name="longitude" value={formData.longitude} onChange={handleChange} className="w-full rounded-xl border-border-subtle border p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white  text-text-base placeholder-gray-500" placeholder="e.g. 77.2090" />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-6 flex gap-4 mt-8 border-t border-border-subtle">
            {step > 1 && (
              <button 
                type="button" 
                onClick={() => { setStep(step - 1); setError(''); }}
                className="flex-1 flex justify-center items-center py-4 px-4 rounded-xl shadow-sm text-lg font-medium text-text-base bg-white hover:bg-slate-50 border border-border-subtle  focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Back
              </button>
            )}
            <button 
              type="submit" 
              disabled={loading}
              className={`${step === 1 ? 'w-full' : 'flex-[2]'} flex justify-center items-center py-4 px-4 rounded-xl shadow-sm hover:shadow-sm transform hover:-translate-y-1 text-lg font-medium text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 border border-blue-200  focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:transform-none disabled:shadow-none`}
            >
              {step < 3 ? (
                <>Next <ArrowRight className="ml-2 h-5 w-5" /></>
              ) : (
                loading ? <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Processing...</> : 'Find Matching Schemes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
