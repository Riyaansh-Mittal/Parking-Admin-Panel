import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks';
import { ROUTES } from './routes.config';

interface RoleBasedRouteProps {
  requiredRole: 'admin' | 'superuser';
}

export const RoleBasedRoute = ({ requiredRole }: RoleBasedRouteProps) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requiredRole === 'superuser' && !user?.is_superuser) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />; // ✅ No children prop needed
};
