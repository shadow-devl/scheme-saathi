import { useTranslation } from 'react-i18next';
import { Calculator, IndianRupee, PieChart, Info } from 'lucide-react';

export default function FinancialShowcase() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {t('home.financialTitle', 'Understand the Financial Side')}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t('home.financialDesc', 'Government schemes often involve complex combinations of loans, subsidies, and margin money. Our financial tools help you estimate your exact commitments.')}
            </p>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                    <Calculator className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-slate-900">EMI & Repayment</h4>
                  <p className="mt-1 text-slate-600 text-sm">Calculate monthly outflows factoring in moratorium periods and varying interest rates.</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center border border-green-100">
                    <IndianRupee className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-slate-900">Subsidy Estimates</h4>
                  <p className="mt-1 text-slate-600 text-sm">Visualize how government subsidies reduce your total burden and when they are applied.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: UI Mockup */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative z-10">
              <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-400" />
                  <span className="font-bold">Financial Estimate</span>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-1 rounded uppercase tracking-wider">Demo Tool</span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Project Cost</label>
                    <div className="text-lg font-bold text-slate-900 bg-slate-50 px-3 py-2 rounded border border-slate-200">₹ 25,000,000</div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Interest Rate</label>
                    <div className="text-lg font-bold text-slate-900 bg-slate-50 px-3 py-2 rounded border border-slate-200">9.5%</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-6">
                  <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">Estimated Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 flex items-center"><div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div> Bank Loan (60%)</span>
                      <span className="font-semibold text-slate-900">₹ 15,000,000</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 flex items-center"><div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div> Est. Subsidy (25%)</span>
                      <span className="font-semibold text-green-600">₹ 6,250,000</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 flex items-center"><div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div> Your Contribution (15%)</span>
                      <span className="font-semibold text-slate-900">₹ 3,750,000</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600 text-white rounded-xl p-5 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Calculator className="w-16 h-16" />
                  </div>
                  <span className="block text-blue-100 text-sm mb-1">Estimated Monthly EMI</span>
                  <span className="text-3xl font-bold">₹ 315,625</span>
                  <span className="block text-blue-200 text-xs mt-2">Assuming 5-year tenure after moratorium</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 border-t border-slate-200 text-xs text-slate-500 flex items-start">
                <Info className="w-4 h-4 mr-2 shrink-0" />
                <p>Calculations are estimates and may differ from the terms offered by the actual lender or program.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
