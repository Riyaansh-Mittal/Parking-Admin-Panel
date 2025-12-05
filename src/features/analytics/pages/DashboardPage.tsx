import { useState, useEffect } from 'react';
import { ListLayout } from '@components/page-layouts/ListLayout';
import { Alert } from '@/components/molecules/Alert';
import {
  DashboardCards,
  CallsChart,
  TopUsersTable,
  DateRangeFilter,
} from '../components';
import { useDashboardStats, useCallAnalytics } from '../hooks';
import { getUserCallStats } from '@/api/services/analytics.service';
import type { AnalyticsFilters, TopUser } from '../types';

export const DashboardPage = () => {
  const [filters, setFilters] = useState<AnalyticsFilters>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return {
      start_date: start.toISOString().split('T')[0],
      end_date: end.toISOString().split('T')[0],
    };
  });

  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  const {
    callSummary,
    referralSummary,
    loading: statsLoading,
    error: statsError,
  } = useDashboardStats(filters);

  const {
    analytics: _analytics,
    loading: _analyticsLoading,
    error: analyticsError,
  } = useCallAnalytics(filters);

  const fetchTopUsers = async () => {
    try {
      setUsersLoading(true);
      setUsersError(null);

      // Get top users from analytics API
      const analyticsResponse = await getUserCallStats({
        ...filters,
        page_size: 10,
        ordering: '-total_calls',
      });

      // Transform UserCallStats to TopUser format
      const transformedUsers: TopUser[] = analyticsResponse.data.map(
        (user) => ({
          inviter__email: user.email,
          inviter__user_id: user.user_id,
          call_count: user.total_calls,
          total_duration: user.total_duration,
          total_cost: user.total_spent,
        })
      );

      setTopUsers(transformedUsers);
    } catch (err) {
      setUsersError(
        err instanceof Error ? err.message : 'Failed to fetch top users'
      );
      setTopUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchTopUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleDateRangeApply = (range: AnalyticsFilters) => {
    setFilters(range);
  };

  const error = statsError || analyticsError || usersError;

  // Combine dashboard stats from both call and referral summaries
  const dashboardStats =
    callSummary && referralSummary
      ? {
          total_users: referralSummary.referrals.total_referrals,
          active_users: callSummary.connected_calls,
          total_calls: callSummary.total_calls,
          total_balance_used: parseFloat(callSummary.total_balance_used),
          calls_growth: 0, // Calculate if you have previous period data
          users_growth: 0, // Calculate if you have previous period data
          avg_call_duration:
            callSummary.total_calls > 0
              ? callSummary.total_duration / callSummary.total_calls
              : 0,
          total_referrals: referralSummary.referrals.total_referrals,
        }
      : null;

  // Transform call summary data for CallsChart
  const callsChartData = callSummary
    ? [
        {
          date: 'Today',
          count: callSummary.time_period.today.count,
        },
        {
          date: 'This Week',
          count: callSummary.time_period.this_week.count,
        },
        {
          date: 'This Month',
          count: callSummary.time_period.this_month.count,
        },
      ]
    : [];

  return (
    <ListLayout
      title="Analytics Dashboard"
      description="Overview of system performance and user activity"
    >
      {/* Error Alert */}
      {error && (
        <Alert variant="error" onClose={() => {}}>
          {error}
        </Alert>
      )}

      {/* Date Range Filter */}
      <DateRangeFilter onApply={handleDateRangeApply} loading={statsLoading} />

      {/* Dashboard Summary Cards */}
      {dashboardStats && (
        <DashboardCards stats={dashboardStats} loading={statsLoading} />
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CallsChart data={callsChartData} loading={statsLoading} />
        <TopUsersTable users={topUsers} loading={usersLoading} />
      </div>
    </ListLayout>
  );
};
