import { Outlet } from 'react-router-dom';
import { Sidebar } from '@components/organisms/Sidebar';
import { TopBar } from '@components/organisms/TopBar';
import { useAppSelector } from '@redux/hooks';
import { cn } from '@utils';

export const MainLayout = () => {
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        
        <main
          className={cn(
            'flex-1 overflow-y-auto p-4 transition-all duration-300 lg:p-6',
            sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';
