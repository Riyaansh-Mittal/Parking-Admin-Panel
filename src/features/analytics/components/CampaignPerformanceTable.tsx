import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import { Badge } from '@/components/atoms/Badge';
import type { CampaignPerformance } from '../types';

interface CampaignPerformanceTableProps {
  campaigns: CampaignPerformance[];
  loading?: boolean;
}

export const CampaignPerformanceTable = ({
  campaigns,
  loading,
}: CampaignPerformanceTableProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Campaign Performance</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 rounded bg-slate-200"></div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  if (campaigns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Campaign Performance</h3>
        </CardHeader>
        <CardBody>
          <div className="flex h-40 items-center justify-center text-slate-500">
            No campaign data available
          </div>
        </CardBody>
      </Card>
    );
  }

  const getRedemptionRateColor = (rate: string): 'success' | 'warning' | 'error' => {
    const numRate = parseFloat(rate);
    if (numRate >= 50) return 'success';
    if (numRate >= 20) return 'warning';
    return 'error';
  };

  const getStatusBadge = (isActive: boolean, isExpired: boolean) => {
    if (isExpired) {
      return { variant: 'error' as const, text: 'Expired' };
    }
    if (isActive) {
      return { variant: 'success' as const, text: 'Active' };
    }
    return { variant: 'warning' as const, text: 'Inactive' };
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Campaign Performance</h3>
        <p className="text-sm text-slate-600">Referral code metrics by campaign</p>
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200">
              <tr>
                <th className="pb-3 text-left text-sm font-semibold text-slate-700">
                  Campaign
                </th>
                <th className="pb-3 text-right text-sm font-semibold text-slate-700">
                  Generated
                </th>
                <th className="pb-3 text-right text-sm font-semibold text-slate-700">
                  Active
                </th>
                <th className="pb-3 text-right text-sm font-semibold text-slate-700">
                  Redeemed
                </th>
                <th className="pb-3 text-right text-sm font-semibold text-slate-700">
                  Redemption Rate
                </th>
                <th className="pb-3 text-right text-sm font-semibold text-slate-700">
                  Rewards Paid
                </th>
                <th className="pb-3 text-right text-sm font-semibold text-slate-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((campaign) => {
                const status = getStatusBadge(campaign.is_active, campaign.is_expired);
                return (
                  <tr key={campaign.campaign_id} className="hover:bg-slate-50">
                    <td className="py-3">
                      <div>
                        <span className="font-medium text-slate-900">
                          {campaign.campaign_name}
                        </span>
                        {campaign.description && (
                          <p className="text-xs text-slate-500 mt-1">
                            {campaign.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <Badge variant="neutral" size="sm">
                        {campaign.codes_generated}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-sm text-blue-600">
                        {campaign.codes_active}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-sm text-green-600">
                        {campaign.codes_redeemed}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Badge
                        variant={getRedemptionRateColor(campaign.redemption_rate)}
                        size="sm"
                      >
                        {campaign.redemption_rate}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-sm font-medium text-slate-700">
                        ₹{campaign.total_rewards_paid.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Badge variant={status.variant} size="sm">
                        {status.text}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};
