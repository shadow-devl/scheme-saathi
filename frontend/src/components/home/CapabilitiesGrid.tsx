import { useTranslation } from 'react-i18next';
import { 
  Compass, CheckSquare, Calculator, Banknote, 
  MapPin, Scale, Globe, FileText, FileSearch, 
  BellRing, Accessibility, Languages 
} from 'lucide-react';

export default function CapabilitiesGrid() {
  const { t } = useTranslation();

  const capabilities = [
    { icon: Compass, title: 'Scheme Discovery', desc: 'Find schemes intelligently matched to your profile.' },
    { icon: CheckSquare, title: 'Eligibility Understanding', desc: 'Break down complex government requirements.' },
    { icon: Calculator, title: 'Financial Calculator', desc: 'Estimate EMIs, subsidies, and capital needs.' },
    { icon: Banknote, title: 'Loan Information', desc: 'Understand banking and lending criteria.' },
    { icon: MapPin, title: 'Partner Locator', desc: 'Find local agencies and support institutions.' },
    { icon: Scale, title: 'Scheme Comparison', desc: 'Compare benefits side by side.' },
    { icon: Globe, title: 'Global Programs', desc: 'Explore cross-border entrepreneurial support.' },
    { icon: FileText, title: 'Application Guidance', desc: 'Understand the steps to apply successfully.' },
    { icon: FileSearch, title: 'Document Guidance', desc: 'Know exactly what paperwork you need.' },
    { icon: BellRing, title: 'Notifications', desc: 'Stay updated on deadlines and changes.' },
    { icon: Accessibility, title: 'Accessible Experience', desc: 'Designed for high contrast and screen readers.' },
    { icon: Languages, title: 'Multilingual Support', desc: 'Read information in your preferred language.' },
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('home.capabilitiesTitle', 'Everything You Need to Navigate Support Opportunities')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('home.capabilitiesSub', 'A comprehensive suite of tools built for entrepreneurs.')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                <cap.icon className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{cap.title}</h3>
              <p className="text-sm text-slate-600">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
