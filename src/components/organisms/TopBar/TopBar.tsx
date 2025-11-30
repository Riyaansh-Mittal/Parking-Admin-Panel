import { Breadcrumbs } from './Breadcrumbs';
import { NotificationBell } from './NotificationBell';
import { ProfileMenu } from './ProfileMenu';
import { Icon } from '@components/atoms/Icon';
import { useAppDispatch } from '@redux/hooks';
import { toggleSidebar } from '@redux/slices/uiSlice';

export const TopBar = () => {
  const dispatch = useAppDispatch();

  const handleMenuClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Icon name="Menu" size="md" />
        </button>
        <Breadcrumbs />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <NotificationBell />
        <ProfileMenu />
      </div>
    </header>
  );
};

TopBar.displayName = 'TopBar';
