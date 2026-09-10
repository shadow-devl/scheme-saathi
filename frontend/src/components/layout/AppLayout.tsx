import React, { ReactNode } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer'; // Need to extract footer
import AnimatedBackground from '../AnimatedBackground';
import DemoBanner from '../DemoBanner';

interface AppLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export default function AppLayout({ children, showFooter = true }: AppLayoutProps) {
  return (
    <>
      <AnimatedBackground />
      <div className="flex flex-col min-h-screen relative z-10 w-full">
        <DemoBanner />
        <Navbar />
        <main className="flex-grow flex flex-col w-full relative">
        {children}
      </main>
      {showFooter && <Footer />}
      </div>
    </>
  );
}
