import { Icon } from '@/components/atoms/Icon';
import type { IconName } from '@/components/atoms/Icon';
import { formatDuration, formatNumber } from '@/utils/formatters';
import type { CallSummaryStats } from '../types';

interface CallStatsCardsProps {
  stats: CallSummaryStats | null;
  loading?: boolean;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconName;
  iconBg: string;
  subtitle?: string;
}

const StatCard = ({ title, value, icon, iconBg, subtitle }: StatCardProps) => (
  <div className="rounded-lg border border-slate-200 bg-white p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
        {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className={`rounded-lg ${iconBg} p-3`}>
        <Icon name={icon} size="md" className="text-white" />
      </div>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="animate-pulse rounded-lg border border-slate-200 bg-white p-6">
    <div className="flex items-start justify-between">
      <div>
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="mt-2 h-8 w-16 rounded bg-slate-200" />
      </div>
      <div className="h-12 w-12 rounded-lg bg-slate-200" />
    </div>
  </div>
);

export const CallStatsCards = ({ stats, loading }: CallStatsCardsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const connectionRate =
    stats.total_calls > 0
      ? ((stats.connected_calls / stats.total_calls) * 100).toFixed(1)
      : '0';

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Calls"
          value={formatNumber(stats.total_calls)}
          icon="Phone"
          iconBg="bg-indigo-500"
          subtitle={`${connectionRate}% connected`}
        />
        <StatCard
          title="Connected Calls"
          value={formatNumber(stats.connected_calls)}
          icon="PhoneIncoming"
          iconBg="bg-emerald-500"
        />
        <StatCard
          title="Failed Calls"
          value={formatNumber(stats.failed_calls)}
          icon="PhoneMissed"
          iconBg="bg-rose-500"
        />
        <StatCard
          title="Total Duration"
          value={formatDuration(stats.total_duration)}
          icon="Clock"
          iconBg="bg-sky-500"
        />
      </div>

      {/* Revenue & Rating */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Revenue"
          value={stats.total_revenue}
          icon="DollarSign"
          iconBg="bg-emerald-500"
        />
        <StatCard
          title="Average Rating"
          value={stats.average_rating?.toFixed(1) ?? 'N/A'}
          icon="Star"
          iconBg="bg-amber-500"
        />
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <p className="mb-4 text-sm font-medium text-slate-500">Time Period Breakdown</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Today</span>
              <span className="font-medium text-slate-900">
                {formatNumber(stats.time_period.today.count)} calls
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">This Week</span>
              <span className="font-medium text-slate-900">
                {formatNumber(stats.time_period.this_week.count)} calls
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">This Month</span>
              <span className="font-medium text-slate-900">
                {formatNumber(stats.time_period.this_month.count)} calls
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
