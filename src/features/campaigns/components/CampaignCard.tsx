import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { formatDateTime, formatCurrency } from '@/utils/formatters';
import { getCampaignStatus, getCampaignUsagePercentage } from '../types/campaign.types';
import type { Campaign } from '../types';

interface CampaignCardProps {
  campaign: Campaign;
  onView?: (campaignId: string) => void;
  onGenerateCodes?: (campaignId: string) => void;
  onDeactivate?: (campaignId: string) => void;
}

export const CampaignCard = ({
  campaign,
  onView,
  onGenerateCodes,
  onDeactivate,
}: CampaignCardProps) => {
  const statusConfig = getCampaignStatus(campaign);
  const usagePercentage = getCampaignUsagePercentage(campaign);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{campaign.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{campaign.description}</p>
        </div>
        <Badge variant={statusConfig.variant}>
          <Icon name={statusConfig.icon} size="sm" />
          {statusConfig.label}
        </Badge>
      </div>

      {/* Rewards */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-emerald-50 p-3">
          <p className="text-xs text-emerald-600">Referrer Reward</p>
          <p className="mt-1 text-lg font-bold text-emerald-700">
            {formatCurrency(parseFloat(campaign.reward_for_referrer))}
          </p>
        </div>
        <div className="rounded-lg bg-sky-50 p-3">
          <p className="text-xs text-sky-600">Referred Reward</p>
          <p className="mt-1 text-lg font-bold text-sky-700">
            {formatCurrency(parseFloat(campaign.reward_for_referred))}
          </p>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-600">Code Usage</span>
          <span className="font-medium text-slate-900">
            {campaign.codes_redeemed} / {campaign.codes_generated}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all"
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-slate-500">{usagePercentage.toFixed(1)}% used</p>
      </div>

      {/* Validity Period */}
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
        <Icon name="Calendar" size="sm" />
        <span>
          {formatDateTime(campaign.valid_from, 'date')} -{' '}
          {formatDateTime(campaign.valid_until, 'date')}
        </span>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-2">
        <Button variant="primary" size="sm" onClick={() => onView?.(campaign.id)} fullWidth>
          <Icon name="Eye" size="sm" />
          View Details
        </Button>
        {campaign.is_active && !campaign.is_expired && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onGenerateCodes?.(campaign.id)}
            >
              <Icon name="Plus" size="sm" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeactivate?.(campaign.id)}
            >
              <Icon name="Ban" size="sm" />
            </Button>
          </>
        )}
      </div>

      {/* Created by info */}
      <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
        Created by {campaign.created_by_email} on{' '}
        {formatDateTime(campaign.created_at, 'date')}
      </div>
    </div>
  );
};
