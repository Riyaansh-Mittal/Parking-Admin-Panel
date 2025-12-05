import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import { Icon } from '@/components/atoms/Icon';
import { Badge } from '@/components/atoms/Badge';
import type { ReferralSummary } from '../types';

interface ReferralSummaryCardProps {
  summary: ReferralSummary;
  loading?: boolean;
}

export const ReferralSummaryCard = ({ summary, loading }: ReferralSummaryCardProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Referral Summary</h3>
        </CardHeader>
        <CardBody>
          <div className="animate-pulse space-y-4">
            <div className="h-20 rounded bg-slate-200"></div>
            <div className="h-20 rounded bg-slate-200"></div>
          </div>
        </CardBody>
      </Card>
    );
  }

  // Calculate conversion rate
  const conversionRate = summary.referrals.total_referrals > 0
    ? (summary.referrals.completed_referrals / summary.referrals.total_referrals) * 100
    : 0;

  const stats = [
    {
      label: 'Total Referrals',
      value: summary.referrals.total_referrals.toLocaleString(),
      icon: 'Users' as const,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Completed',
      value: summary.referrals.completed_referrals.toLocaleString(),
      icon: 'UserCheck' as const,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Pending',
      value: summary.referrals.pending_referrals.toLocaleString(),
      icon: 'Clock' as const,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'Total Bonus Paid',
      value: `₹${summary.referrals.total_bonus_paid.toFixed(2)}`,
      icon: 'DollarSign' as const,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Referral Summary</h3>
            <p className="text-sm text-slate-600">Overall referral performance</p>
          </div>
          <Badge variant="info" size="lg">
            {conversionRate.toFixed(1)}% Conversion
          </Badge>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-lg border border-slate-200 p-4"
            >
              <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                <Icon name={stat.icon} size="md" className={stat.color} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Campaign & Code Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-600">Active Campaigns</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {summary.campaigns.active_campaigns} / {summary.campaigns.total_campaigns}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-600">Active Codes</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {summary.codes.active_codes} / {summary.codes.total_codes}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-600">Exhausted Codes</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {summary.codes.exhausted_codes}
            </p>
          </div>
        </div>

        {/* Timeframe */}
        {summary.timeframe && (
          <div className="mt-4 text-center text-xs text-slate-500">
            {summary.timeframe}
          </div>
        )}
      </CardBody>
    </Card>
  );
};
