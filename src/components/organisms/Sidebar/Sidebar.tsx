import { Link, useLocation } from 'react-router-dom';
import { SidebarItem } from './SidebarItem';
import { SidebarCollapse } from './SidebarCollapse';
import { Icon } from '@components/atoms/Icon';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { toggleSidebar } from '@redux/slices/uiSlice';
import { NAV_ITEMS } from '@routes/routes.config';
import { cn } from '@utils';

export const Sidebar = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={handleToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300',
          sidebarCollapsed ? 'w-20' : 'w-64',
          'lg:relative lg:z-auto'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <Icon name="LayoutDashboard" size="sm" className="text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-lg font-bold text-slate-900">
                Admin Panel
              </span>
            )}
          </Link>

          <button
            onClick={handleToggle}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Icon name="Menu" size="sm" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <SidebarCollapse
                  key={item.path}
                  item={item}
                  isCollapsed={sidebarCollapsed}
                  currentPath={location.pathname}
                />
              ) : (
                <SidebarItem
                  key={item.path}
                  item={item}
                  isCollapsed={sidebarCollapsed}
                  isActive={location.pathname === item.path}
                />
              )
            )}
          </ul>
        </nav>

        {/* Toggle Button (Desktop) */}
        <div className="hidden border-t border-slate-200 p-4 lg:block">
          <button
            onClick={handleToggle}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              name={sidebarCollapsed ? 'ChevronRight' : 'ChevronLeft'}
              size="sm"
            />
            {!sidebarCollapsed && (
              <span className="text-sm font-medium">Collapse</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

Sidebar.displayName = 'Sidebar';
