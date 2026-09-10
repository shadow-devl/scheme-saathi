import LegalLayout from '../../components/LegalLayout';

export default function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="10 September 2026">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. What are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you browse 
            websites. Our website, Scheme Saathi, uses cookies to help provide you with the best experience 
            we can.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. How We Use Cookies</h2>
          <p>We use cookies to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Make our website work as you'd expect.</li>
            <li>Remember your settings during and between visits.</li>
            <li>Improve the speed and security of the site.</li>
            <li>Allow you to share pages with social networks.</li>
            <li>Continuously improve our website for you.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Types of Cookies We Use</h2>
          <p><strong>Strictly Necessary Cookies:</strong> These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site.</p>
          <p className="mt-2"><strong>Performance Cookies:</strong> These cookies collect information about how you use our website, like which pages you visited and which links you clicked on. None of this information can be used to identify you. It is all aggregated and, therefore, anonymized.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Managing Cookies</h2>
          <p>
            You can usually switch cookies off by adjusting your browser settings to stop it from accepting 
            cookies. Doing so however will likely limit the functionality of our and a large proportion of 
            the world's websites as cookies are a standard part of most modern websites.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
