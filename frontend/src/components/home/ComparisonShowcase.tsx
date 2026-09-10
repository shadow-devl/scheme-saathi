import { useTranslation } from 'react-i18next';
import { ArrowRightLeft, Check, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ComparisonShowcase() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {t('home.compareTitle', 'Compare Before You Decide')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('home.compareDesc', 'Evaluate multiple schemes side-by-side. Understand differences in subsidies, loan limits, and eligibility criteria so you can choose the optimal path for your business.')}
          </p>
        </div>

        {/* Desktop Table Comparison Mockup */}
        <div className="hidden md:block overflow-hidden bg-white rounded-2xl shadow-xl border border-slate-200 relative mb-10">
          <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-20">EXAMPLE DATA</div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-500 text-sm w-1/4">Criteria</th>
                <th className="p-4 font-bold text-slate-900 w-1/3 border-l border-slate-200">
                  <div className="text-blue-600 text-xs uppercase tracking-wider mb-1">Scheme A</div>
                  PMEGP
                </th>
                <th className="p-4 font-bold text-slate-900 w-1/3 border-l border-slate-200">
                  <div className="text-purple-600 text-xs uppercase tracking-wider mb-1">Scheme B</div>
                  Mudra Yojana
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4 text-slate-600 font-medium">Max Funding Limit</td>
                <td className="p-4 text-slate-900 border-l border-slate-100 font-semibold">₹50 Lakhs (Manufacturing)</td>
                <td className="p-4 text-slate-900 border-l border-slate-100 font-semibold">₹10 Lakhs (Tarun)</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4 text-slate-600 font-medium">Subsidy Component</td>
                <td className="p-4 text-slate-900 border-l border-slate-100"><span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">15% - 35%</span></td>
                <td className="p-4 text-slate-900 border-l border-slate-100"><Minus className="w-4 h-4 text-slate-400" /></td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4 text-slate-600 font-medium">Collateral Free</td>
                <td className="p-4 text-slate-900 border-l border-slate-100"><Check className="w-4 h-4 text-green-500" /> (Under CGTMSE)</td>
                <td className="p-4 text-slate-900 border-l border-slate-100"><Check className="w-4 h-4 text-green-500" /></td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-4 text-slate-600 font-medium">Target Audience</td>
                <td className="p-4 text-slate-600 border-l border-slate-100 text-xs">New Micro Enterprises</td>
                <td className="p-4 text-slate-600 border-l border-slate-100 text-xs">Micro Units / Startups</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Comparison Cards Mockup */}
        <div className="md:hidden space-y-6 mb-10">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative text-left">
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">DEMO</div>
            <div className="p-4 border-b border-slate-100 bg-blue-50/50">
              <h4 className="font-bold text-slate-900">PMEGP</h4>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">Max Funding</span>
                <span className="font-semibold text-slate-900">₹50 Lakhs</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">Subsidy</span>
                <span className="font-bold text-green-600">15% - 35%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative text-left">
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">DEMO</div>
            <div className="p-4 border-b border-slate-100 bg-purple-50/50">
              <h4 className="font-bold text-slate-900">Mudra Yojana</h4>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">Max Funding</span>
                <span className="font-semibold text-slate-900">₹10 Lakhs</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">Subsidy</span>
                <span className="text-slate-400">None</span>
              </div>
            </div>
          </div>
        </div>

        <Link 
          to="/compare" 
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors"
        >
          {t('home.compareCta', 'Compare Schemes')} <ArrowRightLeft className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
