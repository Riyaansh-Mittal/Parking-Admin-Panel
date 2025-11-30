import { ReactNode } from 'react';
import { cn } from '@utils';

interface DashboardLayoutProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  stats?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const DashboardLayout = ({
  title = 'Dashboard',
  subtitle,
  actions,
  stats,
  children,
  className,
}: DashboardLayoutProps) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Stats Section */}
      {stats && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats}</div>}

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">{children}</div>
    </div>
  );
};

DashboardLayout.displayName = 'DashboardLayout';
