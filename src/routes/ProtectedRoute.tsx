import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks';
import { ROUTES } from './routes.config';
import { Spinner } from '@components/atoms/Spinner';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

ProtectedRoute.displayName = 'ProtectedRoute';
