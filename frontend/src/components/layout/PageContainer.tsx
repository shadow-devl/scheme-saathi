import React, { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  width?: 'standard' | 'wide' | 'narrow' | 'full';
  className?: string;
  withVerticalPadding?: boolean;
}

export default function PageContainer({ 
  children, 
  width = 'standard', 
  className = '',
  withVerticalPadding = true 
}: PageContainerProps) {
  
  const widthClasses = {
    standard: 'max-w-7xl', // ~1280px
    wide: 'max-w-[1500px]', // ~1500px for dashboard/data heavy
    narrow: 'max-w-4xl', // ~900px for forms
    full: 'max-w-full'
  };

  const paddingClasses = withVerticalPadding ? 'py-12 md:py-16' : '';

  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${widthClasses[width]} ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
}
