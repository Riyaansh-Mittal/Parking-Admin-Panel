import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DetailLayout } from '@/components/page-layouts/DetailLayout';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { Skeleton } from '@/components/atoms/Skeleton';
import { Alert } from '@/components/molecules/Alert';
import { formatDateTime, formatCurrency } from '@/utils/formatters';
import { GenerateCodesDialog } from '../components/GenerateCodesDialog';
import { DeactivateCampaignModal } from '../components/DeactivateCampaignModal';
import { useCampaignDetail, useCampaignPerformance } from '../hooks';
import { getCampaignStatus, getCampaignUsagePercentage } from '../types/campaign.types';

export const CampaignDetailPage = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const { campaign, loading, error, refetch } = useCampaignDetail(campaignId || '');
  const { performance } = useCampaignPerformance({ campaign_id: campaignId });

  if (loading) {
    return (
      <DetailLayout
        title="Loading..."
        breadcrumbs={[
          { label: 'Campaigns', href: '/campaigns' },
          { label: 'Details' },
        ]}
      >
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </DetailLayout>
    );
  }

  if (error || !campaign) {
    return (
      <DetailLayout
        title="Campaign Not Found"
        breadcrumbs={[
          { label: 'Campaigns', href: '/campaigns' },
          { label: 'Details' },
        ]}
      >
        <Alert variant="error">{error || 'Campaign not found'}</Alert>
      </DetailLayout>
    );
  }

  const statusConfig = getCampaignStatus(campaign);
  const usagePercentage = getCampaignUsagePercentage(campaign);
  const performanceData = performance.find((p) => p.campaign_id === campaignId);

  return (
    <>
      <DetailLayout
        title={campaign.name}
        breadcrumbs={[
          { label: 'Campaigns', href: '/campaigns' },
          { label: campaign.name },
        ]}
        actions={
          <div className="flex items-center gap-3">
            {campaign.is_active && !campaign.is_expired && (
              <>
                <Button variant="secondary" onClick={() => setShowGenerateDialog(true)}>
                  <Icon name="Plus" size="sm" />
                  Generate Codes
                </Button>
                <Button variant="danger" onClick={() => setShowDeactivateModal(true)}>
                  <Icon name="Ban" size="sm" />
                  Deactivate
                </Button>
              </>
            )}
            <Button variant="ghost" onClick={() => navigate('/campaigns')}>
              <Icon name="ArrowLeft" size="sm" />
              Back
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Status Banner */}
          <div className="flex items-center gap-3">
            <Badge variant={statusConfig.variant} size="lg">
              <Icon name={statusConfig.icon} size="sm" />
              {statusConfig.label}
            </Badge>
          </div>

          {/* Campaign Info */}
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Campaign Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Description</p>
                <p className="mt-1 text-slate-900">{campaign.description}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">Valid From</p>
                  <p className="mt-1 font-medium text-slate-900">
                    {formatDateTime(campaign.valid_from)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Valid Until</p>
                  <p className="mt-1 font-medium text-slate-900">
                    {formatDateTime(campaign.valid_until)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500">Created By</p>
                <p className="mt-1 font-medium text-slate-900">{campaign.created_by_email}</p>
              </div>
            </div>
          </div>

          {/* Rewards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-100 p-3">
                  <Icon name="Gift" className="text-emerald-600" size="lg" />
                </div>
                <div>
                  <p className="text-sm text-emerald-600">Referrer Reward</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {formatCurrency(parseFloat(campaign.reward_for_referrer))}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-sky-200 bg-sky-50 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-sky-100 p-3">
                  <Icon name="UserPlus" className="text-sky-600" size="lg" />
                </div>
                <div>
                  <p className="text-sm text-sky-600">Referred User Reward</p>
                  <p className="text-2xl font-bold text-sky-700">
                    {formatCurrency(parseFloat(campaign.reward_for_referred))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Usage */}
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Code Usage</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Codes Generated</span>
                <span className="text-xl font-bold text-slate-900">
                  {campaign.codes_generated}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Codes Redeemed</span>
                <span className="text-xl font-bold text-indigo-600">
                  {campaign.codes_redeemed}
                </span>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Usage Rate</span>
                  <span className="font-medium text-slate-900">
                    {usagePercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          {performanceData && (
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Performance</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Total Referrals</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {performanceData.total_referrals}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Conversion Rate</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {performanceData.conversion_rate}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Total Rewards</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {formatCurrency(parseFloat(performanceData.total_bonus_paid))}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">ROI</p>
                  <p className="mt-1 text-2xl font-bold text-emerald-600">
                    {performanceData.roi}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DetailLayout>

      {/* Dialogs */}
      {showGenerateDialog && (
        <GenerateCodesDialog
          campaignId={campaign.id}
          campaignName={campaign.name}
          isOpen={showGenerateDialog}
          onClose={() => setShowGenerateDialog(false)}
          onSuccess={() => {
            refetch();
            setShowGenerateDialog(false);
          }}
        />
      )}

      {showDeactivateModal && (
        <DeactivateCampaignModal
          campaignId={campaign.id}
          campaignName={campaign.name}
          isOpen={showDeactivateModal}
          onClose={() => setShowDeactivateModal(false)}
          onSuccess={() => {
            refetch();
            setShowDeactivateModal(false);
            navigate('/campaigns');
          }}
        />
      )}
    </>
  );
};
