import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@components/atoms/Icon';
import { cn } from '@utils';
import type { NavItem } from '@routes/routes.config';
import type { IconName } from '@components/atoms/Icon';

interface SidebarCollapseProps {
  item: NavItem;
  isCollapsed: boolean;
  currentPath: string;
  onLinkClick?: () => void;
}

export const SidebarCollapse = ({
  item,
  isCollapsed,
  currentPath,
  onLinkClick,
}: SidebarCollapseProps) => {
  const [isOpen, setIsOpen] = useState(
    item.children?.some((child) => currentPath.startsWith(child.path)) || false
  );

  const hasActiveChild = item.children?.some(
    (child) => currentPath === child.path
  );

  if (isCollapsed) {
    // Show as regular item when sidebar is collapsed
    return (
      <Link
        to={item.children?.[0]?.path || '#'}
        className={cn(
          'flex items-center justify-center rounded-lg p-3 transition-colors',
          hasActiveChild
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        )}
        onClick={onLinkClick}
        title={item.label}
      >
        <Icon name={item.icon as IconName} className="h-5 w-5" />
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between rounded-lg p-3 transition-colors',
          hasActiveChild
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        )}
      >
        <div className="flex items-center gap-3">
          <Icon name={item.icon as IconName} className="h-5 w-5" />
          <span className="text-sm font-medium">{item.label}</span>
        </div>
        <Icon
          name="ChevronDown"
          className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <ul className="mt-1 ml-6 space-y-1 border-l-2 border-slate-200 pl-4">
          {item.children?.map((child) => (
            <li key={child.path}>
              <Link
                to={child.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg p-2 text-sm transition-colors',
                  currentPath === child.path
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
                onClick={onLinkClick}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
