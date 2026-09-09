import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, Calculator } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
              Empowering Marginilized Entrepreneurs with <span className="text-emerald-400">Avenik Core</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 drop-shadow-md">
              Discover financial schemes, calculate your EMI, and find the nearest channel partners seamlessly. Your journey to financial independence starts here.
            </p>
            <Link to="/apply" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-emerald-600/80 backdrop-blur-md border border-emerald-500/50 rounded-full hover:bg-emerald-600 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transform hover:-translate-y-1">
              Find Schemes Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white drop-shadow-md">Platform Features</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<CheckCircle2 className="h-10 w-10 text-emerald-400" />}
              title="Smart Scheme Matcher"
              description="Tell us your needs and eligibility, and our deterministic engine finds the perfect financial scheme for you instantly."
            />
            <FeatureCard 
              icon={<Calculator className="h-10 w-10 text-emerald-400" />}
              title="Financial Calculator"
              description="Transparent EMI and repayment schedule calculation considering moratorium periods and subsidies."
            />
            <FeatureCard 
              icon={<MapPin className="h-10 w-10 text-purple-400" />}
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
    <div className="glass-panel p-8 rounded-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="mb-6 inline-block p-4 bg-white/5 border border-white/10 rounded-xl shadow-inner">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}
