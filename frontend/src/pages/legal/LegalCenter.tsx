import LegalLayout from '../../components/LegalLayout';
import { Link } from 'react-router-dom';
import { Shield, FileText, Lock, Users } from 'lucide-react';

export default function LegalCenter() {
  return (
    <LegalLayout title="Legal, Trust, Privacy & Documentation Center" lastUpdated="10 September 2026">
      <div className="space-y-8">
        
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            Commitment to Trust & Security
          </h2>
          <p className="text-text-muted leading-relaxed">
            At Scheme Saathi, we prioritize your privacy, data security, and transparent business practices. 
            This documentation center serves as a centralized hub for all our legal agreements, policies, and 
            compliance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/legal/terms" className="glass-panel p-6 hover:bg-white/5 transition-colors group">
            <FileText className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium mb-2">Terms of Service</h3>
            <p className="text-sm text-text-muted">Rules and guidelines for using the Scheme Saathi platform and services.</p>
          </Link>
          
          <Link to="/legal/privacy" className="glass-panel p-6 hover:bg-white/5 transition-colors group">
            <Lock className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium mb-2">Privacy Policy</h3>
            <p className="text-sm text-text-muted">How we collect, use, and protect your personal and business data.</p>
          </Link>

          <Link to="/legal/acceptable-use" className="glass-panel p-6 hover:bg-white/5 transition-colors group">
            <Users className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium mb-2">Acceptable Use Policy</h3>
            <p className="text-sm text-text-muted">Guidelines on permitted and prohibited uses of our services.</p>
          </Link>
          
          <Link to="/legal/security" className="glass-panel p-6 hover:bg-white/5 transition-colors group">
            <Shield className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium mb-2">Security Policy</h3>
            <p className="text-sm text-text-muted">Our commitment to data protection and infrastructure security.</p>
          </Link>
          
          <Link to="/legal/cookies" className="glass-panel p-6 hover:bg-white/5 transition-colors group">
            <FileText className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-medium mb-2">Cookie Policy</h3>
            <p className="text-sm text-text-muted">Information about how we use cookies and tracking technologies.</p>
          </Link>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Legal Entity Information</h3>
          <ul className="space-y-2 text-sm text-text-muted bg-black/20 p-4 rounded-lg border border-white/5">
            <li><strong className="text-text-base">Website:</strong> https://schemesaathi.com</li>
            <li><strong className="text-text-base">Country of Registration:</strong> India</li>
            <li><strong className="text-text-base">Support Email:</strong> support@schemesaathi.com</li>
            <li><strong className="text-text-base">Legal Inquiries:</strong> legal@schemesaathi.com</li>
            <li><strong className="text-text-base">Security Reports:</strong> security@schemesaathi.com</li>
          </ul>
        </div>
      </div>
    </LegalLayout>
  );
}
