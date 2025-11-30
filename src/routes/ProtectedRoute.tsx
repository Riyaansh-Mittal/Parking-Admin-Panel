import { Navigate, Outlet } from 'react-router-dom'; // ✅ Outlet instead of ReactNode
import { useAppSelector } from '@redux/hooks';
import { ROUTES } from './routes.config';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />; // ✅ No children prop needed
};
