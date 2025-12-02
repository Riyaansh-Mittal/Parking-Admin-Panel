import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListLayout } from '@/components/page-layouts/ListLayout';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { CampaignStats } from '../components/CampaignStats';
import { CampaignFilters } from '../components/CampaignFilters';
import { CampaignTable } from '../components/CampaignTable';
import { CampaignCard } from '../components/CampaignCard';
import { GenerateCodesDialog } from '../components/GenerateCodesDialog';
import { DeactivateCampaignModal } from '../components/DeactivateCampaignModal';
import { useCampaigns } from '../hooks';
import { usePagination } from '@/hooks/usePagination';
import type { CampaignFilters as CampaignFiltersType } from '../types';

export const CampaignsListPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [filters, setFilters] = useState<CampaignFiltersType>({});
  const [generateCodesDialog, setGenerateCodesDialog] = useState<{
    campaignId: string;
    campaignName: string;
  } | null>(null);
  const [deactivateModal, setDeactivateModal] = useState<{
    campaignId: string;
    campaignName: string;
  } | null>(null);

  const { campaigns, loading, error, pagination, refetch } =
    useCampaigns(filters);
  const { currentPage, pageSize, handlePageChange } =
    usePagination({
      totalItems: pagination?.count || 0,
      initialPage: 1,
      initialPageSize: 10,
      onPageChange: (page: number) => setFilters((prev) => ({ ...prev, page })),
      onPageSizeChange: (size: number) =>
        setFilters((prev) => ({ ...prev, page_size: size })),
    });

  // Mock stats (you would fetch this from an analytics endpoint)
  const stats =
    campaigns.length > 0
      ? {
          total_campaigns: pagination?.count || 0,
          active_campaigns: campaigns.filter(
            (c) => c.is_active && !c.is_expired
          ).length,
          inactive_campaigns: campaigns.filter(
            (c) => !c.is_active || c.is_expired
          ).length,
          total_codes: campaigns.reduce((sum, c) => sum + c.codes_generated, 0),
          codes_redeemed: campaigns.reduce(
            (sum, c) => sum + c.codes_redeemed,
            0
          ),
          total_rewards: campaigns
            .reduce(
              (sum, c) =>
                sum +
                (parseFloat(c.reward_for_referrer) +
                  parseFloat(c.reward_for_referred)) *
                  c.codes_redeemed,
              0
            )
            .toFixed(2),
        }
      : null;

  const handleFilterChange = (newFilters: CampaignFiltersType) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handleViewCampaign = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const handleCreateCampaign = () => {
    navigate('/campaigns/create');
  };

  const handleGenerateCodes = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    if (campaign) {
      setGenerateCodesDialog({ campaignId, campaignName: campaign.name });
    }
  };

  const handleDeactivate = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    if (campaign) {
      setDeactivateModal({ campaignId, campaignName: campaign.name });
    }
  };

  return (
    <>
      <ListLayout
        title="Campaigns"
        description="Manage referral campaigns and generate codes"
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 p-1">
              <Button
                variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <Icon name="List" size="sm" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Icon name="Grid" size="sm" />
              </Button>
            </div>
            <Button variant="primary" onClick={handleCreateCampaign}>
              <Icon name="Plus" size="sm" />
              Create Campaign
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Stats */}
          <CampaignStats stats={stats} loading={loading} />

          {/* Filters */}
          <CampaignFilters
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />

          {/* Error State */}
          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-700">
              {error}
            </div>
          )}

          {/* Content */}
          {viewMode === 'table' ? (
            <CampaignTable
              campaigns={campaigns}
              loading={loading}
              onView={handleViewCampaign}
              onGenerateCodes={handleGenerateCodes}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onView={handleViewCampaign}
                  onGenerateCodes={handleGenerateCodes}
                  onDeactivate={handleDeactivate}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {(currentPage - 1) * pageSize + 1} to{' '}
                {Math.min(currentPage * pageSize, pagination.count)} of{' '}
                {pagination.count} campaigns
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <Icon name="ChevronLeft" size="sm" />
                </Button>
                <span className="text-sm text-slate-700">
                  Page {currentPage} of {pagination.total_pages}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.total_pages}
                >
                  <Icon name="ChevronRight" size="sm" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </ListLayout>

      {/* Dialogs */}
      {generateCodesDialog && (
        <GenerateCodesDialog
          campaignId={generateCodesDialog.campaignId}
          campaignName={generateCodesDialog.campaignName}
          isOpen={!!generateCodesDialog}
          onClose={() => setGenerateCodesDialog(null)}
          onSuccess={() => {
            refetch();
            setGenerateCodesDialog(null);
          }}
        />
      )}

      {deactivateModal && (
        <DeactivateCampaignModal
          campaignId={deactivateModal.campaignId}
          campaignName={deactivateModal.campaignName}
          isOpen={!!deactivateModal}
          onClose={() => setDeactivateModal(null)}
          onSuccess={() => {
            refetch();
            setDeactivateModal(null);
          }}
        />
      )}
    </>
  );
};
