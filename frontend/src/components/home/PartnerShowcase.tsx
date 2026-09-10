import { useTranslation } from 'react-i18next';
import { MapPin, Navigation, Phone, Globe, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PartnerShowcase() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: UI Mockup */}
          <div className="order-2 lg:order-1 relative">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative z-10">
              {/* Map Mockup */}
              <div className="h-48 bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                
                {/* Map Pins */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full animate-ping absolute -inset-2"></div>
                    <MapPin className="w-8 h-8 text-blue-600 relative z-10 drop-shadow-md" fill="#bfdbfe" />
                  </div>
                </div>
                <div className="absolute top-1/4 left-1/4">
                  <MapPin className="w-6 h-6 text-slate-500" fill="#f1f5f9" />
                </div>
                <div className="absolute bottom-1/4 right-1/3">
                  <MapPin className="w-6 h-6 text-slate-500" fill="#f1f5f9" />
                </div>
              </div>

              {/* Partner Card */}
              <div className="p-6 relative -mt-8">
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">District Industries Centre (DIC)</h4>
                      <p className="text-sm text-slate-500">Government Nodal Agency</p>
                    </div>
                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-200">VERIFIED</div>
                  </div>
                  
                  <div className="flex items-center text-sm text-slate-600 mb-4">
                    <Navigation className="w-4 h-4 mr-2 text-slate-400" />
                    <span>2.4 km away • Open until 5:00 PM</span>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">PMEGP Processing</span>
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">MSME Registration</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                    <button className="flex items-center justify-center py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors">
                      <Phone className="w-4 h-4 mr-2" /> Contact
                    </button>
                    <button className="flex items-center justify-center py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 transition-colors">
                      <Globe className="w-4 h-4 mr-2" /> Website
                    </button>
                  </div>
                </div>
                <div className="text-center mt-4 text-xs text-slate-400">Demo interface. Actual availability may vary.</div>
              </div>
            </div>
            
            <div className="absolute -z-10 bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-30"></div>
          </div>

          {/* Right: Copy */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {t('home.partnerTitle', 'Find the Right Support Channel')}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t('home.partnerDesc', 'Applying for a scheme is rarely a solo journey. Locate the correct nodal agencies, partner banks, incubators, and advisory services near you.')}
            </p>
            
            <ul className="space-y-6 mb-10">
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-2 mt-1">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-slate-900">Proximity Matching</h4>
                  <p className="text-sm text-slate-600 mt-1">Find agencies based on your registered business address or current location.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-amber-100 rounded-lg p-2 mt-1">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-slate-900">Expert Connect</h4>
                  <p className="text-sm text-slate-600 mt-1">Identify professionals and incubators who can help refine your application.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 rounded-lg p-2 mt-1">
                  <Star className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-slate-900">Verified Channels</h4>
                  <p className="text-sm text-slate-600 mt-1">Visual indicators for officially verified partner institutions and agencies.</p>
                </div>
              </li>
            </ul>

            <Link to="/about" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors">
              Find a Partner <Navigation className="w-4 h-4 ml-2" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
