import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, Calculator } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold text-text-base tracking-tight mb-6">
              Empowering Marginilized Entrepreneurs with <span className="text-blue-600">Scheme Saathi</span>
            </h1>
            <p className="text-xl text-text-muted mb-10">
              Discover financial schemes, calculate your EMI, and find the nearest channel partners seamlessly. Your journey to financial independence starts here.
            </p>
            <Link to="/apply" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 backdrop-blur-md border border-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 transform hover:-translate-y-1">
              Find Schemes Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-base">Platform Features</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<CheckCircle2 className="h-10 w-10 text-blue-600" />}
              title="Smart Scheme Matcher"
              description="Tell us your needs and eligibility, and our deterministic engine finds the perfect financial scheme for you instantly."
            />
            <FeatureCard 
              icon={<Calculator className="h-10 w-10 text-blue-600" />}
              title="Financial Calculator"
              description="Transparent EMI and repayment schedule calculation considering moratorium periods and subsidies."
            />
            <FeatureCard 
              icon={<MapPin className="h-10 w-10 text-purple-600" />}
              title="Geo-Spatial Partner Locator"
              description="Find the nearest active Channel Partners (SCAs/PSBs) with available funds to process your application faster."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-panel p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="mb-6 inline-block p-4 bg-blue-50 border border-blue-100 rounded-xl">{icon}</div>
      <h3 className="text-xl font-bold text-text-base mb-3">{title}</h3>
      <p className="text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}
