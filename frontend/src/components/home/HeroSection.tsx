import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Accessibility, BarChart3, Search, PlayCircle, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-36 bg-gradient-to-br from-blue-50/50 via-white to-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.15]">
              {t('home.heroTitle', 'Find the Right Support for Your ')} 
              <span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                {t('home.heroHighlight', 'Entrepreneurial Journey')}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
              {t('home.heroSubtitle', 'Discover relevant government schemes, understand eligibility, estimate financial commitments and find the right support channels — all in one place.')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link 
                to="/apply" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-500/50"
              >
                {t('home.heroCtaPrimary', 'Find Schemes')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all transform hover:-translate-y-0.5 focus:ring-4 focus:ring-slate-200"
              >
                <PlayCircle className="mr-2 h-5 w-5 text-slate-400" />
                {t('home.heroCtaSecondary', 'Explore How It Works')}
              </button>
            </div>

            <div className="pt-8 border-t border-slate-200/60">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                {t('home.heroTrustMicrocopy', 'Designed to make complex scheme discovery easier')}
              </p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                {[
                  { icon: CheckCircle2, text: 'Clear eligibility info' },
                  { icon: BarChart3, text: 'Transparent calculations' },
                  { icon: ShieldCheck, text: 'Source-aware information' },
                  { icon: Accessibility, text: 'Accessible design' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center text-sm text-slate-600">
                    <item.icon className="w-4 h-4 mr-2 text-green-500 shrink-0" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: UI Illustration */}
          <div className="relative hidden md:block">
            {/* Main Dashboard Mockup */}
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="mx-auto bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400 flex items-center shadow-sm w-1/2 justify-center">
                  <Search className="w-3 h-3 mr-1" />
                  <span>demo.schemesaathi.com</span>
                </div>
              </div>
              <div className="p-6 bg-slate-50/50">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">PMEGP Scheme Match</h3>
                    <p className="text-sm text-slate-500">Manufacturing Sector • Rural</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    High Eligibility Match
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Estimated Subsidy Range</span>
                      <span className="font-bold text-blue-600">15% - 35%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-[70%]"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <span className="block text-xs text-slate-500 mb-1">Max Project Cost</span>
                      <span className="font-bold text-slate-800">₹50.00 Lakhs</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <span className="block text-xs text-slate-500 mb-1">Applicant Type</span>
                      <span className="font-bold text-slate-800 text-sm">Individual / SHG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements (Decorative) */}
            <div className="absolute -top-6 -right-6 bg-white p-3 rounded-xl shadow-xl border border-slate-100 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">✓</div>
                Eligibility Check
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-xl shadow-xl border border-slate-100 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Calculator className="w-4 h-4" />
                </div>
                Financial Estimate
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
