import { Link } from 'react-router-dom';
import { Icon } from '@components/atoms/Icon';
import { Badge } from '@components/atoms/Badge';
import { cn } from '@utils';
import type { NavItem } from '@routes/routes.config';
import type { IconName } from '@components/atoms/Icon';

interface SidebarItemProps {
  item: NavItem;
  isCollapsed: boolean;
  isActive: boolean;
}

export const SidebarItem = ({
  item,
  isCollapsed,
  isActive,
}: SidebarItemProps) => {
  return (
    <li>
      <Link
        to={item.path}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-slate-700 hover:bg-slate-100'
        )}
        title={isCollapsed ? item.label : undefined}
      >
        <Icon name={item.icon as IconName} size="sm" />
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <Badge variant="neutral" size="sm">
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Link>
    </li>
  );
};

SidebarItem.displayName = 'SidebarItem';
