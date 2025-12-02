import { Icon } from '@/components/atoms/Icon';
import { Skeleton } from '@/components/atoms/Skeleton';
import { formatNumber, formatCurrency } from '@/utils/formatters';
import type { IconName } from '@/components/atoms/Icon';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: IconName;
  iconBg: string;
  subtitle?: string;
}

const StatsCard = ({ title, value, icon, iconBg, subtitle }: StatsCardProps) => (
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

const StatsCardSkeleton = () => (
  <div className="rounded-lg border border-slate-200 bg-white p-6">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-2 h-8 w-16" />
      </div>
      <Skeleton className="h-12 w-12 rounded-lg" />
    </div>
  </div>
);

interface CampaignStatsProps {
  stats: {
    total_campaigns: number;
    active_campaigns: number;
    inactive_campaigns: number;
    total_codes: number;
    codes_redeemed: number;
    total_rewards: string;
  } | null;
  loading?: boolean;
}

export const CampaignStats = ({ stats, loading }: CampaignStatsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const usageRate =
    stats.total_codes > 0
      ? ((stats.codes_redeemed / stats.total_codes) * 100).toFixed(1)
      : '0';

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Campaigns"
        value={formatNumber(stats.total_campaigns)}
        icon="Megaphone"
        iconBg="bg-indigo-500"
        subtitle={`${stats.active_campaigns} active`}
      />
      <StatsCard
        title="Active Campaigns"
        value={formatNumber(stats.active_campaigns)}
        icon="CheckCircle"
        iconBg="bg-emerald-500"
      />
      <StatsCard
        title="Codes Generated"
        value={formatNumber(stats.total_codes)}
        icon="Hash"
        iconBg="bg-sky-500"
        subtitle={`${usageRate}% redeemed`}
      />
      <StatsCard
        title="Total Rewards"
        value={formatCurrency(parseFloat(stats.total_rewards))}
        icon="DollarSign"
        iconBg="bg-amber-500"
      />
    </div>
  );
};
