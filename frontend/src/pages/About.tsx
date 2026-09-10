export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl shadow-sm border border-border-subtle relative overflow-hidden">
        <h1 className="text-4xl font-extrabold text-text-base text-center mb-8 ">About Scheme Saathi</h1>
        
        <div className="prose prose-indigo prose-lg mx-auto text-text-muted">
          <p className="leading-relaxed">
            Scheme Saathi is a next-generation civic technology platform designed to bridge the gap between government financial schemes and the marginalized entrepreneurs who need them most.
          </p>
          
          <h3 className="text-2xl font-bold text-text-base mt-10 mb-4 ">Our Mission</h3>
          <p className="leading-relaxed">
            Our mission is to democratize access to financial support. Navigating government bureaucracy and finding eligible grants, micro-loans, and business support can be overwhelmingly complex. We simplify this process by using intelligent matching algorithms to instantly connect users with the schemes they qualify for.
          </p>

          <h3 className="text-2xl font-bold text-text-base mt-10 mb-4 ">How It Works</h3>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-primary">Data Ingestion:</strong> We maintain a real-time database of central and state-level financial schemes.</li>
            <li><strong className="text-primary">Smart Matching:</strong> Applicants provide their demographic and financial details via our multi-step wizard.</li>
            <li><strong className="text-primary">Instant Eligibility:</strong> Our engine scores the data and matches the applicant with the highest-yield scheme.</li>
            <li><strong className="text-primary">Geo-Routing:</strong> We locate the nearest partner banks with available funding budgets to disburse the loan.</li>
          </ul>

          <h3 className="text-2xl font-bold text-text-base mt-10 mb-4 ">Our Vision</h3>
          <p className="leading-relaxed">
            We envision a world where every aspiring entrepreneur, regardless of their background or geographic location, has immediate, transparent access to the capital they need to build their future.
          </p>
        </div>
      </div>
    </div>
  );
}
