import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleBasedRoute } from './RoleBasedRoute';
import { ROUTES } from './routes.config';

// Pages
import {
  LoginPage,
  VerifyEmailPage,
  SetPasswordPage,
  DashboardPage,
  NotFoundPage,
  UnauthorizedPage,
} from '@/pages';

// Feature pages
import { UsersListPage, UserDetailPage } from '@/features/users/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      {/* Auth Routes (Public) */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />
        <Route path={ROUTES.SET_PASSWORD} element={<SetPasswordPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          
          {/* Users Routes (Admin + Superuser) */}
          <Route element={<RoleBasedRoute requiredRole="admin" />}>
            <Route path={ROUTES.USERS} element={<UsersListPage />} />
            <Route path={ROUTES.USER_DETAIL} element={<UserDetailPage />} />
          </Route>
          
          <Route path={ROUTES.CALLS} element={<div>Calls Page</div>} />
          <Route path={ROUTES.CAMPAIGNS} element={<div>Campaigns Page</div>} />
          
          {/* Superuser Only Routes */}
          <Route element={<RoleBasedRoute requiredRole="superuser" />}>
            <Route path={ROUTES.ADMINS} element={<div>Admins Page</div>} />
            <Route path={ROUTES.SETTINGS} element={<div>Settings Page</div>} />
          </Route>
        </Route>
      </Route>

      {/* Error Pages */}
      <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
