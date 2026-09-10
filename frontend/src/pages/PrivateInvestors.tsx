import { useState, useEffect } from 'react';
import { ExternalLink, Search, Globe, TrendingUp, Building, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const GLOBAL_INVESTORS = [
  {
    id: 1,
    name: 'Y Combinator',
    region: 'Global / USA',
    focus: 'Seed / Early Stage',
    sectors: 'Agnostic, Tech, AI, B2B',
    description: 'Provides seed funding for startups. Known for funding Stripe, Airbnb, Coinbase, and Dropbox.',
    link: 'https://www.ycombinator.com/'
  },
  {
    id: 2,
    name: 'Sequoia Capital',
    region: 'Global',
    focus: 'Seed to Late Stage',
    sectors: 'Tech, Consumer, Enterprise, Crypto',
    description: 'One of the most prominent VC firms globally, backing legendary companies from Apple to WhatsApp.',
    link: 'https://www.sequoiacap.com/'
  },
  {
    id: 3,
    name: 'Andreessen Horowitz (a16z)',
    region: 'Global / USA',
    focus: 'Multi-stage',
    sectors: 'AI, Crypto, Bio, Games, Enterprise',
    description: 'Backs bold entrepreneurs building the future through technology.',
    link: 'https://a16z.com/'
  },
  {
    id: 4,
    name: 'SoftBank Vision Fund',
    region: 'Global',
    focus: 'Late Stage / Growth',
    sectors: 'Deeptech, AI, Robotics, E-commerce',
    description: 'The world\'s largest technology-focused investment fund.',
    link: 'https://visionfund.com/'
  },
  {
    id: 5,
    name: '500 Global',
    region: 'Global',
    focus: 'Early Stage',
    sectors: 'Agnostic',
    description: 'Venture capital firm that invests early in founders building fast-growing technology companies.',
    link: 'https://500.co/'
  },
  {
    id: 6,
    name: 'Peak XV Partners (formerly Sequoia India/SEA)',
    region: 'India & South East Asia',
    focus: 'Seed to Growth',
    sectors: 'SaaS, Consumer, Fintech, Web3',
    description: 'A leading venture capital firm investing across India, South East Asia and beyond.',
    link: 'https://www.peakxv.com/'
  },
  {
    id: 7,
    name: 'Antler',
    region: 'Global (Day Zero)',
    focus: 'Pre-Seed / Seed',
    sectors: 'Agnostic',
    description: 'A global early-stage VC enabling and investing in the world\'s most exceptional people.',
    link: 'https://www.antler.co/'
  },
  {
    id: 8,
    name: 'Techstars',
    region: 'Global',
    focus: 'Pre-Seed',
    sectors: 'Agnostic',
    description: 'A global investment business that provides access to capital, one-on-one mentorship, and customized programming for early-stage entrepreneurs.',
    link: 'https://www.techstars.com/'
  },
  {
    id: 9,
    name: 'Index Ventures',
    region: 'Europe & USA',
    focus: 'Early to Growth',
    sectors: 'Tech, Gaming, E-commerce, SaaS',
    description: 'A European-rooted, global venture capital firm backing transformative entrepreneurs.',
    link: 'https://www.indexventures.com/'
  },
  {
    id: 10,
    name: 'Accel',
    region: 'Global',
    focus: 'Early & Growth Stage',
    sectors: 'Cloud, Cybersecurity, Fintech, Consumer',
    description: 'A global venture capital firm that is the first partner to exceptional teams everywhere.',
    link: 'https://www.accel.com/'
  },
  {
    id: 11,
    name: 'Lightspeed Venture Partners',
    region: 'Global',
    focus: 'Multi-stage',
    sectors: 'Enterprise, Consumer, Health, Fintech',
    description: 'A global multi-stage venture capital firm focused on accelerating disruptive innovations.',
    link: 'https://lsvp.com/'
  },
  {
    id: 12,
    name: 'Tiger Global Management',
    region: 'Global',
    focus: 'Growth & Pre-IPO',
    sectors: 'Internet, Software, Consumer, Financial Tech',
    description: 'An investment firm focused on public and private companies in the global Internet, software, consumer, and financial technology industries.',
    link: 'https://www.tigerglobal.com/'
  },
  {
    id: 13,
    name: 'Bessemer Venture Partners',
    region: 'Global',
    focus: 'Seed to Growth',
    sectors: 'Enterprise, Consumer, Healthcare',
    description: 'Helps entrepreneurs lay strong foundations to build and forge long-standing companies.',
    link: 'https://www.bvp.com/'
  },
  {
    id: 14,
    name: 'Founders Fund',
    region: 'USA / Global',
    focus: 'Seed to Late Stage',
    sectors: 'Space, AI, Deeptech, Internet',
    description: 'Invests in smart people solving difficult problems, often taking contrarian bets.',
    link: 'https://foundersfund.com/'
  },
  {
    id: 15,
    name: 'Balderton Capital',
    region: 'Europe',
    focus: 'Early Stage',
    sectors: 'Tech, Fintech, Consumer',
    description: 'Europe\'s leading early-stage venture capital investor, focused exclusively on European-founded technology companies.',
    link: 'https://www.balderton.com/'
  }
];

const REGIONS = ['All', 'Global', 'Global / USA', 'India & South East Asia', 'Europe', 'Europe & USA', 'USA / Global'];

export default function PrivateInvestors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
    setPageInput('1');
  }, [selectedRegion, searchTerm]);

  const filteredInvestors = GLOBAL_INVESTORS.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inv.sectors.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || inv.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const totalPages = Math.ceil(filteredInvestors.length / itemsPerPage);
  const currentInvestors = filteredInvestors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(pageInput);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setPageInput(page.toString());
    } else {
      setPageInput(currentPage.toString());
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageInput((currentPage - 1).toString());
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPageInput((currentPage + 1).toString());
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-base mb-4 ">Global Private Investors & VCs</h1>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto ">
          Connect with top-tier venture capital firms, angel networks, and private equity available to invest in startups and businesses worldwide.
        </p>
      </div>

      {/* Filters */}
      <div className="glass-panel p-6 rounded-2xl border border-border-subtle mb-8 flex flex-col md:flex-row gap-4 justify-between items-center shadow-xl">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search by investor name or sector (e.g., AI, Fintech)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-border-subtle rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-text-base placeholder-slate-400 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <Filter className="w-5 h-5 text-primary flex-shrink-0" />
          {REGIONS.map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-all ${
                selectedRegion === region 
                  ? 'bg-blue-600 text-white shadow-lg shadow-card' 
                  : 'bg-white text-text-muted hover:bg-slate-50 border border-border-subtle'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentInvestors.map(inv => (
          <div key={inv.id} className="glass-panel rounded-2xl overflow-hidden border border-border-subtle hover:border-blue-200 transition-all hover:-translate-y-1 shadow-lg hover:shadow-blue-500/20 flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-text-base leading-tight">{inv.name}</h3>
                <Building className="w-6 h-6 text-primary opacity-80 flex-shrink-0" />
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span><strong className="text-text-muted">Region:</strong> {inv.region}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span><strong className="text-text-muted">Stage:</strong> {inv.focus}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary/80 mb-2">Focus Sectors</p>
                <div className="flex flex-wrap gap-2">
                  {inv.sectors.split(',').map(sector => (
                    <span key={sector} className="px-2 py-1 bg-white border border-border-subtle rounded-md text-xs text-text-muted">
                      {sector.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-text-muted leading-relaxed">
                {inv.description}
              </p>
            </div>
            
            <div className="p-4 border-t border-border-subtle bg-slate-50">
              <a 
                href={inv.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-600 text-blue-800 hover:text-white py-3 rounded-xl transition-all border border-blue-200 hover:border-transparent font-medium"
              >
                Visit Investor Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredInvestors.length === 0 && (
        <div className="text-center py-20 glass-panel rounded-2xl border border-border-subtle">
          <Globe className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-text-muted mb-2">No investors found</h3>
          <p className="text-text-muted">Try adjusting your search or region filters.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 glass-panel border border-border-subtle p-4 rounded-xl shadow-xl w-fit mx-auto">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-100 transition-colors border border-blue-200"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          
          <div className="flex items-center gap-3 text-text-muted">
            <span>Page</span>
            <form onSubmit={handlePageSubmit} className="flex items-center">
              <input 
                type="number" 
                min="1" 
                max={totalPages}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={handlePageSubmit}
                className="w-16 px-2 py-1 text-center bg-white border border-border-subtle rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-text-base"
              />
            </form>
            <span>of {totalPages}</span>
          </div>

          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-100 transition-colors border border-blue-200"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
