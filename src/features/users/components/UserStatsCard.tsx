import { Card, CardBody } from '@/components/organisms/Card';
import { Icon, IconName } from '@/components/atoms/Icon';
import { Spinner } from '@/components/atoms/Spinner';
import { cn } from '@/lib/utils';
import type { UserStats } from '@/features/users/types';

interface UserStatsCardProps {
  stats: UserStats | null;
  loading: boolean;
}

interface StatItemProps {
  icon: IconName;
  label: string;
  value: number | string;
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

export const UserStatsCard = ({ stats, loading }: UserStatsCardProps) => {
  if (loading) {
    return (
      <Card>
        <CardBody>
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
          </div>
        </CardBody>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Users */}
      <Card>
        <CardBody>
          <StatItem
            icon="Users"
            label="Total Users"
            value={stats.overview.total}
            iconColor="bg-indigo-100 text-indigo-600"
          />
        </CardBody>
      </Card>

      {/* Active Users */}
      <Card>
        <CardBody>
          <StatItem
            icon="CheckCircle"
            label="Active Users"
            value={stats.overview.active}
            iconColor="bg-emerald-100 text-emerald-600"
          />
        </CardBody>
      </Card>

      {/* Email Verified */}
      <Card>
        <CardBody>
          <StatItem
            icon="Mail"
            label="Email Verified"
            value={stats.verification.email_verified}
            iconColor="bg-sky-100 text-sky-600"
          />
        </CardBody>
      </Card>

      {/* With Vehicle */}
      <Card>
        <CardBody>
          <StatItem
            icon="Car"
            label="With Vehicle"
            value={stats.vehicles.with_vehicle}
            iconColor="bg-amber-100 text-amber-600"
          />
        </CardBody>
      </Card>

      {/* Recent Signups (Last 7 Days) */}
      <Card className="md:col-span-2">
        <CardBody>
          <div className="flex items-center justify-between">
            <StatItem
              icon="TrendingUp"
              label="Last 7 Days"
              value={stats.recent.last_7_days}
              iconColor="bg-purple-100 text-purple-600"
            />
            <div className="text-right">
              <p className="text-lg font-semibold text-slate-700">
                {stats.recent.last_30_days}
              </p>
              <p className="text-sm text-slate-500">Last 30 Days</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Verification Status */}
      <Card className="md:col-span-2">
        <CardBody>
          <h4 className="mb-4 text-sm font-semibold text-slate-700">Verification Status</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Phone Verified</span>
              <span className="font-semibold text-slate-900">
                {stats.verification.phone_verified}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Complete Profiles</span>
              <span className="font-semibold text-slate-900">
                {stats.profiles.complete}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
