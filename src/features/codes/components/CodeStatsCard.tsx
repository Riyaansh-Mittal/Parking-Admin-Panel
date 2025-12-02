import { Icon } from '@/components/atoms/Icon';
import { Card } from '@/components/organisms/Card';
import { formatNumber, formatPercentage } from '@/utils/formatters';
import type { CodeStats } from '../types';

interface CodeStatsCardProps {
  stats: CodeStats | null; // ✅ Allow null
  loading?: boolean;
}

export const CodeStatsCard = ({ stats, loading }: CodeStatsCardProps) => {
  // ✅ Handle loading state
  if (loading || !stats) {
    return (
      <Card padding={true}>
        <div className="flex items-center justify-center p-12">
          <Icon name="Loader" className="animate-spin text-slate-400" size="lg" />
        </div>
      </Card>
    );
  }

  const statItems = [
    {
      label: 'Total Codes',
      value: stats.total_codes,
      icon: 'Hash' as const,
      color: 'text-slate-600',
      bgColor: 'bg-slate-100',
    },
    {
      label: 'Active',
      value: stats.active_codes,
      icon: 'CheckCircle' as const,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      label: 'Inactive',
      value: stats.inactive_codes,
      icon: 'XCircle' as const,
      color: 'text-slate-600',
      bgColor: 'bg-slate-100',
    },
    {
      label: 'Expired',
      value: stats.expired_codes,
      icon: 'Clock' as const,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
    {
      label: 'Exhausted',
      value: stats.exhausted_codes,
      icon: 'AlertCircle' as const,
      color: 'text-rose-600',
      bgColor: 'bg-rose-100',
    },
    {
      label: 'Avg Usage Rate',
      value: formatPercentage(stats.average_usage_rate),
      icon: 'TrendingUp' as const,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {statItems.map((item) => (
        <Card key={item.label} padding={true}>
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${item.bgColor}`}>
              <Icon name={item.icon} size="md" className={item.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {typeof item.value === 'number' ? formatNumber(item.value) : item.value}
              </p>
              <p className="text-xs text-slate-600">{item.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

CodeStatsCard.displayName = 'CodeStatsCard';
