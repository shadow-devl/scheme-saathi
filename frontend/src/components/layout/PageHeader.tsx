import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string | ReactNode;
  eyebrow?: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  eyebrow,
  breadcrumbs,
  primaryAction,
  secondaryAction,
  className = ''
}: PageHeaderProps) {
  return (
    <div className={`mb-12 border-b border-slate-200/60 pb-8 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-6 font-medium">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-blue-600 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-800">{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Eyebrow */}
      {eyebrow && (
        <div className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-3">
          {eyebrow}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {title}
          </h1>
          {description && (
            <div className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              {description}
            </div>
          )}
        </div>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
            {secondaryAction}
            {primaryAction}
          </div>
        )}
      </div>
    </div>
  );
}
