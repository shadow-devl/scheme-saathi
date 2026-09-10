import { Link } from 'react-router-dom';
import { Search, CheckSquare, Calculator, MapPin, ArrowRightLeft, Globe, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function QuickActions() {
  const { t } = useTranslation();

  const actions = [
    {
      title: 'Find a Scheme',
      description: 'Search for schemes based on your needs, profile and business situation.',
      icon: Search,
      color: 'blue',
      link: '/apply',
      cta: 'Find Schemes'
    },
    {
      title: 'Check Eligibility',
      description: 'Understand the key eligibility conditions before applying.',
      icon: CheckSquare,
      color: 'green',
      link: '/apply', // Assuming intake form leads to eligibility
      cta: 'Check Eligibility'
    },
    {
      title: 'Calculate Loan/EMI',
      description: 'Estimate repayment schedules and understand financial commitments.',
      icon: Calculator,
      color: 'purple',
      link: '/compare', // Link to finance/compare tools
      cta: 'Calculate'
    },
    {
      title: 'Find a Partner',
      description: 'Locate relevant support channels and partner institutions.',
      icon: MapPin,
      color: 'amber',
      link: '/about', // Link to partner locator when built
      cta: 'Find Partners'
    },
    {
      title: 'Compare Opportunities',
      description: 'Compare schemes using important eligibility and benefit criteria.',
      icon: ArrowRightLeft,
      color: 'teal',
      link: '/compare',
      cta: 'Compare'
    },
    {
      title: 'Explore Global Programs',
      description: 'Discover government and institutional opportunities beyond your current jurisdiction.',
      icon: Globe,
      color: 'indigo',
      link: '/global-schemes',
      cta: 'Explore Global'
    }
  ];

  const getColorClasses = (color: string) => {
    const map: Record<string, string> = {
      blue: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
      green: 'bg-green-50 text-green-600 border-green-100 group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600',
      purple: 'bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600',
      amber: 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500',
      teal: 'bg-teal-50 text-teal-600 border-teal-100 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600',
    };
    return map[color] || map.blue;
  };

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('home.quickActionsTitle', 'What do you want to do?')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('home.quickActionsSub', 'Choose a starting point based on where you are in your journey.')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {actions.map((action, idx) => (
            <Link 
              key={idx} 
              to={action.link}
              className="group flex flex-col bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-colors duration-300 mb-6 ${getColorClasses(action.color)}`}>
                <action.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{action.title}</h3>
              <p className="text-slate-600 mb-8 flex-grow">{action.description}</p>
              
              <div className="flex items-center text-slate-900 font-semibold group-hover:text-blue-600 transition-colors">
                {action.cta} <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
