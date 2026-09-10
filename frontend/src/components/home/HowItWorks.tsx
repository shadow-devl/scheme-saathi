import { useTranslation } from 'react-i18next';
import { Target, UserCheck, Sparkles, ClipboardCheck, ArrowRightCircle } from 'lucide-react';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Target,
      title: '1. Tell Us About Your Goal',
      description: 'The user explains what they want to accomplish.',
    },
    {
      icon: UserCheck,
      title: '2. Understand Your Situation',
      description: 'Scheme Saathi uses relevant profile and business information.',
    },
    {
      icon: Sparkles,
      title: '3. Find Relevant Opportunities',
      description: 'The platform identifies potentially relevant schemes and opportunities.',
    },
    {
      icon: ClipboardCheck,
      title: '4. Check Important Conditions',
      description: 'The user reviews eligibility, benefits, requirements and financial considerations.',
    },
    {
      icon: ArrowRightCircle,
      title: '5. Take the Next Step',
      description: 'The user can proceed toward the appropriate application or support channel.',
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            {t('home.howItWorksTitle', 'How Scheme Saathi Works')}
          </h2>
        </div>

        {/* Desktop Horizontal Journey */}
        <div className="hidden lg:block relative mt-20 mb-10">
          <div className="absolute top-8 left-0 right-0 h-1 bg-slate-100 rounded-full z-0"></div>
          <div className="absolute top-8 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full z-0 opacity-20"></div>
          
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center mb-6 group-hover:border-blue-500 group-hover:scale-110 transition-all shadow-sm">
                  <step.icon className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden relative space-y-8 pl-4 py-4">
          <div className="absolute top-4 bottom-4 left-[31px] w-1 bg-slate-100 rounded-full z-0"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex gap-6 items-start">
              <div className="w-12 h-12 shrink-0 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center shadow-sm">
                <step.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="pt-2">
                <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
