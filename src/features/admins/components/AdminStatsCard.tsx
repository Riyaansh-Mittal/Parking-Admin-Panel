import { Skeleton } from '@/components/atoms/Skeleton';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/utils';
import type { AdminStats } from '@/features/admins/types';
import type { IconName } from '@/components/atoms/Icon';

interface AdminStatsCardProps {
  stats: AdminStats | null;
  loading: boolean;
}

interface StatItemProps {
  icon: IconName;
  label: string;
  value: string | number;
  iconColor: string;
}

const StatItem = ({ icon, label, value, iconColor }: StatItemProps) => (
  <div className="flex items-center gap-3">
    <div className={cn('rounded-lg p-2', iconColor)}>
      <Icon name={icon} size="md" />
    </div>
    <div>
      <p className="text-sm text-slate-600">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

export const AdminStatsCard = ({ stats, loading }: AdminStatsCardProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border border-slate-200 bg-white p-6">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <StatItem
          icon="Users"
          label="Total Admins"
          value={stats.overview.total}
          iconColor="bg-indigo-50 text-indigo-600"
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <StatItem
          icon="UserCheck"
          label="Active"
          value={stats.overview.active}
          iconColor="bg-emerald-50 text-emerald-600"
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <StatItem
          icon="Shield"
          label="Superusers"
          value={stats.by_type.superuser}
          iconColor="bg-purple-50 text-purple-600"
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <StatItem
          icon="CheckCircle"
          label="Email Verified"
          value={stats.overview.email_verified}
          iconColor="bg-blue-50 text-blue-600"
        />
      </div>
    </div>
  );
};
