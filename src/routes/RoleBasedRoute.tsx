import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks';
import { ROUTES } from './routes.config';

interface RoleBasedRouteProps {
  allowedRoles?: string[];
  requireSuperuser?: boolean;
}

export const RoleBasedRoute = ({
  allowedRoles = [],
  requireSuperuser = false,
}: RoleBasedRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Check superuser requirement
  if (requireSuperuser && !user.is_superuser) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  // Check role-based access
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.user_type)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

RoleBasedRoute.displayName = 'RoleBasedRoute';
