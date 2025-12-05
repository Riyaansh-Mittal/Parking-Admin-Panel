import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import type { ConversionStats as ConversionStatsType } from '../types';

interface ConversionStatsProps {
  stats: ConversionStatsType | null;
  loading?: boolean;
}

export const ConversionStats = ({ stats, loading }: ConversionStatsProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Conversion Funnel</h3>
        </CardHeader>
        <CardBody>
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 rounded bg-slate-200"></div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  // Handle null or undefined stats
  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Conversion Funnel</h3>
        </CardHeader>
        <CardBody>
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <div className="mb-2 text-4xl">📊</div>
            <p className="font-medium text-slate-600">No conversion data available</p>
            <p className="mt-1 text-sm text-slate-500">
              Conversion stats will appear here once referrals are processed
            </p>
          </div>
        </CardBody>
      </Card>
    );
  }

  // Safe defaults for calculations
  const totalRegistrations = stats.total_registrations ?? 0;
  const completed = stats.completed ?? 0;
  const pending = stats.pending ?? 0;
  
  // Parse conversion rate if it's a string percentage
  const conversionRate = typeof stats.conversion_rate === 'string' 
    ? parseFloat(stats.conversion_rate.replace('%', '')) 
    : (stats.conversion_rate ?? 0);

  const funnelSteps = [
    {
      label: 'Total Registrations',
      value: totalRegistrations,
      rate: 100,
      color: 'bg-blue-500',
    },
    {
      label: 'Completed',
      value: completed,
      rate: totalRegistrations > 0 ? (completed / totalRegistrations) * 100 : 0,
      color: 'bg-green-500',
    },
    {
      label: 'Pending',
      value: pending,
      rate: totalRegistrations > 0 ? (pending / totalRegistrations) * 100 : 0,
      color: 'bg-yellow-500',
    },
    {
      label: 'Conversion Rate',
      value: completed,
      rate: conversionRate,
      color: 'bg-emerald-500',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Conversion Funnel</h3>
        <p className="text-sm text-slate-600">Referral registration to completion</p>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {funnelSteps.map((step, index) => (
            <div key={step.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                    {index + 1}
                  </div>
                  <span className="font-medium text-slate-900">{step.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-slate-900">
                    {step.value.toLocaleString()}
                  </span>
                  <span className="ml-2 text-sm font-medium text-slate-600">
                    ({step.rate.toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full transition-all duration-500 ${step.color}`}
                  style={{ width: `${Math.min(step.rate, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-slate-600">Conversion Rate</p>
              <p className="mt-1 text-xl font-bold text-emerald-600">
                {conversionRate.toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600">Avg. Time to Complete</p>
              <p className="mt-1 text-xl font-bold text-purple-600">
                {stats.avg_time_to_complete || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
