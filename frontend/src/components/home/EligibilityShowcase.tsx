import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';

export default function EligibilityShowcase() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-blue-50/30 border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: UI Mockup */}
          <div className="order-2 lg:order-1 relative">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 relative z-10">
              <div className="absolute top-4 right-4 bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-slate-200">Demo Interface</div>
              
              <div className="mb-6 border-b border-slate-100 pb-4">
                <h3 className="font-bold text-lg text-slate-900">Eligibility Breakdown</h3>
                <p className="text-sm text-slate-500">PMEGP Manufacturing Sector</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50/50 border border-green-100">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Age Requirement</p>
                      <p className="text-xs text-slate-500">Above 18 years</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">MET</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50/50 border border-green-100">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Education</p>
                      <p className="text-xs text-slate-500">At least VIII standard pass (for &gt;10L project)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">MET</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-amber-500 mr-3" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">New Unit</p>
                      <p className="text-xs text-slate-500">Must be a new project</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded">UNVERIFIED</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center">
                    <XCircle className="w-5 h-5 text-slate-300 mr-3" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 text-opacity-50">Defaulter Status</p>
                      <p className="text-xs text-slate-500 text-opacity-50">Cannot be a defaulter</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-1 rounded">PENDING INFO</span>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start">
                <Info className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-blue-900 mb-1">Potentially Eligible</p>
                  <p className="text-xs text-blue-700 leading-relaxed">Based on the information provided, you appear potentially eligible. Official determination is made by the lending institution and KVIC.</p>
                </div>
              </div>
            </div>
            {/* Decorative background blob */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-blue-200 to-teal-100 rounded-full blur-3xl opacity-40"></div>
          </div>

          {/* Right: Copy */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {t('home.eligibilityTitle', 'Understand Eligibility Before You Apply')}
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {t('home.eligibilityDesc', "Don't waste time filling out applications for programs you don't qualify for. We break down complex government notifications into clear, actionable checklists.")}
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Identify exactly which documents and criteria are required. Scheme Saathi highlights missing information so you can prepare adequately before approaching an institution.
            </p>
            
            <div className="bg-white border-l-4 border-amber-400 p-4 rounded-r-lg shadow-sm text-sm text-slate-700">
              <strong className="block text-slate-900 mb-1">Important Note:</strong>
              We provide informational estimates. We never claim "100% Eligible" because the final official authority always makes the actual determination.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
