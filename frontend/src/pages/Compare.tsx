import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_SCHEMES = [
  { id: 1, name: 'Mudra Yojana (Tarun)', amount: 'Up to ₹10,00,000', interest: '8.5% p.a.', moratorium: '6 Months', targeted_at: 'Small Business Owners' },
  { id: 2, name: 'Stand-Up India', amount: '₹10L - ₹1Cr', interest: 'Base Rate + 3%', moratorium: '18 Months', targeted_at: 'SC/ST/Women Entrepreneurs' },
  { id: 3, name: 'PMEGP', amount: 'Up to ₹50,00,000', interest: 'Subsidized', moratorium: '3 Months', targeted_at: 'Rural & Urban Artisans' },
  { id: 4, name: 'PM SVANidhi', amount: 'Up to ₹50,000', interest: '7% Subsidy', moratorium: 'None', targeted_at: 'Street Vendors' },
  { id: 5, name: 'CGTMSE', amount: 'Up to ₹5 Crore', interest: 'Variable', moratorium: 'Bank discretion', targeted_at: 'MSEs needing collateral free loans' },
  { id: 6, name: 'SBA 7(a) Loan (USA)', amount: 'Up to $5,000,000', interest: 'Prime + 2.75%', moratorium: 'None', targeted_at: 'US Small Businesses' },
  { id: 7, name: 'SBA Microloan (USA)', amount: 'Up to $50,000', interest: '8% to 13%', moratorium: 'None', targeted_at: 'US Startups & Non-profits' },
  { id: 8, name: 'Start Up Loans (UK)', amount: 'Up to £25,000', interest: '6% p.a.', moratorium: 'None', targeted_at: 'UK Founders' },
  { id: 9, name: 'CSBF Program (Canada)', amount: 'Up to $1.15M', interest: 'Prime + 3%', moratorium: 'Up to 6 Months', targeted_at: 'Canadian SMEs' },
  { id: 10, name: 'KfW Entrepreneur (Germany)', amount: 'Up to €25M', interest: '1.0% to 2.12%', moratorium: 'Up to 3 Years', targeted_at: 'German Founders & SMEs' },
];

export default function Compare() {
  const [selectedSchemes, setSelectedSchemes] = useState<number[]>([]);

  const toggleScheme = (id: number) => {
    if (selectedSchemes.includes(id)) {
      setSelectedSchemes(selectedSchemes.filter(s => s !== id));
    } else if (selectedSchemes.length < 3) {
      setSelectedSchemes([...selectedSchemes, id]);
    }
  };

  const selectedData = selectedSchemes.map(id => MOCK_SCHEMES.find(s => s.id === id));

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Compare Financial Schemes</h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Select up to 3 schemes below to see a side-by-side comparison of interest rates, loan amounts, and eligibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {MOCK_SCHEMES.map(scheme => (
          <div 
            key={scheme.id}
            onClick={() => toggleScheme(scheme.id)}
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
              selectedSchemes.includes(scheme.id) 
                ? 'border-emerald-600 bg-emerald-900/30' 
                : 'border-gray-700 hover:border-emerald-300'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-white">{scheme.name}</h3>
              {selectedSchemes.includes(scheme.id) && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            </div>
            <p className="text-sm text-gray-400">{scheme.amount}</p>
          </div>
        ))}
      </div>

      {selectedSchemes.length > 0 ? (
        <div className="bg-gray-900/60 backdrop-blur-md border-gray-800 rounded-2xl shadow-sm border border-gray-700 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Feature</th>
                {selectedData.map((s, idx) => (
                  <th key={idx} scope="col" className="px-6 py-4 text-left text-sm font-bold text-white">{s?.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-900/60 backdrop-blur-md border-gray-800 divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Max Amount</td>
                {selectedData.map((s, idx) => <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{s?.amount}</td>)}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Interest Rate</td>
                {selectedData.map((s, idx) => <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{s?.interest}</td>)}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Moratorium Period</td>
                {selectedData.map((s, idx) => <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{s?.moratorium}</td>)}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">Target Demographic</td>
                {selectedData.map((s, idx) => <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{s?.targeted_at}</td>)}
              </tr>
            </tbody>
          </table>
          <div className="bg-gray-800/50 px-6 py-4 flex justify-end">
            <Link to="/apply" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700">
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center p-12 bg-gray-800/50 rounded-2xl border border-dashed border-gray-700">
          <p className="text-gray-400">Select at least one scheme to view comparison.</p>
        </div>
      )}
    </div>
  );
}
