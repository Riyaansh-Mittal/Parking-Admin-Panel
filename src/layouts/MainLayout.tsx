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
            'flex-1 overflow-y-auto p-4 transition-all duration-300',
            'md:p-6 lg:p-8',
            // Add left padding on desktop when sidebar is expanded
            !sidebarCollapsed ? 'md:ml-64' : 'md:ml-20'
          )}
        >
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
