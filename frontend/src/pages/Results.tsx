import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Building, Calculator, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [emiData, setEmiData] = useState<any>(null);

  useEffect(() => {
    if (!data) {
      navigate('/apply');
      return;
    }

    // Calculate EMI automatically
    const fetchEmi = async () => {
      const principal = data.payload.estimated_cost * (data.scheme.max_loan_percentage / 100);
      try {
        const res = await fetch(`${API_URL}/api/calculate-emi`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            principal,
            annual_interest_rate: data.scheme.interest_rate_beneficiary,
            tenure_months: data.scheme.max_repayment_months,
            moratorium_months: data.scheme.max_moratorium_months
          })
        });
        if (res.ok) {
          const emiResult = await res.json();
          setEmiData(emiResult);
        }
      } catch (e) {
        console.error('Failed to calculate EMI', e);
      }
    };

    fetchEmi();
  }, [data, navigate]);

  if (!data) return null;

  const { scheme, partners } = data;
  const eligibleLoan = data.payload.estimated_cost * (scheme.max_loan_percentage / 100);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 relative z-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-md">Your Recommendations</h1>
        <p className="text-gray-300 mt-2 drop-shadow-sm">Based on your profile, here is the best scheme and nearest partners for you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Scheme & Financials */}
        <div className="lg:col-span-2 space-y-8">
          {/* Scheme Card */}
          <div className="glass-panel rounded-3xl shadow-[0_0_30px_rgba(34,197,94,0.15)] border border-blue-500/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-30">
              <CheckCircle2 className="h-24 w-24 text-blue-500" />
            </div>
            <div className="p-8 relative z-10">
              <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-200 border border-blue-500/30 text-xs font-semibold rounded-full mb-4 shadow-sm backdrop-blur-md">
                Recommended Match
              </span>
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-md">{scheme.scheme_name}</h2>
              <p className="text-blue-200 mb-8 font-medium text-sm">Provided by {scheme.corporation_code}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                  <p className="text-sm text-gray-300 mb-1">Max Loan %</p>
                  <p className="text-2xl font-bold text-white drop-shadow-sm">{scheme.max_loan_percentage}%</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                  <p className="text-sm text-gray-300 mb-1">Interest Rate</p>
                  <p className="text-2xl font-bold text-blue-300 drop-shadow-sm">{scheme.interest_rate_beneficiary}% <span className="text-sm font-normal">p.a.</span></p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                  <p className="text-sm text-gray-300 mb-1">Max Tenure</p>
                  <p className="text-2xl font-bold text-white drop-shadow-sm">{scheme.max_repayment_months} <span className="text-sm font-normal">mos</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* EMI Calculator Result */}
          {emiData && (
            <div className="glass-panel rounded-3xl shadow-lg border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white drop-shadow-sm">Financial Breakdown</h3>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 backdrop-blur-md">
                <div>
                  <p className="text-sm font-medium text-gray-300">Eligible Loan Amount</p>
                  <p className="text-3xl font-bold text-white mt-1 drop-shadow-sm">₹{eligibleLoan.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-blue-200 mt-2 font-medium">({scheme.max_loan_percentage}% of ₹{data.payload.estimated_cost.toLocaleString('en-IN')})</p>
                </div>
                <div className="sm:border-l sm:border-white/10 sm:pl-6 pt-4 sm:pt-0 border-t border-white/10 sm:border-t-0">
                  <p className="text-sm font-medium text-gray-300">Estimated EMI</p>
                  <p className="text-3xl font-bold text-blue-400 mt-1 drop-shadow-sm">₹{emiData.emi.toLocaleString('en-IN')}<span className="text-lg text-blue-200">/mo</span></p>
                  <p className="text-xs text-blue-200 mt-2 font-medium">After {emiData.moratorium_months} months moratorium</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Partners */}
        <div className="lg:col-span-1">
          <div className="glass-panel rounded-3xl shadow-lg border border-white/10 p-6 h-full flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 drop-shadow-sm">
              <Building className="h-6 w-6 text-blue-400" /> Nearest Partners
            </h3>
            
            {partners.length === 0 ? (
              <div className="text-center p-6 bg-yellow-500/20 rounded-2xl border border-yellow-500/30 backdrop-blur-md">
                <AlertCircle className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <p className="text-sm text-yellow-200 font-medium">No active partners found nearby with sufficient budget.</p>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
                {partners.map((partner: any) => (
                  <div key={partner.partner_id} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all group cursor-pointer backdrop-blur-md">
                    <h4 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors drop-shadow-sm">{partner.partner_name}</h4>
                    <div className="flex justify-between items-center mt-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-black/40 text-blue-200 border border-white/5">
                        {partner.distance.toFixed(1)} km away
                      </span>
                      <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20">Funds Available</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <button 
                onClick={async () => {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    alert('Please log in or register to submit your application.');
                    navigate('/login');
                    return;
                  }
                  try {
                    const res = await fetch(`${API_URL}/api/applications`, {
                      method: 'POST',
                      headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify({
                        scheme_id: scheme.scheme_id,
                        partner_id: partners[0].partner_id, // Defaulting to nearest
                        estimated_cost: data.payload.estimated_cost
                      })
                    });
                    if (res.ok) {
                      alert('Application submitted successfully!');
                      navigate('/dashboard');
                    } else {
                      const errData = await res.json();
                      alert(errData.error || 'Failed to submit application');
                    }
                  } catch (e) {
                    alert('An error occurred during submission.');
                  }
                }} 
                className="w-full bg-blue-600/80 hover:bg-blue-600 text-white font-medium py-4 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transform hover:-translate-y-1 border border-blue-500/50 backdrop-blur-md"
              >
                Proceed with Nearest Partner
              </button>
              <Link to="/apply" className="block text-center mt-4 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Back to search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
