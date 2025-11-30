import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  header?: ReactNode;
}

export const DashboardLayout = ({
  children,
  header,
}: DashboardLayoutProps) => {
  return (
    <div className="space-y-6">
      {header}
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {children}
      </div>
    </div>
  );
};

DashboardLayout.displayName = 'DashboardLayout';
