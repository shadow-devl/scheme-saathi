import React from 'react';

import AnnouncementBar from '../components/home/AnnouncementBar';
import HeroSection from '../components/home/HeroSection';
import QuickActions from '../components/home/QuickActions';
import PurposeSection from '../components/home/PurposeSection';
import HowItWorks from '../components/home/HowItWorks';
import CapabilitiesGrid from '../components/home/CapabilitiesGrid';
import DiscoveryShowcase from '../components/home/DiscoveryShowcase';
import EligibilityShowcase from '../components/home/EligibilityShowcase';
import FinancialShowcase from '../components/home/FinancialShowcase';
import PartnerShowcase from '../components/home/PartnerShowcase';
import ComparisonShowcase from '../components/home/ComparisonShowcase';
import GlobalPrograms from '../components/home/GlobalPrograms';
import Testimonials from '../components/home/Testimonials';
import TrustIndicators from '../components/home/TrustIndicators';
import NewsletterSection from '../components/home/NewsletterSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AnnouncementBar />
      <HeroSection />
      <QuickActions />
      <PurposeSection />
      <HowItWorks />
      <CapabilitiesGrid />
      <DiscoveryShowcase />
      <EligibilityShowcase />
      <FinancialShowcase />
      <PartnerShowcase />
      <ComparisonShowcase />
      <GlobalPrograms />
      <Testimonials />
      <TrustIndicators />
      <NewsletterSection />
    </div>
  );
}
