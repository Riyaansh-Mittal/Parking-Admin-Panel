import { useState } from 'react';
import { ListLayout } from '@components/page-layouts/ListLayout';
import { Alert } from '@/components/molecules/Alert';
import {
  CallsChart,
  BalanceUsageChart,
  TopUsersTable,
  DateRangeFilter,
} from '../components';
import { useCallAnalytics } from '../hooks';
import type { AnalyticsFilters } from '../types';

export const CallAnalyticsPage = () => {
  const [filters, setFilters] = useState<AnalyticsFilters>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return {
      start_date: start.toISOString().split('T')[0],
      end_date: end.toISOString().split('T')[0],
    };
  });

  const { analytics, loading, error } = useCallAnalytics(filters);

  const handleDateRangeApply = (range: AnalyticsFilters) => {
    setFilters({ ...filters, ...range });
  };

  // Transform analytics data for charts
  const callsChartData = analytics
    ? [
        {
          date: 'Connected',
          count: analytics.overview.connected_calls,
        },
        {
          date: 'Total',
          count: analytics.overview.total_calls,
        },
      ]
    : [];

  const balanceUsageData = analytics
    ? [
        {
          date: new Date().toISOString(),
          balance_used: parseFloat(analytics.overview.total_balance_used),
        },
      ]
    : [];

  return (
    <ListLayout
      title="Call Analytics"
      description="Detailed analytics for call activity and performance"
    >
      {/* Error Alert */}
      {error && (
        <Alert variant="error" onClose={() => {}}>
          {error}
        </Alert>
      )}

      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Date Range Filter */}
        <DateRangeFilter
          onApply={handleDateRangeApply}
          loading={loading}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CallsChart data={callsChartData} loading={loading} />
        <BalanceUsageChart data={balanceUsageData} loading={loading} />
      </div>

      {/* Top Users Table */}
      <TopUsersTable users={analytics?.top_users || []} loading={loading} />
    </ListLayout>
  );
};
