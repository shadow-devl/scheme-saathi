import { Shield, Lock, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function TrustIndicators() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Informational Accuracy</h3>
            <p className="text-sm text-slate-600 mb-4">
              We strive to keep our program database aligned with official notifications, but always refer to the official nodal agency for final determination.
            </p>
            <Link to="/legal/terms" className="text-xs text-blue-600 font-semibold hover:underline mt-auto">Read Disclaimer</Link>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-slate-700" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Data Privacy</h3>
            <p className="text-sm text-slate-600 mb-4">
              Your business profile and financial estimates are handled securely. We do not sell your personal data to third-party marketing firms.
            </p>
            <Link to="/legal/privacy" className="text-xs text-blue-600 font-semibold hover:underline mt-auto">Privacy Policy</Link>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Transparent Operation</h3>
            <p className="text-sm text-slate-600 mb-4">
              We are an independent technology platform, not a government entity or a bank. We clarify our role and data sources upfront.
            </p>
            <Link to="/legal/acceptable-use" className="text-xs text-blue-600 font-semibold hover:underline mt-auto">Acceptable Use</Link>
          </div>

        </div>
      </div>
    </section>
  );
}
