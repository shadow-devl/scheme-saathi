export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl shadow-sm border border-border-subtle">
        <h1 className="text-4xl font-extrabold text-text-base mb-10  text-center">Terms of Service & Privacy Policy</h1>
        
        <div className="space-y-10 text-text-muted">
          <section>
            <h2 className="text-2xl font-bold text-text-base mb-3 flex items-center"><span className="text-primary mr-3">1.</span> Acceptance of Terms</h2>
            <p className="leading-relaxed pl-8">By accessing and using the Scheme Saathi platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-base mb-3 flex items-center"><span className="text-primary mr-3">2.</span> Data Privacy & Collection</h2>
            <div className="pl-8">
              <p className="mb-4 leading-relaxed">Scheme Saathi respects your privacy. During the scheme matching process, we collect demographic, financial, and geographical data. This data is strictly used for:</p>
              <ul className="list-disc pl-6 space-y-2 text-blue-100">
                <li>Matching you with eligible government schemes.</li>
                <li>Locating nearby channel partners and banks.</li>
                <li>Aggregated analytics for government administration (anonymized).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-base mb-3 flex items-center"><span className="text-primary mr-3">3.</span> External Links Disclaimer</h2>
            <p className="leading-relaxed pl-8">The Global Schemes directory contains links to external government websites. Scheme Saathi is not responsible for the content, privacy policies, or practices of any third-party websites. Users are advised to read the terms and conditions of those external sites.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-base mb-3 flex items-center"><span className="text-primary mr-3">4.</span> Limitation of Liability</h2>
            <p className="leading-relaxed pl-8">While we strive for accuracy, the loan amounts, interest rates, and eligibility criteria displayed by the matching engine are estimates based on available data. Final loan approval and terms are strictly at the discretion of the respective channel partner and government guidelines.</p>
          </section>

          <div className="mt-12 pt-8 border-t border-border-subtle text-center">
            <p className="text-sm text-text-muted">
              Last Updated: September 9, 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
