import { DataTable } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { formatDateTime, formatCurrency } from '@/utils/formatters';
import { getCampaignStatus, getCampaignUsagePercentage } from '../types/campaign.types';
import type { Campaign } from '../types';
import type { TableColumn } from '@/types/table.types';

interface CampaignTableProps {
  campaigns: Campaign[];
  loading: boolean;
  onView?: (campaignId: string) => void;
  onGenerateCodes?: (campaignId: string) => void;
}

export const CampaignTable = ({
  campaigns,
  loading,
  onView,
  onGenerateCodes,
}: CampaignTableProps) => {
  const columns: TableColumn<Campaign>[] = [
    {
      key: 'name',
      label: 'Campaign Name',
      sortable: true,
      render: (_value, campaign) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{campaign.name}</span>
          <span className="text-xs text-slate-500">{campaign.description}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (_value, campaign) => {
        const statusConfig = getCampaignStatus(campaign);
        return (
          <Badge variant={statusConfig.variant}>
            <Icon name={statusConfig.icon} size="sm" />
            {statusConfig.label}
          </Badge>
        );
      },
    },
    {
      key: 'reward_for_referrer',
      label: 'Referrer Reward',
      sortable: true,
      render: (_value, campaign) => (
        <span className="font-medium text-emerald-700">
          {formatCurrency(parseFloat(campaign.reward_for_referrer))}
        </span>
      ),
    },
    {
      key: 'reward_for_referred',
      label: 'Referred Reward',
      sortable: true,
      render: (_value, campaign) => (
        <span className="font-medium text-sky-700">
          {formatCurrency(parseFloat(campaign.reward_for_referred))}
        </span>
      ),
    },
    {
      key: 'codes_usage',
      label: 'Code Usage',
      sortable: false,
      render: (_value, campaign) => {
        const percentage = getCampaignUsagePercentage(campaign);
        return (
          <div className="flex flex-col">
            <span className="text-sm text-slate-900">
              {campaign.codes_redeemed} / {campaign.codes_generated}
            </span>
            <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: 'valid_until',
      label: 'Valid Until',
      sortable: true,
      render: (_value, campaign) => (
        <span className="text-sm text-slate-600">
          {formatDateTime(campaign.valid_until, 'date')}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      width: '120px',
      render: (_value, campaign) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView?.(campaign.id)}
          >
            <Icon name="Eye" size="sm" />
          </Button>
          {campaign.is_active && !campaign.is_expired && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onGenerateCodes?.(campaign.id)}
            >
              <Icon name="Plus" size="sm" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  // ✅ Ensure campaigns is always an array
  const safeCampaigns = Array.isArray(campaigns) ? campaigns : [];

  return (
    <DataTable
      data={safeCampaigns as unknown as Record<string, unknown>[]}
      columns={columns as unknown as TableColumn<Record<string, unknown>>[]}
      loading={loading}
      emptyMessage="No campaigns found"
      rowKey="id"
    />
  );
};
