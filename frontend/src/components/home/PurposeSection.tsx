import { Search, Info, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PurposeSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-blue-50/50 border-b border-blue-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {t('home.purposeTitle', "Entrepreneurship Support Shouldn't Be Complicated")}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('home.purposeSub', "Government support programs can involve complex eligibility conditions, different application processes, financial terminology and multiple support channels. Scheme Saathi brings these pieces into one guided experience.")}
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-blue-200/50 z-0"></div>
          
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {/* Discover */}
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg border border-blue-100 flex items-center justify-center mb-6 relative group-hover:-translate-y-2 transition-transform duration-300">
                <Search className="w-10 h-10 text-blue-600" />
                <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300 -z-10"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('home.purposeDiscover', 'Discover')}</h3>
              <p className="text-slate-600 max-w-xs mx-auto">
                {t('home.purposeDiscoverDesc', 'Find relevant opportunities instead of searching blindly through disconnected portals.')}
              </p>
            </div>

            {/* Understand */}
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg border border-blue-100 flex items-center justify-center mb-6 relative group-hover:-translate-y-2 transition-transform duration-300">
                <Info className="w-10 h-10 text-blue-600" />
                <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300 -z-10"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('home.purposeUnderstand', 'Understand')}</h3>
              <p className="text-slate-600 max-w-xs mx-auto">
                {t('home.purposeUnderstandDesc', 'Break down complex eligibility rules, financial terms, and application requirements.')}
              </p>
            </div>

            {/* Act */}
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg border border-blue-100 flex items-center justify-center mb-6 relative group-hover:-translate-y-2 transition-transform duration-300">
                <Rocket className="w-10 h-10 text-blue-600 ml-1" />
                <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300 -z-10"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('home.purposeAct', 'Act')}</h3>
              <p className="text-slate-600 max-w-xs mx-auto">
                {t('home.purposeActDesc', 'Move from discovery toward the appropriate application or find a trusted support channel.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
