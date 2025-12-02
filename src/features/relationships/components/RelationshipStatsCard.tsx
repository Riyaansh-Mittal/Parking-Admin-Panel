import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import { Icon } from '@/components/atoms/Icon';
import { Skeleton } from '@/components/atoms/Skeleton';
import { formatNumber, formatCurrency } from '@/utils/formatters';
import type { IconName } from '@/components/atoms/Icon';

interface StatItemProps {
  label: string;
  value: string | number;
  icon: IconName;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatItem = ({ label, value, icon, iconColor = 'text-indigo-600', trend }: StatItemProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`p-2 bg-slate-100 rounded-lg ${iconColor}`}>
        <Icon name={icon} size="sm" />
      </div>
      <div>
        <p className="text-sm text-slate-600">{label}</p>
        <p className="text-lg font-semibold text-slate-900">{value}</p>
      </div>
    </div>
    {trend && (
      <div
        className={`text-sm font-medium ${
          trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
        }`}
      >
        {trend.isPositive ? '+' : ''}
        {trend.value}%
      </div>
    )}
  </div>
);

interface RelationshipStatsCardProps {
  stats?: {
    total_relationships: number;
    completed: number;
    pending: number;
    cancelled: number;
    reversed: number;
    partially_completed: number;
    total_rewards_paid: string;
  };
  loading?: boolean;
}

export const RelationshipStatsCard = ({
  stats,
  loading = false,
}: RelationshipStatsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon name="TrendingUp" className="text-indigo-600" />
          <span className="text-lg font-semibold text-slate-900">
            Relationship Statistics
          </span>
        </div>
      </CardHeader>
      <CardBody>
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : stats ? (
          <div className="space-y-4">
            <StatItem
              label="Total Relationships"
              value={formatNumber(stats.total_relationships)}
              icon="Users"
              iconColor="text-indigo-600"
            />
            <StatItem
              label="Completed"
              value={formatNumber(stats.completed)}
              icon="CheckCircle"
              iconColor="text-emerald-600"
            />
            <StatItem
              label="Pending"
              value={formatNumber(stats.pending)}
              icon="Clock"
              iconColor="text-amber-600"
            />
            <StatItem
              label="Partially Completed"
              value={formatNumber(stats.partially_completed)}
              icon="AlertTriangle"
              iconColor="text-orange-600"
            />
            <StatItem
              label="Reversed"
              value={formatNumber(stats.reversed)}
              icon="RotateCcw"
              iconColor="text-rose-600"
            />
            <div className="pt-4 border-t border-slate-200">
              <StatItem
                label="Total Rewards Paid"
                value={formatCurrency(stats.total_rewards_paid)}
                icon="DollarSign"
                iconColor="text-emerald-600"
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500 text-center py-8">
            No statistics available
          </p>
        )}
      </CardBody>
    </Card>
  );
};
