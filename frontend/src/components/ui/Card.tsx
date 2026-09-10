import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
  const baseClasses = "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden";
  const hoverClasses = hoverable ? "hover:shadow-md hover:border-slate-300 transition-all duration-200" : "";
  const cursorClass = onClick ? "cursor-pointer" : "";

  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${cursorClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`px-6 py-6 sm:px-8 border-b border-slate-100 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <h3 className={`text-xl sm:text-2xl font-bold text-slate-900 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <p className={`text-slate-500 mt-2 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`px-6 py-5 sm:px-8 bg-slate-50/50 border-t border-slate-100 flex items-center ${className}`}>
      {children}
    </div>
  );
}
