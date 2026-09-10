import LegalLayout from '../../components/LegalLayout';

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="10 September 2026">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Scheme Saathi platform ("Platform"), you agree to be bound by these 
            Terms of Service ("Terms"). If you do not agree to all the terms and conditions, then you may 
            not access the website or use any services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
          <p>
            Scheme Saathi provides an entrepreneurial technology platform designed to help individuals, 
            students, entrepreneurs, businesses, organizations, mentors, advisors, investors, incubators, 
            accelerators, corporates, suppliers, distributors, service providers, freelance professionals, 
            content creators, NGOs, government entities, researchers, academic institutions, and other 
            ecosystem participants.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
          <p>
            To access certain features of the Platform, you must register for an account. You agree to 
            provide accurate, current, and complete information during the registration process and to 
            update such information to keep it accurate, current, and complete.
          </p>
          <p className="mt-2">
            You are responsible for safeguarding the password that you use to access the Platform and for 
            any activities or actions under your password. You agree not to disclose your password to any 
            third party.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
          <p>
            The Platform and its original content, features, and functionality are and will remain the 
            exclusive property of Scheme Saathi and its licensors. The Platform is protected by copyright, 
            trademark, and other laws of India and foreign countries.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
          <p>
            In no event shall Scheme Saathi, nor its directors, employees, partners, agents, suppliers, 
            or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, 
            including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
            resulting from your access to or use of or inability to access or use the Platform.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">6. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard 
            to its conflict of law provisions.
          </p>
        </section>

        <div className="bg-black/20 p-6 rounded-lg mt-8 border border-white/10">
          <p className="text-sm italic text-text-muted">
            This is a summary of the Terms of Service. For the full legal text encompassing all 112 sections 
            of the Scheme Saathi documentation, please contact our legal department at <a href="mailto:legal@schemesaathi.com" className="text-primary hover:underline">legal@schemesaathi.com</a>.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
