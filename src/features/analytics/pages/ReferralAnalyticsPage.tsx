import { useState } from 'react';
import { ListLayout } from '@components/page-layouts/ListLayout';
import { Alert } from '@/components/molecules/Alert';
import {
  ReferralSummaryCard,
  ConversionStats,
  CampaignPerformanceTable,
  StatusBreakdownChart,
  DateRangeFilter,
} from '../components';
import {
  useReferralSummary,
  useConversionStats,
  useCampaignPerformance,
  useStatusBreakdown,
  useTopReferrers,
} from '../hooks';
import type { ReferralAnalyticsFilters } from '../types';
import { Card, CardHeader, CardBody } from '@/components/organisms/Card';

export const ReferralAnalyticsPage = () => {
  const [filters, setFilters] = useState<ReferralAnalyticsFilters>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return {
      start_date: start.toISOString().split('T')[0],
      end_date: end.toISOString().split('T')[0],
    };
  });

  const {
    summary,
    loading: summaryLoading,
    error: summaryError,
  } = useReferralSummary(filters);

  const {
    stats,
    loading: conversionLoading,
    error: conversionError,
  } = useConversionStats(filters);

  const {
    campaigns,
    loading: campaignsLoading,
    error: campaignsError,
  } = useCampaignPerformance(filters);

  const {
    breakdown,
    loading: breakdownLoading,
    error: breakdownError,
  } = useStatusBreakdown(filters);

  const {
    referrers,
    loading: referrersLoading,
    error: referrersError,
  } = useTopReferrers({ ...filters, limit: 10 });

  const handleDateRangeApply = (range: ReferralAnalyticsFilters) => {
    setFilters({ ...filters, ...range });
  };

  const error =
    summaryError ||
    conversionError ||
    campaignsError ||
    breakdownError ||
    referrersError;

  return (
    <ListLayout
      title="Referral Analytics"
      description="Comprehensive referral program performance metrics"
    >
      {/* Error Alert */}
      {error && (
        <Alert variant="error" onClose={() => {}}>
          {error}
        </Alert>
      )}

      {/* Date Range Filter */}
      <DateRangeFilter
        onApply={handleDateRangeApply}
        loading={summaryLoading}
      />

      {/* Referral Summary */}
      {summary && (
        <ReferralSummaryCard summary={summary} loading={summaryLoading} />
      )}

      {/* Conversion Stats and Status Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {stats && <ConversionStats stats={stats} loading={conversionLoading} />}
        {breakdown && (
          <StatusBreakdownChart data={breakdown} loading={breakdownLoading} />
        )}
      </div>

      {/* Campaign Performance */}
      <CampaignPerformanceTable
        campaigns={campaigns}
        loading={campaignsLoading}
      />

      {/* Top Referrers Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Top Referrers</h3>
          <p className="text-sm text-slate-600">
            Users with most successful referrals
          </p>
        </CardHeader>
        <CardBody>
          {referrersLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
            </div>
          ) : referrersError || !referrers || referrers.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center">
              <div className="mb-2 text-4xl">👥</div>
              <p className="font-medium text-slate-600">No referrers found</p>
              <p className="mt-1 text-sm text-slate-500">
                {referrersError
                  ? 'No referral data available for the selected period'
                  : 'Referral activity will appear here once users start referring others'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 text-left text-sm font-semibold text-slate-900">
                      Rank
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-slate-900">
                      Referrer
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-slate-900">
                      Completed
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-slate-900">
                      Bonus Earned
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-slate-900">
                      Referral Code
                    </th>
                    <th className="py-3 text-left text-sm font-semibold text-slate-900">
                      Last Referral
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {referrers.map((referrer, index) => (
                    <tr
                      key={referrer.user_id}
                      className="border-b border-slate-100"
                    >
                      <td className="py-3 text-sm text-slate-600">
                        {index + 1}
                      </td>
                      <td className="py-3 text-sm font-medium text-slate-900">
                        {referrer.email}
                      </td>
                      <td className="py-3 text-sm text-slate-600">
                        {referrer.referrals_completed}
                      </td>
                      <td className="py-3 text-sm text-slate-600">
                        {referrer.total_bonus_earned} calls
                      </td>
                      <td className="py-3">
                        <code className="rounded bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
                          {referrer.referral_code}
                        </code>
                      </td>
                      <td className="py-3 text-sm text-slate-600">
                        {new Date(
                          referrer.last_referral_date
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </ListLayout>
  );
};
