import { useTranslation } from 'react-i18next';
import { Search, Filter, Briefcase, MapPin, Building, ChevronRight, Clock } from 'lucide-react';

export default function DiscoveryShowcase() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {t('home.discoveryTitle', 'Find Opportunities That Match Your Situation')}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t('home.discoveryDesc', 'Instead of searching through long lists of generic programs, start with what you are trying to accomplish. Our discovery engine filters opportunities based on your exact profile.')}
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Filter by industry and business stage',
                'Match by location and demographics',
                'Sort by funding type (Loan, Subsidy, Grant)'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 mt-0.5">✓</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: UI Mockup */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-[2rem] transform translate-x-4 translate-y-4 opacity-10"></div>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative z-10">
              
              {/* Mockup Header */}
              <div className="bg-slate-50 border-b border-slate-200 p-4">
                <div className="bg-white rounded-lg border border-slate-200 p-2 flex items-center shadow-sm">
                  <Search className="w-5 h-5 text-slate-400 mr-2" />
                  <span className="text-slate-600 text-sm">I want funding to start a small manufacturing business...</span>
                </div>
              </div>

              <div className="flex">
                {/* Mockup Sidebar (Filters) */}
                <div className="hidden sm:block w-48 bg-slate-50 border-r border-slate-200 p-4">
                  <div className="flex items-center text-sm font-bold text-slate-700 mb-4">
                    <Filter className="w-4 h-4 mr-2" /> Filters
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase">Location</span>
                      <div className="mt-1 flex items-center text-sm text-slate-700 bg-white border rounded px-2 py-1"><MapPin className="w-3 h-3 mr-1"/> Maharashtra</div>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase">Stage</span>
                      <div className="mt-1 flex items-center text-sm text-slate-700 bg-white border rounded px-2 py-1"><Briefcase className="w-3 h-3 mr-1"/> Idea / New</div>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase">Industry</span>
                      <div className="mt-1 flex items-center text-sm text-slate-700 bg-white border rounded px-2 py-1"><Building className="w-3 h-3 mr-1"/> Manufacturing</div>
                    </div>
                  </div>
                </div>

                {/* Mockup Results */}
                <div className="flex-1 p-4 bg-slate-50/50 space-y-4">
                  {/* Result Card 1 */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">DEMO DATA</div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Prime Minister's Employment Generation Programme (PMEGP)</h4>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">Credit-linked subsidy scheme aimed at generating employment opportunities through establishment of micro enterprises.</p>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="bg-green-50 text-green-700 px-2 py-1 rounded border border-green-100">
                        <span className="font-semibold">Subsidy:</span> Up to 35%
                      </div>
                      <div className="flex items-center text-slate-400">
                        <Clock className="w-3 h-3 mr-1" /> Checked 2d ago
                      </div>
                    </div>
                  </div>

                  {/* Result Card 2 */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden opacity-75">
                    <div className="absolute top-0 right-0 bg-slate-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">DEMO DATA</div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Mudra Yojana (Shishu)</h4>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-1">Loans up to ₹50,000 for startups and micro units.</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">
                        <span className="font-semibold">Loan:</span> Up to ₹50k
                      </div>
                      <span className="text-blue-600 font-medium flex items-center">View <ChevronRight className="w-3 h-3 ml-0.5"/></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
