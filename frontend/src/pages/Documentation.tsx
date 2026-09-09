import { Code, Layers, Zap, Globe, FileText } from 'lucide-react';

export default function Documentation() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-md">Avenik Core Documentation</h1>
        <p className="text-xl text-gray-300 drop-shadow-sm">Technical implementation details and platform architecture.</p>
      </div>

      <div className="space-y-12">
        <section className="glass-panel rounded-2xl shadow-xl border border-white/10 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="h-8 w-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white drop-shadow-md">1. Scheme Matching Engine</h2>
          </div>
          <p className="text-gray-300 mb-4 leading-relaxed">
            The intelligent matching engine evaluates applicant demographics (category, income, location, age, gender) against a dynamically updated database of active schemes. It implements multi-factor eligibility logic to pair an applicant with the scheme offering the lowest interest rates and highest maximum project coverage matching their profile.
          </p>
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10 font-mono text-sm text-gray-200">
            Eligibility Score = (Category Weight) + (Income Ceiling) + (Project Cost Caps) + (Demographic Modifiers)
          </div>
        </section>

        <section className="glass-panel rounded-2xl shadow-xl border border-white/10 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="h-8 w-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white drop-shadow-md">2. Multi-Layer Data Collection</h2>
          </div>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Avenik Core employs a multi-tiered data acquisition form designed to accurately profile applicants without causing form fatigue.
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
            <li><strong className="text-blue-300">Demographic Layer:</strong> Captures core identity information including Age, Gender, Education, and Social Category.</li>
            <li><strong className="text-blue-300">Financial Layer:</strong> Assesses creditworthiness through Family Income and Estimated Project Costs.</li>
            <li><strong className="text-blue-300">Sectoral Layer:</strong> Evaluates specific business sectors (e.g., Retail, Manufacturing, Agriculture) for targeted scheme matching.</li>
            <li><strong className="text-blue-300">Geospatial Layer:</strong> Employs HTML5 Geolocation with IP-based fallback to guarantee spatial coordinates for partner routing.</li>
          </ul>
        </section>

        <section className="glass-panel rounded-2xl shadow-xl border border-white/10 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-8 w-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white drop-shadow-md">3. Global Government Schemes Directory</h2>
          </div>
          <p className="text-gray-300 mb-4 leading-relaxed">
            The platform curates an expansive, localized database of public financial aid programs across 11+ countries. Users can dynamically sort, search, and navigate directly to official government portals to proceed with their applications.
          </p>
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10 font-mono text-sm text-gray-200">
            Database coverage includes: USA (SBA), India (MUDRA), UK (Start Up Loans), EU Frameworks, and major emerging economies.
          </div>
        </section>

        <section className="glass-panel rounded-2xl shadow-xl border border-white/10 p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white drop-shadow-md">4. Required Application Documents</h2>
          </div>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Standardization of compliance documentation ensures faster processing times. Common documents required by our channel partners include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
               <h4 className="font-bold text-blue-200 mb-2">Identity Proof</h4>
               <p className="text-sm text-gray-400">National ID, Passport, or Voter Card</p>
             </div>
             <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
               <h4 className="font-bold text-blue-200 mb-2">Address Proof</h4>
               <p className="text-sm text-gray-400">Utility Bill, Rental Agreement, or Property Tax Receipt</p>
             </div>
             <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
               <h4 className="font-bold text-blue-200 mb-2">Business Proof</h4>
               <p className="text-sm text-gray-400">Registration Certificate, License, or Tax Registration</p>
             </div>
             <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
               <h4 className="font-bold text-blue-200 mb-2">Financials</h4>
               <p className="text-sm text-gray-400">Bank Statements (6 months), Project Report, ITR</p>
             </div>
          </div>
        </section>

        <section className="glass-panel rounded-2xl shadow-xl border border-white/10 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-8 w-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white drop-shadow-md">5. EMI Calculator & Geo-Routing</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Equated Monthly Installments (EMI) are calculated dynamically on a reducing balance basis. The engine deducts any specified Moratorium periods. Post-matching, the system leverages the Haversine formula to compute great-circle distances and route the application to the nearest eligible partner institution based on active budgets and non-performing asset (NPA) thresholds.
          </p>
        </section>
      </div>
    </div>
  );
}
