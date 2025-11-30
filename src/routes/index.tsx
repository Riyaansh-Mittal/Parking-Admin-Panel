import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout';
import { AuthLayout } from '@layouts/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleBasedRoute } from './RoleBasedRoute';
import { ROUTES } from './routes.config';

// Pages
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  NotFoundPage,
} from '@pages';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.VERIFY_EMAIL} element={<div>Verify Email</div>} />
        <Route path={ROUTES.SET_PASSWORD} element={<div>Set Password</div>} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

          {/* Users */}
          <Route path={ROUTES.USERS} element={<div>Users List</div>} />
          <Route path={ROUTES.USER_DETAIL} element={<div>User Detail</div>} />

          {/* Admin Routes (Superuser only) */}
          <Route element={<RoleBasedRoute requireSuperuser />}>
            <Route path={ROUTES.ADMINS} element={<div>Admins List</div>} />
            <Route path={ROUTES.ADMIN_DETAIL} element={<div>Admin Detail</div>} />
            <Route path={ROUTES.REGISTER_ADMIN} element={<RegisterPage />} />
          </Route>

          {/* Calls */}
          <Route path={ROUTES.CALLS} element={<div>Calls List</div>} />
          <Route path={ROUTES.CALL_DETAIL} element={<div>Call Detail</div>} />

          {/* Campaigns */}
          <Route path={ROUTES.CAMPAIGNS} element={<div>Campaigns List</div>} />
          <Route path={ROUTES.CAMPAIGN_DETAIL} element={<div>Campaign Detail</div>} />

          {/* Settings */}
          <Route path={ROUTES.SETTINGS} element={<div>Settings</div>} />

          {/* Analytics */}
          <Route path={ROUTES.ANALYTICS} element={<div>Analytics</div>} />
        </Route>
      </Route>

      {/* Error Pages */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      <Route path={ROUTES.UNAUTHORIZED} element={<div>403 Unauthorized</div>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
