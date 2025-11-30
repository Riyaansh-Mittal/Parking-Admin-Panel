import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks';
import { ROUTES } from './routes.config';

interface RoleBasedRouteProps {
  requiredRole?: 'admin' | 'superuser'; // ✅ Make optional with union type
}

export const RoleBasedRoute = ({ requiredRole }: RoleBasedRouteProps) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Check superuser requirement
  if (requiredRole === 'superuser' && !user.is_superuser) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  // Check admin requirement (any authenticated user is admin)
  if (requiredRole === 'admin' && user.user_type !== 'admin' && !user.is_superuser) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

RoleBasedRoute.displayName = 'RoleBasedRoute';
