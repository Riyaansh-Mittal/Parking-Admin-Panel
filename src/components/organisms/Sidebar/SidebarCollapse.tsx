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
}

export const SidebarCollapse = ({
  item,
  isCollapsed,
  currentPath,
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
      <li>
        <Link
          to={item.path}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            hasActiveChild
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-slate-700 hover:bg-slate-100'
          )}
          title={item.label}
        >
          <Icon name={item.icon as IconName} size="sm" />
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          hasActiveChild
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-slate-700 hover:bg-slate-100'
        )}
      >
        <Icon name={item.icon as IconName} size="sm" />
        <span className="flex-1 text-left">{item.label}</span>
        <Icon
          name="ChevronDown"
          size="sm"
          className={cn(
            'transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && item.children && (
        <ul className="ml-6 mt-1 space-y-1 border-l-2 border-slate-200 pl-3">
          {item.children.map((child) => (
            <li key={child.path}>
              <Link
                to={child.path}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  currentPath === child.path
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                <Icon name={child.icon as IconName} size="sm" />
                <span>{child.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

SidebarCollapse.displayName = 'SidebarCollapse';
