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
    <div className="max-w-[1500px] mx-auto py-12 px-4 sm:px-6 relative z-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-text-base ">Your Recommendations</h1>
        <p className="text-text-muted mt-2 ">Based on your profile, here is the best scheme and nearest partners for you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Scheme & Financials */}
        <div className="lg:col-span-3 space-y-8">
          {/* Scheme Card */}
          <div className="glass-panel rounded-3xl shadow-sm border border-blue-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-30">
              <CheckCircle2 className="h-24 w-24 text-blue-500" />
            </div>
            <div className="p-8 relative z-10">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-200 border border-blue-200 text-xs font-semibold rounded-full mb-4 shadow-sm ">
                Recommended Match
              </span>
              <h2 className="text-3xl font-bold text-text-base mb-2 ">{scheme.scheme_name}</h2>
              <p className="text-blue-200 mb-8 font-medium text-sm">Provided by {scheme.corporation_code}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl border border-border-subtle ">
                  <p className="text-sm text-text-muted mb-1">Max Loan %</p>
                  <p className="text-2xl font-bold text-text-base ">{scheme.max_loan_percentage}%</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-border-subtle ">
                  <p className="text-sm text-text-muted mb-1">Interest Rate</p>
                  <p className="text-2xl font-bold text-primary ">{scheme.interest_rate_beneficiary}% <span className="text-sm font-normal">p.a.</span></p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-border-subtle ">
                  <p className="text-sm text-text-muted mb-1">Max Tenure</p>
                  <p className="text-2xl font-bold text-text-base ">{scheme.max_repayment_months} <span className="text-sm font-normal">mos</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* EMI Calculator Result */}
          {emiData && (
            <div className="glass-panel rounded-3xl shadow-lg border border-border-subtle p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-text-base ">Financial Breakdown</h3>
              </div>
              <div className="bg-white border border-border-subtle rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                <div>
                  <p className="text-sm font-medium text-text-muted">Eligible Loan Amount</p>
                  <p className="text-3xl font-bold text-text-base mt-1 ">₹{eligibleLoan.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-blue-200 mt-2 font-medium">({scheme.max_loan_percentage}% of ₹{data.payload.estimated_cost.toLocaleString('en-IN')})</p>
                </div>
                <div className="sm:border-l sm:border-border-subtle sm:pl-6 pt-4 sm:pt-0 border-t border-border-subtle sm:border-t-0">
                  <p className="text-sm font-medium text-text-muted">Estimated EMI</p>
                  <p className="text-3xl font-bold text-primary mt-1 ">₹{emiData.emi.toLocaleString('en-IN')}<span className="text-lg text-blue-200">/mo</span></p>
                  <p className="text-xs text-blue-200 mt-2 font-medium">After {emiData.moratorium_months} months moratorium</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Partners */}
        <div className="lg:col-span-1">
          <div className="glass-panel rounded-3xl shadow-lg border border-border-subtle p-6 h-full flex flex-col">
            <h3 className="text-xl font-bold text-text-base mb-6 flex items-center gap-2 ">
              <Building className="h-6 w-6 text-primary" /> Nearest Partners
            </h3>
            
            {partners.length === 0 ? (
              <div className="text-center p-6 bg-yellow-500/20 rounded-2xl border border-yellow-500/30 ">
                <AlertCircle className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                <p className="text-sm text-yellow-200 font-medium">No active partners found nearby with sufficient budget.</p>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
                {partners.map((partner: any) => (
                  <div key={partner.partner_id} className="p-4 bg-white border border-border-subtle rounded-2xl hover:bg-slate-50 hover:border-blue-200 hover:shadow-sm transition-all group cursor-pointer ">
                    <h4 className="font-bold text-text-base text-base group-hover:text-primary transition-colors ">{partner.partner_name}</h4>
                    <div className="flex justify-between items-center mt-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-blue-200 border border-border-subtle">
                        {partner.distance.toFixed(1)} km away
                      </span>
                      <span className="text-xs font-semibold text-primary bg-blue-50 px-2 py-1 rounded-lg border border-blue-200">Funds Available</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-border-subtle">
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
                className="w-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-medium py-4 px-4 rounded-xl transition-all shadow-sm hover:shadow-sm transform hover:-translate-y-1 border border-blue-200 "
              >
                Proceed with Nearest Partner
              </button>
              <Link to="/apply" className="block text-center mt-4 text-sm font-medium text-text-muted hover:text-primary transition-colors">
                Back to search
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
