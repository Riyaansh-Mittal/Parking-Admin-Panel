import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks';
import { ROUTES } from '@routes/routes.config';

export const AuthLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left side - Branding */}
      <div className="hidden flex-1 items-center justify-center bg-indigo-600 p-12 lg:flex">
        <div className="max-w-md text-white">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <p className="mt-4 text-lg text-indigo-100">
            Manage your application with powerful admin tools
          </p>
          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-3">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>User Management</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Analytics & Reports</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Real-time Monitoring</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right side - Auth Forms */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

AuthLayout.displayName = 'AuthLayout';
