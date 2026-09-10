import { Code, Layers, Zap, Globe, FileText, ChevronRight } from 'lucide-react';

export default function Documentation() {
  return (
    <div className="max-w-[1500px] mx-auto py-12 px-4 sm:px-6 relative z-10 flex flex-col md:flex-row gap-12">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-24 glass-panel p-6 rounded-2xl border border-border-subtle hidden md:block">
           <h3 className="text-lg font-bold text-text-base mb-4">Contents</h3>
           <nav className="space-y-3">
              <a href="#matching-engine" className="flex items-center justify-between text-sm text-text-muted hover:text-primary transition-colors group">
                 Matching Engine <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#data-collection" className="flex items-center justify-between text-sm text-text-muted hover:text-primary transition-colors group">
                 Data Collection <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#global-directory" className="flex items-center justify-between text-sm text-text-muted hover:text-primary transition-colors group">
                 Global Directory <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#documents" className="flex items-center justify-between text-sm text-text-muted hover:text-primary transition-colors group">
                 Required Documents <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#emi-routing" className="flex items-center justify-between text-sm text-text-muted hover:text-primary transition-colors group">
                 EMI & Routing <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
           </nav>
        </div>
      </div>

      <div className="flex-1 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-text-base mb-4 ">Scheme Saathi Documentation</h1>
          <p className="text-xl text-text-muted ">Technical implementation details and platform architecture.</p>
        </div>

        <div className="space-y-12">
          <section id="matching-engine" className="glass-panel rounded-2xl shadow-xl border border-border-subtle p-8 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-text-base ">1. Scheme Matching Engine</h2>
          </div>
          <p className="text-text-muted mb-4 leading-relaxed">
            The intelligent matching engine evaluates applicant demographics (category, income, location, age, gender) against a dynamically updated database of active schemes. It implements multi-factor eligibility logic to pair an applicant with the scheme offering the lowest interest rates and highest maximum project coverage matching their profile.
          </p>
          <div className="bg-white  p-4 rounded-lg border border-border-subtle font-mono text-sm text-text-base">
            Eligibility Score = (Category Weight) + (Income Ceiling) + (Project Cost Caps) + (Demographic Modifiers)
          </div>
        </section>

        <section id="data-collection" className="glass-panel rounded-2xl shadow-xl border border-border-subtle p-8 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-text-base ">2. Multi-Layer Data Collection</h2>
          </div>
          <p className="text-text-muted mb-4 leading-relaxed">
            Scheme Saathi employs a multi-tiered data acquisition form designed to accurately profile applicants without causing form fatigue.
          </p>
          <ul className="list-disc pl-6 text-text-muted space-y-2 mb-4">
            <li><strong className="text-primary">Demographic Layer:</strong> Captures core identity information including Age, Gender, Education, and Social Category.</li>
            <li><strong className="text-primary">Financial Layer:</strong> Assesses creditworthiness through Family Income and Estimated Project Costs.</li>
            <li><strong className="text-primary">Sectoral Layer:</strong> Evaluates specific business sectors (e.g., Retail, Manufacturing, Agriculture) for targeted scheme matching.</li>
            <li><strong className="text-primary">Geospatial Layer:</strong> Employs HTML5 Geolocation with IP-based fallback to guarantee spatial coordinates for partner routing.</li>
          </ul>
        </section>

        <section id="global-directory" className="glass-panel rounded-2xl shadow-xl border border-border-subtle p-8 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-text-base ">3. Global Government Schemes Directory</h2>
          </div>
          <p className="text-text-muted mb-4 leading-relaxed">
            The platform curates an expansive, localized database of public financial aid programs across 11+ countries. Users can dynamically sort, search, and navigate directly to official government portals to proceed with their applications.
          </p>
          <div className="bg-white  p-4 rounded-lg border border-border-subtle font-mono text-sm text-text-base">
            Database coverage includes: USA (SBA), India (MUDRA), UK (Start Up Loans), EU Frameworks, and major emerging economies.
          </div>
        </section>

        <section id="documents" className="glass-panel rounded-2xl shadow-xl border border-border-subtle p-8 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-text-base ">4. Required Application Documents</h2>
          </div>
          <p className="text-text-muted mb-4 leading-relaxed">
            Standardization of compliance documentation ensures faster processing times. Common documents required by our channel partners include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white border border-border-subtle p-4 rounded-xl">
               <h4 className="font-bold text-blue-200 mb-2">Identity Proof</h4>
               <p className="text-sm text-text-muted">National ID, Passport, or Voter Card</p>
             </div>
             <div className="bg-white border border-border-subtle p-4 rounded-xl">
               <h4 className="font-bold text-blue-200 mb-2">Address Proof</h4>
               <p className="text-sm text-text-muted">Utility Bill, Rental Agreement, or Property Tax Receipt</p>
             </div>
             <div className="bg-white border border-border-subtle p-4 rounded-xl">
               <h4 className="font-bold text-blue-200 mb-2">Business Proof</h4>
               <p className="text-sm text-text-muted">Registration Certificate, License, or Tax Registration</p>
             </div>
             <div className="bg-white border border-border-subtle p-4 rounded-xl">
               <h4 className="font-bold text-blue-200 mb-2">Financials</h4>
               <p className="text-sm text-text-muted">Bank Statements (6 months), Project Report, ITR</p>
             </div>
          </div>
        </section>

        <section id="emi-routing" className="glass-panel rounded-2xl shadow-xl border border-border-subtle p-8 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-text-base ">5. EMI Calculator & Geo-Routing</h2>
          </div>
          <p className="text-text-muted leading-relaxed">
            Equated Monthly Installments (EMI) are calculated dynamically on a reducing balance basis. The engine deducts any specified Moratorium periods. Post-matching, the system leverages the Haversine formula to compute great-circle distances and route the application to the nearest eligible partner institution based on active budgets and non-performing asset (NPA) thresholds.
          </p>
      </div>
    </div>
  );
}
