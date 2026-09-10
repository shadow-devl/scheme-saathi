import LegalLayout from '../../components/LegalLayout';

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="10 September 2026">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            Scheme Saathi ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you visit our website 
            or use our entrepreneurial technology platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number.</li>
            <li><strong>Business Data:</strong> Information relating to your startup, financials, pitch decks, and organizational structure.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Platform, such as your IP address, browser type, and operating system.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Create and manage your account.</li>
            <li>Match you with relevant investors, schemes, and mentors.</li>
            <li>Email you regarding your account or application status.</li>
            <li>Fulfill and manage purchases, orders, and payments.</li>
            <li>Generate a personal profile about you to make future visits to the Platform more personalized.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal 
            information. While we have taken reasonable steps to secure the personal information you provide 
            to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: 
            <a href="mailto:privacy@schemesaathi.com" className="text-primary hover:underline ml-1">privacy@schemesaathi.com</a>.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
