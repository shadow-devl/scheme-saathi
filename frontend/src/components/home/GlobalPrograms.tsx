import { useTranslation } from 'react-i18next';
import { Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GlobalPrograms() {
  const { t } = useTranslation();

  const regions = [
    { name: 'India', code: 'IN', gradient: 'from-orange-500 via-white to-green-500' },
    { name: 'United States', code: 'US', gradient: 'from-blue-600 via-white to-red-600' },
    { name: 'European Union', code: 'EU', gradient: 'from-blue-700 to-yellow-400' },
    { name: 'Singapore', code: 'SG', gradient: 'from-red-500 to-white' },
    { name: 'United Kingdom', code: 'UK', gradient: 'from-blue-800 via-white to-red-600' },
    { name: 'Japan', code: 'JP', gradient: 'from-white to-red-500' },
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-blue-900 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-purple-900 rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-medium mb-6">
              <Globe className="w-4 h-4 mr-2" /> Global Reach
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {t('home.globalTitle', 'Explore Opportunities Across Borders')}
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {t('home.globalDesc', 'Entrepreneurial support is not limited to one country. Explore programs and opportunities across jurisdictions while understanding the eligibility requirements that may apply to citizens, residents and businesses.')}
            </p>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8 backdrop-blur-sm">
              <h4 className="font-semibold text-white mb-2">Important Notice</h4>
              <p className="text-sm text-slate-400">
                International eligibility heavily depends on your specific citizenship, residency status, and business incorporation location. Use these categories to navigate available data.
              </p>
            </div>

            <Link 
              to="/global-schemes" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-900 bg-white rounded-full hover:bg-slate-100 transition-colors shadow-lg shadow-white/10"
            >
              {t('home.globalCta', 'Explore Global Programs')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {regions.map((region, idx) => (
              <div 
                key={idx} 
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:bg-slate-700/50 transition-colors group cursor-pointer"
              >
                <div className="h-2 w-full rounded-full mb-4 overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className={`w-full h-full bg-gradient-to-r ${region.gradient}`}></div>
                </div>
                <div className="text-sm text-slate-400 font-mono mb-1">{region.code}</div>
                <div className="font-bold text-white">{region.name}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
