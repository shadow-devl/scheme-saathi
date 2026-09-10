import { useState, useMemo, useEffect } from 'react';
import { Search, ExternalLink, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const globalSchemes = [
  { id: 1, country: 'India', name: 'MUDRA Yojana (Tarun)', description: 'Micro-credit scheme providing loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises.', url: 'https://www.mudra.org.in/' },
  { id: 2, country: 'India', name: 'Stand-Up India', description: 'Facilitates bank loans between ₹10 lakh and ₹1 Crore to at least one SC/ST borrower and one woman borrower per bank branch.', url: 'https://www.standupmitra.in/' },
  { id: 3, country: 'India', name: 'PMEGP', description: 'Prime Minister Employment Generation Programme providing subsidies up to 35% for rural businesses.', url: 'https://www.kviconline.gov.in/pmegpeportal/' },
  { id: 4, country: 'India', name: 'PM SVANidhi', description: 'Special micro-credit facility for street vendors to access working capital up to ₹50,000.', url: 'https://pmsvanidhi.mohua.gov.in/' },
  { id: 5, country: 'India', name: 'CGTMSE', description: 'Credit Guarantee Fund Trust for Micro and Small Enterprises, providing collateral-free loans.', url: 'https://www.cgtmse.in/' },
  { id: 6, country: 'India', name: 'Startup India Seed Fund', description: 'Provides financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.', url: 'https://seedfund.startupindia.gov.in/' },
  { id: 7, country: 'India', name: 'NSIC Subsidy', description: 'Fosters the growth of MSMEs by providing a set of customized services in finance, technology, and market support.', url: 'https://www.nsic.co.in/' },
  
  { id: 8, country: 'USA', name: 'SBA 7(a) Loan Program', description: 'The Small Business Administration’s primary program for providing financial assistance to small businesses.', url: 'https://www.sba.gov/funding-programs/loans/7a-loans' },
  { id: 9, country: 'USA', name: 'SBA Microloan Program', description: 'Provides loans up to $50,000 to help small businesses and certain not-for-profit childcare centers start up and expand.', url: 'https://www.sba.gov/funding-programs/loans/microloans' },
  { id: 10, country: 'USA', name: 'SBA 504 Loan Program', description: 'Provides long-term, fixed-rate financing for major fixed assets that promote business growth.', url: 'https://www.sba.gov/funding-programs/loans/504-loans' },
  { id: 11, country: 'USA', name: 'SBIR / STTR', description: 'Small Business Innovation Research / Small Business Technology Transfer programs for high-tech innovation.', url: 'https://www.sbir.gov/' },
  
  { id: 12, country: 'UK', name: 'Start Up Loans', description: 'Government-backed personal loans for business purposes of up to £25,000 at a fixed interest rate of 6% p.a.', url: 'https://www.startuploans.co.uk/' },
  { id: 13, country: 'UK', name: 'Innovate UK Smart Grants', description: 'Opportunity for UK registered organizations to apply for a share of up to £25m from Innovate UK for game-changing R&D innovation.', url: 'https://www.ukri.org/councils/innovate-uk/' },
  { id: 14, country: 'UK', name: 'Help to Grow', description: 'A government-backed program that helps small and medium-sized businesses learn new skills and adopt new software.', url: 'https://helptogrow.campaign.gov.uk/' },
  
  { id: 15, country: 'Canada', name: 'Canada Small Business Financing Program', description: 'Makes it easier for small businesses to get loans from financial institutions by sharing the risk with lenders.', url: 'https://ised-isde.canada.ca/site/canada-small-business-financing-program/en' },
  { id: 16, country: 'Canada', name: 'BDC Small Business Loan', description: 'Online financing up to $100,000 designed for businesses looking to protect cash flow.', url: 'https://www.bdc.ca/en/financing/small-business-loan' },
  { id: 17, country: 'Canada', name: 'CDAP', description: 'Canada Digital Adoption Program helps SMEs boost their e-commerce technology and adopt digital technologies.', url: 'https://ised-isde.canada.ca/site/canada-digital-adoption-program/en' },
  
  { id: 18, country: 'Australia', name: 'SME Guarantee Scheme', description: 'Supports Australian small businesses to recover from the impacts of COVID-19 by providing guaranteed loans.', url: 'https://treasury.gov.au/coronavirus/sme-guarantee-scheme' },
  { id: 19, country: 'Australia', name: 'Export Market Development Grants (EMDG)', description: 'Financial assistance program for aspiring and current exporters.', url: 'https://www.austrade.gov.au/australian/export/export-grants' },
  { id: 20, country: 'Australia', name: 'R&D Tax Incentive', description: 'Offers a tax offset to encourage companies to engage in research and development.', url: 'https://business.gov.au/grants-and-programs/research-and-development-tax-incentive' },
  
  { id: 21, country: 'Germany', name: 'KfW Entrepreneur Loan', description: 'Low-interest loans for founders, successors, and established companies to finance investments and working capital.', url: 'https://www.kfw.de/inlandsfoerderung/Companies/Start-up-and-succession/' },
  { id: 22, country: 'Germany', name: 'EXIST Business Start-up Grant', description: 'Supports students, graduates and scientists from universities and research institutes in preparing innovative technology start-ups.', url: 'https://www.exist.de/EN/Home/home_node.html' },
  
  { id: 23, country: 'France', name: 'Bpifrance Creation Loan', description: 'Unsecured loans to support the creation and takeover of very small businesses, usually in partnership with a bank.', url: 'https://www.bpifrance.fr/' },
  { id: 24, country: 'France', name: 'French Tech Seed', description: 'Fund to support technology start-ups in the post-incubation phase.', url: 'https://www.bpifrance.fr/catalogue-offres/creation/fonds-french-tech-seed' },
  
  { id: 25, country: 'Japan', name: 'JFC Micro Business and Network Loans', description: 'Loans offered by Japan Finance Corporation to small/micro businesses for startup and operational costs.', url: 'https://www.jfc.go.jp/n/english/' },
  { id: 26, country: 'Japan', name: 'METI Monodzukuri Subsidy', description: 'Supports SMEs in manufacturing and development of innovative services.', url: 'https://www.meti.go.jp/english/' },
  
  { id: 27, country: 'Singapore', name: 'Enterprise Financing Scheme (EFS)', description: 'Helps Singapore enterprises access financing more readily across various stages of growth.', url: 'https://www.enterprisesg.gov.sg/financial-assistance/loans/enterprise-financing-scheme' },
  { id: 28, country: 'Singapore', name: 'Startup SG Founder', description: 'Provides mentorship and a startup capital grant to first-time entrepreneurs.', url: 'https://www.startupsg.gov.sg/programmes/4894/startup-sg-founder' },
  
  { id: 29, country: 'Brazil', name: 'BNDES Microcredit', description: 'Financing program aimed at micro-entrepreneurs (formal and informal) for working capital and investments.', url: 'https://www.bndes.gov.br/' },
  { id: 30, country: 'Brazil', name: 'Pronampe', description: 'National Support Program for Micro and Small Enterprises to help with operational costs.', url: 'https://www.gov.br/empresas-e-negocios/pt-br/pronampe' },
  
  { id: 31, country: 'South Africa', name: 'SEFA Microfinance', description: 'Small Enterprise Finance Agency provides financial backing for small and micro businesses in South Africa.', url: 'https://www.sefa.org.za/' },
  { id: 32, country: 'South Africa', name: 'NYDA Grant Programme', description: 'Provides young entrepreneurs an opportunity to access both financial and non-financial business development support.', url: 'http://www.nyda.gov.za/' },
  
  { id: 33, country: 'Kenya', name: 'Youth Enterprise Development Fund', description: 'Provides financial and business development support services to youth-owned enterprises.', url: 'https://www.youthfund.go.ke/' },
  { id: 34, country: 'Kenya', name: 'Women Enterprise Fund', description: 'Provides accessible and affordable credit to support women start and/or expand business for wealth and employment creation.', url: 'https://www.wef.co.ke/' },
  
  { id: 35, country: 'New Zealand', name: 'Callaghan Innovation R&D Grants', description: 'Provides funding to help businesses add scale, return on investment and mitigate risk to R&D.', url: 'https://www.callaghaninnovation.govt.nz/' },
  { id: 36, country: 'Mexico', name: 'Fondo Nacional Emprendedor (INADEM)', description: 'Provides support to entrepreneurs and MSMEs to increase their productivity and competitiveness.', url: 'https://www.gob.mx/se' }
];

export default function GlobalSchemes() {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
    setPageInput('1');
  }, [selectedCountry, search]);

  const countries = ['All', ...Array.from(new Set(globalSchemes.map(s => s.country))).sort()];

  const filteredSchemes = useMemo(() => {
    return globalSchemes.filter(scheme => {
      const matchCountry = selectedCountry === 'All' || scheme.country === selectedCountry;
      const matchSearch = scheme.name.toLowerCase().includes(search.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(search.toLowerCase());
      return matchCountry && matchSearch;
    });
  }, [selectedCountry, search]);

  const totalPages = Math.ceil(filteredSchemes.length / itemsPerPage);
  const currentSchemes = filteredSchemes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-text-base tracking-tight flex items-center justify-center gap-3">
          <Globe className="h-10 w-10 text-primary" />
          Global Government Schemes
        </h1>
        <p className="mt-4 text-xl text-text-muted max-w-3xl mx-auto">
          Explore official government financial assistance and micro-loan programs across the globe for entrepreneurs and small businesses.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-card rounded-[17px] border border-border-subtle/60  border-border-subtle p-4 rounded-xl shadow-sm border border-border-subtle mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search schemes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white shadow-card rounded-[17px] border border-border-subtle/60 text-text-base border-border-subtle"
          />
        </div>
        
        <div className="w-full sm:w-auto flex items-center gap-2">
          <label className="text-sm font-medium text-text-base whitespace-nowrap">Filter by Country:</label>
          <select 
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full sm:w-48 bg-bg-base border border-border-subtle text-text-base text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-white shadow-card rounded-[17px] border border-border-subtle/60  border-border-subtle rounded-2xl p-6 shadow-sm border border-border-subtle hover:shadow-md transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wider">
                {scheme.country}
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-base mb-2">{scheme.name}</h3>
            <p className="text-text-muted text-sm flex-grow mb-6">{scheme.description}</p>
            
            <a 
              href={scheme.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center text-primary hover:text-blue-800 font-medium"
            >
              Visit Official Website <ExternalLink className="ml-1.5 h-4 w-4" />
            </a>
          </div>
        ))}
        {filteredSchemes.length === 0 && (
          <div className="col-span-full py-12 text-center text-text-muted">
            No schemes found matching your criteria.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 bg-white shadow-card rounded-[17px] border border-border-subtle/60  border border-border-subtle p-4 rounded-xl shadow-sm w-fit mx-auto">
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
