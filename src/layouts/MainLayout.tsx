import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@components/organisms/Sidebar';
import { TopBar } from '@components/organisms/TopBar';
import { useAppSelector } from '@redux/hooks';
import { cn } from '@utils';

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
        {/* TopBar */}
        <TopBar />
        
        {/* Page Content */}
        <main
          className={cn(
            'flex-1 overflow-y-auto p-6',
            sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
