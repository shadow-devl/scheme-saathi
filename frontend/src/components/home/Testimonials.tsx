import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('home.testimonialTitle', 'What Entrepreneurs Say')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('home.testimonialSub', 'Hear from people who have used our platform to navigate government support.')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
            <Quote className="w-10 h-10 text-blue-100 absolute top-6 left-6 -z-0" />
            <div className="relative z-10">
              <p className="text-slate-700 mb-6 italic leading-relaxed pt-2">
                "I spent weeks trying to understand if my electronics repair shop was eligible for Mudra or PMEGP. The eligibility breakdown on Scheme Saathi showed me exactly what was required and saved me from applying for the wrong program."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg mr-4">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Rahul K.</h4>
                  <p className="text-xs text-slate-500">Service Sector Entrepreneur</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 bg-slate-100 text-slate-400 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">DEMO DATA</div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-blue-100 relative transform md:-translate-y-4">
            <Quote className="w-10 h-10 text-blue-100 absolute top-6 left-6 -z-0" />
            <div className="relative z-10">
              <p className="text-slate-700 mb-6 italic leading-relaxed pt-2">
                "The financial calculator was a game-changer. I finally understood how the 25% subsidy would actually affect my monthly EMI and how the margin money works. It gave me the confidence to approach the bank."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-lg mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Meera S.</h4>
                  <p className="text-xs text-slate-500">Manufacturing Setup</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 bg-slate-100 text-slate-400 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">DEMO DATA</div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
            <Quote className="w-10 h-10 text-blue-100 absolute top-6 left-6 -z-0" />
            <div className="relative z-10">
              <p className="text-slate-700 mb-6 italic leading-relaxed pt-2">
                "We were looking to expand our software agency globally and used the Global Programs feature. It's incredibly hard to find structured information about international startup visas and grants in one place."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-lg mr-4">
                  T
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Team TechCorp</h4>
                  <p className="text-xs text-slate-500">IT & Software</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 bg-slate-100 text-slate-400 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">DEMO DATA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
