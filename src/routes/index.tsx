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
  // DashboardPage,
  NotFoundPage,
  UnauthorizedPage,
} from '@/pages';

// Feature pages
import { UsersListPage, UserDetailPage } from '@/features/users/pages';

// Calls pages
import {
  CallsListPage,
  CallDetailPage,
  CallStatsPage,
} from '@/features/calls/pages';

// Campaigns pages
import {
  CampaignsListPage,
  CampaignDetailPage,
  CreateCampaignPage,
} from '@/features/campaigns/pages';

// Codes pages
import { CodesListPage } from '@/features/codes/pages';

// Balances pages
import {
  BalancesListPage,
  BalanceDetailPage,
  ResetLogsPage,
} from '@/features/balances/pages';

// Admins pages (Superuser only)
import {
  AdminsListPage,
  AdminDetailPage,
  RegisterAdminPage,
} from '@/features/admins/pages';

// Relationships pages
import {
  RelationshipsListPage,
  RelationshipDetailPage,
} from '@/features/relationships/pages';

// Settings pages (Superuser only)
import { SettingsListPage, SettingDetailPage } from '@/features/settings/pages';

import {
  DashboardPage as AnalyticsDashboardPage,
  CallAnalyticsPage,
  ReferralAnalyticsPage,
} from '@/features/analytics/pages';

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
          {/* Dashboard - Accessible to all authenticated users */}
          <Route path={ROUTES.DASHBOARD} element={<AnalyticsDashboardPage />} />

          {/* Admin Access Routes */}
          <Route element={<RoleBasedRoute requiredRole="admin" />}>
            {/* Calls Routes */}
            <Route path={ROUTES.CALLS} element={<CallsListPage />} />
            <Route path={ROUTES.CALL_DETAIL} element={<CallDetailPage />} />
            <Route path={ROUTES.CALL_STATS} element={<CallStatsPage />} />

            {/* Campaigns Routes */}
            <Route path={ROUTES.CAMPAIGNS} element={<CampaignsListPage />} />
            <Route
              path={ROUTES.CAMPAIGN_DETAIL}
              element={<CampaignDetailPage />}
            />
            <Route
              path={ROUTES.CREATE_CAMPAIGN}
              element={<CreateCampaignPage />}
            />

            {/* Codes Routes */}
            <Route path={ROUTES.CODES} element={<CodesListPage />} />

            {/* Balances Routes */}
            <Route path={ROUTES.BALANCES} element={<BalancesListPage />} />
            <Route
              path={ROUTES.BALANCE_DETAIL}
              element={<BalanceDetailPage />}
            />
            <Route
              path={ROUTES.BALANCE_RESET_LOGS}
              element={<ResetLogsPage />}
            />

            {/* Users Routes */}
            <Route path={ROUTES.USERS} element={<UsersListPage />} />
            <Route path={ROUTES.USER_DETAIL} element={<UserDetailPage />} />

            {/* Relationships Routes */}
            <Route
              path={ROUTES.RELATIONSHIPS}
              element={<RelationshipsListPage />}
            />
            <Route
              path={ROUTES.RELATIONSHIP_DETAIL}
              element={<RelationshipDetailPage />}
            />

            {/* Analytics Routes */}
            <Route
              path={ROUTES.CALL_ANALYTICS}
              element={<CallAnalyticsPage />}
            />
            <Route
              path={ROUTES.REFERRAL_ANALYTICS}
              element={<ReferralAnalyticsPage />}
            />
          </Route>

          {/* Superuser Only Routes */}
          <Route element={<RoleBasedRoute requiredRole="superuser" />}>
            {/* Admins Management */}
            <Route path={ROUTES.ADMINS} element={<AdminsListPage />} />
            <Route path={ROUTES.ADMIN_DETAIL} element={<AdminDetailPage />} />
            <Route
              path={ROUTES.REGISTER_ADMIN}
              element={<RegisterAdminPage />}
            />

            {/* Platform Settings */}
            <Route path={ROUTES.SETTINGS} element={<SettingsListPage />} />
            <Route
              path={ROUTES.SETTING_DETAIL}
              element={<SettingDetailPage />}
            />
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
