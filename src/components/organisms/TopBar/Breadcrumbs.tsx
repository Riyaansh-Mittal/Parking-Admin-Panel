import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@components/atoms/Icon';
import { ROUTES, NAV_ITEMS } from '@routes/routes.config';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Find matching nav item for current path
  const findNavItem = (path: string) => {
    for (const item of NAV_ITEMS) {
      if (item.path === path) return item;
      if (item.children) {
        const child = item.children.find((c) => c.path === path);
        if (child) return child;
      }
    }
    return null;
  };

  // Build breadcrumb trail
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const navItem = findNavItem(path);
    
    return {
      label: navItem?.label || segment.charAt(0).toUpperCase() + segment.slice(1),
      path,
      isLast: index === pathSegments.length - 1,
    };
  });

  // Add Dashboard as first breadcrumb if not already there
  if (location.pathname !== ROUTES.DASHBOARD && breadcrumbs[0]?.path !== ROUTES.DASHBOARD) {
    breadcrumbs.unshift({
      label: 'Dashboard',
      path: ROUTES.DASHBOARD,
      isLast: false,
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-2">
          {index > 0 && (
            <Icon name="ChevronRight" size="sm" className="text-slate-400" />
          )}
          {crumb.isLast ? (
            <span className="text-sm font-medium text-slate-900">
              {crumb.label}
            </span>
          ) : (
            <Link
              to={crumb.path}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
