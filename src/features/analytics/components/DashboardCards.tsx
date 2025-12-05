import { Card, CardBody } from '@/components/organisms/Card';
import { Icon } from '@/components/atoms/Icon';
import type { DashboardStats } from '../types';

interface DashboardCardsProps {
  stats: DashboardStats | null;
  loading?: boolean;
}

// Helper function to format duration
const formatDuration = (seconds: number = 0): string => {
  if (!seconds) return '0s';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
};

export const DashboardCards = ({ stats, loading }: DashboardCardsProps) => {
  // Show loading skeleton
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardBody>
              <div className="animate-pulse">
                <div className="mb-2 h-4 w-24 rounded bg-slate-200"></div>
                <div className="mb-2 h-8 w-32 rounded bg-slate-200"></div>
                <div className="h-3 w-20 rounded bg-slate-200"></div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Users',
      value: (stats.total_users ?? 0).toLocaleString(),
      growth: stats.users_growth ?? 0,
      icon: 'Users' as const,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Active Users',
      value: (stats.active_users ?? 0).toLocaleString(),
      subtitle: 'Made at least 1 call',
      growth: null,
      icon: 'UserCheck' as const,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Total Calls',
      value: (stats.total_calls ?? 0).toLocaleString(),
      growth: stats.calls_growth ?? 0,
      icon: 'Phone' as const,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Avg Call Duration',
      value: formatDuration(stats.avg_call_duration ?? 0),
      subtitle: 'Per call average',
      growth: null,
      icon: 'Clock' as const,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardBody>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{card.title}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
                {card.subtitle && (
                  <p className="mt-1 text-xs text-slate-500">{card.subtitle}</p>
                )}
                {card.growth !== null && (
                  <div className="mt-2 flex items-center gap-1">
                    <Icon
                      name={card.growth >= 0 ? 'TrendingUp' : 'TrendingDown'}
                      className={`h-4 w-4 ${
                        card.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        card.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {Math.abs(card.growth)}%
                    </span>
                  </div>
                )}
              </div>
              <div className={`rounded-lg p-3 ${card.bgColor}`}>
                <Icon name={card.icon} className={`h-6 w-6 ${card.iconColor}`} />
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
