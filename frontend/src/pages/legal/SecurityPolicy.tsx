import LegalLayout from '../../components/LegalLayout';
import { ShieldCheck, Mail, Lock, Server, Users } from 'lucide-react';

export default function SecurityPolicy() {
  return (
    <LegalLayout title="Security Policy" lastUpdated="10 September 2026">
      <div className="space-y-8 text-text-base">
        
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            Our Security Commitment
          </h2>
          <p className="text-text-muted leading-relaxed">
            At Scheme Saathi, we understand that the data you share with us—whether personal, financial, or business-related—is highly sensitive. We are committed to maintaining the highest standards of security to protect your information against unauthorized access, disclosure, alteration, and destruction.
          </p>
        </div>

        <section>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            Infrastructure Security
          </h3>
          <p className="text-text-muted mb-4 leading-relaxed">
            Our platform is built on enterprise-grade cloud infrastructure. We implement multi-layered security protocols including:
          </p>
          <ul className="list-disc pl-6 text-text-muted space-y-2 mb-4">
            <li>End-to-end encryption for all data in transit using TLS 1.3.</li>
            <li>Encryption at rest for all databases and sensitive storage.</li>
            <li>Regular automated vulnerability scanning and penetration testing.</li>
            <li>Strict firewall policies and DDoS protection mechanisms.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Data Protection & Access Control
          </h3>
          <p className="text-text-muted mb-4 leading-relaxed">
            We operate on a principle of least privilege. Access to production environments and user data is strictly limited to authorized personnel who require such access to perform their duties.
          </p>
          <ul className="list-disc pl-6 text-text-muted space-y-2 mb-4">
            <li>Multi-factor authentication (MFA) is mandatory for all administrative access.</li>
            <li>Comprehensive audit logging is maintained for all system access and administrative actions.</li>
            <li>Employee background checks and mandatory security training.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            User Responsibilities
          </h3>
          <p className="text-text-muted mb-4 leading-relaxed">
            Security is a shared responsibility. We ask our users to:
          </p>
          <ul className="list-disc pl-6 text-text-muted space-y-2 mb-4">
            <li>Use strong, unique passwords for their Scheme Saathi accounts.</li>
            <li>Never share their login credentials with unauthorized individuals.</li>
            <li>Ensure that any documents uploaded do not contain unnecessary sensitive personal information (SPI) unless explicitly required by a scheme application.</li>
            <li>Promptly notify us of any suspected unauthorized access to their accounts.</li>
          </ul>
        </section>

        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-12">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
            <Mail className="w-5 h-5 text-slate-600" />
            Reporting Security Issues
          </h3>
          <p className="text-slate-600 mb-4 leading-relaxed">
            We value the work of security researchers and our user community in helping to keep our systems secure. If you believe you have discovered a vulnerability in the Scheme Saathi platform, please report it to us immediately.
          </p>
          <p className="text-slate-600 font-medium">
            Send your security reports to:{' '}
            <a href="mailto:security@schemesaathi.com" className="text-blue-600 hover:underline font-bold">
              security@schemesaathi.com
            </a>
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Please allow up to 48 hours for our security team to acknowledge your report. We ask that you do not publicly disclose the vulnerability until we have had an opportunity to address it.
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
